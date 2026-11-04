import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { MOTION_DURATION } from './motionTokens';
import { MOTION_MAP, MotionSequenceName } from './motionMap';

gsap.registerPlugin(ScrollTrigger, SplitText);

let activeScroller: Lenis | null = null;

const revealSelector = '[data-scroll-reveal], [data-motion-hero], [data-motion-split]';
const pointerMotionSelector = '[data-motion-magnetic], [data-motion-tilt], [data-motion-light], [data-motion-cinematic]';
const scrollMotionSelector = '[data-motion-scroll-image], [data-motion-scroll-hero]';
const sequenceSelector = '[data-motion-sequence]';
const revealEase = 'power3.out';
export { MOTION_DURATION, MOTION_EASE } from './motionTokens';

const clearRevealStyles = (element: HTMLElement) => {
  element.style.removeProperty('opacity');
  element.style.removeProperty('visibility');
  element.style.removeProperty('clip-path');
  element.style.removeProperty('filter');
  element.style.removeProperty('transform');
  element.style.removeProperty('--motion-reveal-y');
  element.style.removeProperty('--hero-drift-x');
  element.style.removeProperty('--hero-drift-y');
  element.style.removeProperty('--hero-scale');
  element.style.removeProperty('--hero-scroll-y');
  element.style.removeProperty('--hero-scroll-scale');
  element.style.removeProperty('will-change');
};

export const scrollToTop = () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (activeScroller) {
    activeScroller.scrollTo(0, {
      immediate: true,
    });
    return;
  }

  window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
};

export const initializeMotionSystem = () => {
  const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const initialized = new WeakSet<HTMLElement>();
  const activeTargets = new Set<HTMLElement>();
  const tweens = new Map<HTMLElement, gsap.core.Tween>();
  const scrollTweens = new Map<HTMLElement, gsap.core.Tween>();
  const sequenceTimelines = new Map<HTMLElement, gsap.core.Timeline>();
  const queuedSequenceBuilds = new WeakMap<HTMLElement, boolean>();
  const targetTriggers = new Map<HTMLElement, ScrollTrigger>();
  const splitInstances = new Map<HTMLElement, SplitText>();
  const pointerMotionCleanup = new Map<HTMLElement, () => void>();
  const canHoverQuery = window.matchMedia('(hover: hover) and (pointer: fine)');

  let mutationObserver: MutationObserver | null = null;
  let lenisTicker: ((time: number) => void) | null = null;
  let refreshTimer: number | null = null;
  let disposed = false;

  const clearTarget = (element: HTMLElement) => {
    const tween = tweens.get(element);
    tween?.scrollTrigger?.kill();
    tween?.kill();
    tweens.delete(element);
    targetTriggers.get(element)?.kill();
    targetTriggers.delete(element);
    splitInstances.get(element)?.revert();
    splitInstances.delete(element);
    initialized.delete(element);
    activeTargets.delete(element);
    clearRevealStyles(element);
  };

  const clearSequence = (root: HTMLElement) => {
    const timeline = sequenceTimelines.get(root);
    timeline?.scrollTrigger?.kill();
    timeline?.kill();
    sequenceTimelines.delete(root);
    const sequenceElements = [
      ...(root.matches('[data-motion-step]') ? [root] : []),
      ...Array.from(root.querySelectorAll<HTMLElement>('[data-motion-step]')),
    ];
    const sequenceChildren = sequenceElements.flatMap((element) =>
      Array.from(element.children).filter((child): child is HTMLElement => child instanceof HTMLElement),
    );
    const splitChildren = Array.from(root.querySelectorAll<HTMLElement>('.motion-line, .motion-word'));
    gsap.set([...sequenceElements, ...sequenceChildren, ...splitChildren], {
      clearProps: 'transform,clipPath,opacity,visibility,filter,willChange',
    });
  };

  const clearPointerMotion = (element: HTMLElement) => {
    pointerMotionCleanup.get(element)?.();
    pointerMotionCleanup.delete(element);
  };

  const clearScrollMotion = (element: HTMLElement) => {
    const tween = scrollTweens.get(element);
    tween?.scrollTrigger?.kill();
    tween?.kill();
    scrollTweens.delete(element);
    element.style.removeProperty('transform');
    element.style.removeProperty('--hero-scroll-y');
    element.style.removeProperty('--hero-scroll-scale');
  };

  const clearAllPointerMotion = () => {
    pointerMotionCleanup.forEach((cleanup) => cleanup());
    pointerMotionCleanup.clear();
  };

  const clearReveals = () => {
    mutationObserver?.disconnect();
    mutationObserver = null;
    if (refreshTimer !== null) window.clearTimeout(refreshTimer);
    refreshTimer = null;
    activeTargets.forEach(clearTarget);
    clearAllPointerMotion();
    scrollTweens.forEach((_, element) => clearScrollMotion(element));
    sequenceTimelines.forEach((_, root) => clearSequence(root));
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    document.documentElement.classList.remove('motion-ready');
  };

  const stopSmoothScroll = () => {
    if (lenisTicker) gsap.ticker.remove(lenisTicker);
    lenisTicker = null;
    activeScroller?.destroy();
    activeScroller = null;
  };

  const startSmoothScroll = () => {
    if (reduceMotionQuery.matches || activeScroller || disposed) return;

    const lenis = new Lenis({
      autoRaf: false,
      smoothWheel: true,
      syncTouch: false,
      // A firmer interpolation settles wheel input sooner, keeping ScrollTrigger
      // updates responsive instead of carrying momentum through several sections.
      lerp: 0.32,
      prevent: (element) => element.closest('[data-lenis-prevent]') !== null,
    });

    activeScroller = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    lenisTicker = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(lenisTicker);
  };

  const buildChoreography = (root: HTMLElement, replace = false) => {
    if (reduceMotionQuery.matches || !root.isConnected) return;
    const name = root.dataset.motionSequence as MotionSequenceName | undefined;
    if (!name || !MOTION_MAP[name]) return;
    if (sequenceTimelines.has(root)) {
      if (!replace) return;
      clearSequence(root);
    }

    const config = MOTION_MAP[name];
    const steps = [
      ...(root.matches('[data-motion-step]') ? [root] : []),
      ...Array.from(root.querySelectorAll<HTMLElement>('[data-motion-step]')),
    ];
    if (!steps.length) return;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: root,
        start: config.start,
        toggleActions: config.toggleActions,
        invalidateOnRefresh: true,
      },
    });
    const clearOnFinish: HTMLElement[] = [];

    const revealSplit = (element: HTMLElement, at: number) => {
      const split = splitInstances.get(element);
      if (!split) return;
      const lines = name === 'hero';
      const targets = lines ? split.lines : split.words;
      gsap.set(targets, { transformPerspective: lines ? 900 : 0, transformOrigin: '50% 100%' });
      timeline.fromTo(
        targets,
        { yPercent: lines ? 105 : 78, rotateX: lines ? -9 : 0, autoAlpha: 0, filter: 'blur(2px)' },
        {
          yPercent: 0,
          rotateX: 0,
          autoAlpha: 1,
          filter: 'blur(0px)',
          duration: config.textDuration,
          stagger: { each: config.stagger, from: 'start' },
          ease: 'power3.out',
          clearProps: 'transform,filter,opacity,visibility',
        },
        at,
      );
      clearOnFinish.push(element);
    };

    steps.forEach((step, index) => {
      const kind = step.dataset.motionStep;
      const at = index * config.overlap;
      const splitElement = step.matches('[data-motion-split]')
        ? step
        : step.querySelector<HTMLElement>('[data-motion-split]');

      if (splitElement) revealSplit(splitElement, at + (kind === 'copy' ? 0.04 : 0));

      if (kind === 'headline') {
        if (!splitElement) {
          timeline.fromTo(step, { y: 20, autoAlpha: 0, clipPath: 'inset(0 0 100% 0)' }, {
            y: 0, autoAlpha: 1, clipPath: 'inset(0)', duration: config.textDuration, ease: 'power3.out',
          }, at);
          clearOnFinish.push(step);
        }
        return;
      }

      if (kind === 'stagger' || kind === 'grid' || kind === 'image-grid') {
        const targets = Array.from(step.children).filter((child): child is HTMLElement => child instanceof HTMLElement);
        if (!targets.length) return;
        const imageGrid = kind === 'image-grid';
        timeline.fromTo(
          targets,
          imageGrid
            ? { autoAlpha: 0, y: 20, scale: 0.975, clipPath: 'inset(9% 0 0 round 1.25rem)' }
            : { autoAlpha: 0, y: 22, scale: 0.985, rotateX: 2 },
          imageGrid
            ? { autoAlpha: 1, y: 0, scale: 1, clipPath: 'inset(0 round 1.25rem)', duration: MOTION_DURATION.image, stagger: config.stagger, ease: 'power3.out', clearProps: 'transform,clipPath,opacity,visibility' }
            : { autoAlpha: 1, y: 0, scale: 1, rotateX: 0, duration: MOTION_DURATION.composition, stagger: config.stagger, ease: 'power3.out', clearProps: 'transform,opacity,visibility' },
          at,
        );
        clearOnFinish.push(...targets);
        return;
      }

      const profiles: Record<string, { from: gsap.TweenVars; to: gsap.TweenVars }> = {
        label: { from: { autoAlpha: 0, y: 8, clipPath: 'inset(0 0 100% 0)' }, to: { autoAlpha: 1, y: 0, clipPath: 'inset(0)', duration: 0.42, ease: 'power3.out' } },
        copy: { from: { autoAlpha: 0, y: 14, x: name === 'landlord' ? -12 : 0 }, to: { autoAlpha: 1, y: 0, x: 0, duration: MOTION_DURATION.composition, ease: 'power3.out' } },
        controls: { from: { autoAlpha: 0, x: 18 }, to: { autoAlpha: 1, x: 0, duration: MOTION_DURATION.hover, ease: 'power3.out' } },
        panel: { from: { autoAlpha: 0, y: 16, clipPath: 'inset(0 0 100% 0 round 1.25rem)' }, to: { autoAlpha: 1, y: 0, clipPath: 'inset(0 round 1.25rem)', duration: 0.66, ease: 'power3.out' } },
        visual: { from: { autoAlpha: 0, x: 20, scale: 0.985, clipPath: 'inset(0 0 0 12% round 1.5rem)' }, to: { autoAlpha: 1, x: 0, scale: 1, clipPath: 'inset(0 round 1.5rem)', duration: MOTION_DURATION.image, ease: 'power3.out' } },
        cta: { from: { autoAlpha: 0, y: 12, scale: 0.985 }, to: { autoAlpha: 1, y: 0, scale: 1, duration: 0.5, ease: 'power3.out' } },
        footer: { from: { autoAlpha: 0, y: 10 }, to: { autoAlpha: 1, y: 0, duration: 0.42, ease: 'power2.out' } },
        cue: { from: { autoAlpha: 0, y: -6 }, to: { autoAlpha: 1, y: 0, duration: 0.42, ease: 'power2.out' } },
      };
      const profile = kind ? profiles[kind] : undefined;
      if (profile) {
        timeline.fromTo(step, profile.from, { ...profile.to, clearProps: 'transform,clipPath,opacity,visibility' }, at);
        clearOnFinish.push(step);
      }
    });

    timeline.eventCallback('onComplete', () => {
      gsap.set(clearOnFinish, { clearProps: 'transform,clipPath,opacity,visibility,filter' });
    });
    sequenceTimelines.set(root, timeline);

    // A hero at scroll position 0 sits exactly on the trigger boundary. Some
    // browsers do not dispatch its initial onEnter until the first scroll tick.
    // Start that one visible composition immediately so first-load content never
    // waits for user input; ScrollTrigger still governs all later sections.
    if (name === 'hero' && root.getBoundingClientRect().top < window.innerHeight) {
      timeline.play();
    }
  };

  const scheduleChoreography = (root: HTMLElement, replace = false) => {
    if (queuedSequenceBuilds.has(root)) {
      if (replace) queuedSequenceBuilds.set(root, true);
      return;
    }
    queuedSequenceBuilds.set(root, replace);
    requestAnimationFrame(() => {
      const shouldReplace = queuedSequenceBuilds.get(root) ?? false;
      queuedSequenceBuilds.delete(root);
      buildChoreography(root, shouldReplace);
    });
  };

  const revealElement = (element: HTMLElement) => {
    if (initialized.has(element) || reduceMotionQuery.matches) return;
    const choreographyRoot = element.closest<HTMLElement>(sequenceSelector);
    if (choreographyRoot && !element.hasAttribute('data-motion-split') && element.closest('[data-motion-step]')) return;
    initialized.add(element);
    activeTargets.add(element);

    if (element.hasAttribute('data-motion-split')) {
      const accessibleText = element.innerText.replace(/\s+/g, ' ').trim();
      gsap.set(element, { autoAlpha: 1, clearProps: 'translate' });
      const split = SplitText.create(element, {
        type: 'lines,words',
        linesClass: 'motion-line',
        wordsClass: 'motion-word',
        mask: 'lines',
        aria: 'none',
        autoSplit: true,
        onSplit: (instance) => {
          element.setAttribute('aria-label', accessibleText);
          splitInstances.set(element, instance);
          if (choreographyRoot) {
            scheduleChoreography(choreographyRoot, true);
            return;
          }
          tweens.get(element)?.kill();
          tweens.delete(element);
          targetTriggers.get(element)?.kill();
          const trigger = ScrollTrigger.create({
            trigger: element,
            start: 'top 95%',
            once: true,
            onEnter: () => {
              const tween = gsap.fromTo(
                instance.words,
                { yPercent: 80, filter: 'blur(3px)' },
                {
                  yPercent: 0,
                  filter: 'blur(0px)',
                  duration: MOTION_DURATION.text,
                  stagger: 0.04,
                  ease: revealEase,
                  onComplete: () => gsap.set(instance.words, { clearProps: 'transform,filter,willChange' }),
                },
              );
              tweens.set(element, tween);
            },
          });
          targetTriggers.set(element, trigger);
        },
      });
      splitInstances.set(element, split);
      return;
    }

    if (element.hasAttribute('data-motion-hero')) {
      const sequenceRoot = element.closest<HTMLElement>('[data-motion-sequence="hero"]');
      const tween = gsap.fromTo(
        element,
        { '--hero-drift-x': '-1.25%', '--hero-drift-y': '0%', '--hero-scale': 1.035 },
        {
          '--hero-drift-x': '1.25%',
          '--hero-drift-y': '0.5%',
          '--hero-scale': 1.075,
          duration: 22,
          repeat: -1,
          yoyo: true,
          paused: true,
          ease: 'sine.inOut',
        },
      );
      tweens.set(element, tween);
      const visibilityTrigger = ScrollTrigger.create({
        trigger: sequenceRoot ?? element,
        start: 'top bottom',
        end: 'bottom top',
        onToggle: (self) => {
          if (self.isActive) {
            element.style.willChange = 'transform';
            tween.play();
          } else {
            tween.pause();
            element.style.removeProperty('will-change');
          }
        },
      });
      targetTriggers.set(element, visibilityTrigger);
      return;
    }

    const type = element.dataset.scrollReveal;
    const isText = type === 'text';
    const isImage = type === 'image';
    const initialClip = isText
      ? 'inset(0 0 100% 0)'
      : isImage
        ? 'inset(5% 0 0 0 round 1.5rem)'
        : 'inset(0 0 8% 0)';
    const finalClip = isImage ? 'inset(0 round 1.5rem)' : 'inset(0)';

    const trigger = ScrollTrigger.create({
      trigger: element,
      start: 'top 95%',
      once: true,
      onEnter: () => {
        const tween = gsap.fromTo(
          element,
          {
            autoAlpha: 0,
            '--motion-reveal-y': isText ? '6px' : '8px',
            clipPath: initialClip,
            ...(isText ? { filter: 'blur(3px)' } : {}),
          },
          {
            autoAlpha: 1,
            '--motion-reveal-y': '0px',
            clipPath: finalClip,
            ...(isText ? { filter: 'blur(0px)' } : {}),
            duration: isImage ? MOTION_DURATION.image : isText ? MOTION_DURATION.text : MOTION_DURATION.reveal,
            ease: revealEase,
            onStart: () => { element.style.willChange = 'opacity, translate, clip-path'; },
            onComplete: () => { element.style.removeProperty('will-change'); },
          },
        );
        tweens.set(element, tween);
      },
    });
    targetTriggers.set(element, trigger);
  };

  const attachPointerMotion = (element: HTMLElement) => {
    if (pointerMotionCleanup.has(element) || !canHoverQuery.matches || reduceMotionQuery.matches) return;

    const magnetic = element.hasAttribute('data-motion-magnetic');
    const tilt = element.hasAttribute('data-motion-tilt');
    const cinematic = element.hasAttribute('data-motion-cinematic');
    const light = element.hasAttribute('data-motion-light');
    const target = cinematic
      ? element.querySelector<HTMLElement>('[data-motion-cinematic-image]')
      : magnetic
      ? element
      : element.querySelector<HTMLElement>('[data-motion-tilt-target]');
    if (!target && !light) return;

    const values = { x: 0, y: 0, lightX: 50, lightY: 50 };
    let rect: DOMRect | null = null;
    const render = () => {
      if (cinematic && target) {
        target.style.setProperty('--hero-pointer-x', `${values.x}px`);
        target.style.setProperty('--hero-pointer-y', `${values.y}px`);
      } else if (magnetic && target) {
        target.style.setProperty('--motion-magnetic-x', `${values.x}px`);
        target.style.setProperty('--motion-magnetic-y', `${values.y}px`);
      } else if (tilt && target) {
        target.style.setProperty('--motion-tilt-y', `${values.x}deg`);
        target.style.setProperty('--motion-tilt-x', `${values.y}deg`);
      }
      if (light) {
        element.style.setProperty('--motion-pointer-x', `${values.lightX}%`);
        element.style.setProperty('--motion-pointer-y', `${values.lightY}%`);
      }
    };
    const setX = gsap.quickTo(values, 'x', {
      duration: magnetic ? 0.24 : 0.42,
      ease: 'power3.out',
      onUpdate: render,
    });
    const setY = gsap.quickTo(values, 'y', {
      duration: magnetic ? 0.24 : 0.42,
      ease: 'power3.out',
      onUpdate: render,
    });
    const setLightX = gsap.quickTo(values, 'lightX', { duration: 0.18, ease: 'power2.out', onUpdate: render });
    const setLightY = gsap.quickTo(values, 'lightY', { duration: 0.18, ease: 'power2.out', onUpdate: render });

    const onPointerMove = (event: PointerEvent) => {
      rect ??= element.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      if (magnetic) {
        setX(x * 7);
        setY(y * 7);
      } else if (cinematic) {
        setX(x * -9);
        setY(y * -6);
      } else if (tilt) {
        setX(x * 3.2);
        setY(y * -3.2);
      }
      if (light) {
        setLightX((x + 0.5) * 100);
        setLightY((y + 0.5) * 100);
      }
    };

    const reset = () => {
      setX(0);
      setY(0);
      setLightX(50);
      setLightY(50);
      rect = null;
    };

    const cacheBounds = () => { rect = element.getBoundingClientRect(); };
    element.addEventListener('pointerenter', cacheBounds, { passive: true });
    element.addEventListener('pointermove', onPointerMove, { passive: true });
    element.addEventListener('pointerleave', reset, { passive: true });
    pointerMotionCleanup.set(element, () => {
      element.removeEventListener('pointermove', onPointerMove);
      element.removeEventListener('pointerenter', cacheBounds);
      element.removeEventListener('pointerleave', reset);
      gsap.killTweensOf(values);
      target?.style.removeProperty('--motion-magnetic-x');
      target?.style.removeProperty('--motion-magnetic-y');
      target?.style.removeProperty('--motion-tilt-x');
      target?.style.removeProperty('--motion-tilt-y');
      target?.style.removeProperty('--hero-pointer-x');
      target?.style.removeProperty('--hero-pointer-y');
      element.style.removeProperty('--motion-pointer-x');
      element.style.removeProperty('--motion-pointer-y');
    });
  };

  const processPointerMotionTree = (node: Node) => {
    if (!(node instanceof HTMLElement)) return;
    if (node.matches(pointerMotionSelector)) attachPointerMotion(node);
    node.querySelectorAll<HTMLElement>(pointerMotionSelector).forEach(attachPointerMotion);
  };

  const processScrollMotionTree = (node: Node) => {
    if (!(node instanceof HTMLElement)) return;
    const attach = (element: HTMLElement) => {
      if (scrollTweens.has(element) || reduceMotionQuery.matches) return;
      if (element.hasAttribute('data-motion-scroll-hero')) {
        const trigger = element.closest<HTMLElement>('[data-motion-sequence="hero"]') ?? element;
        const tween = gsap.fromTo(
          element,
          { '--hero-scroll-y': '0%', '--hero-scroll-scale': 0 },
          {
            '--hero-scroll-y': '-3.25%',
            '--hero-scroll-scale': 0.045,
            ease: 'none',
            scrollTrigger: { trigger, start: 'top top', end: 'bottom top', scrub: 0.6, invalidateOnRefresh: true },
          },
        );
        scrollTweens.set(element, tween);
        return;
      }
      const tween = gsap.fromTo(
        element,
        { yPercent: -3.5 },
        {
          yPercent: 3.5,
          ease: 'none',
          scrollTrigger: {
            trigger: element.parentElement ?? element,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.55,
            invalidateOnRefresh: true,
          },
        },
      );
      scrollTweens.set(element, tween);
    };
    if (node.matches(scrollMotionSelector)) attach(node);
    node.querySelectorAll<HTMLElement>(scrollMotionSelector).forEach(attach);
  };

  const processTree = (node: Node) => {
    if (!(node instanceof HTMLElement)) return;
    if (node.matches(revealSelector)) revealElement(node);
    node.querySelectorAll<HTMLElement>(revealSelector).forEach(revealElement);
  };

  const processChoreographyTree = (node: Node) => {
    if (!(node instanceof HTMLElement)) return;
    const schedule = (root: HTMLElement) => scheduleChoreography(root);
    if (node.matches(sequenceSelector)) schedule(node);
    node.querySelectorAll<HTMLElement>(sequenceSelector).forEach(schedule);
  };

  const processRemovedTree = (node: Node) => {
    if (!(node instanceof HTMLElement) || node.isConnected) return;
    if (node.matches(pointerMotionSelector)) clearPointerMotion(node);
    node.querySelectorAll<HTMLElement>(pointerMotionSelector).forEach(clearPointerMotion);
    if (node.matches(scrollMotionSelector)) clearScrollMotion(node);
    node.querySelectorAll<HTMLElement>(scrollMotionSelector).forEach(clearScrollMotion);
    if (node.matches(sequenceSelector)) clearSequence(node);
    node.querySelectorAll<HTMLElement>(sequenceSelector).forEach(clearSequence);
    if (node.matches(revealSelector)) clearTarget(node);
    node.querySelectorAll<HTMLElement>(revealSelector).forEach(clearTarget);
  };

  const startReveals = () => {
    if (reduceMotionQuery.matches || disposed) return;

    const root = document.documentElement;
    root.classList.add('motion-ready');
    processTree(document.body);
    processPointerMotionTree(document.body);
    processScrollMotionTree(document.body);
    processChoreographyTree(document.body);

    mutationObserver = new MutationObserver((records) => {
      records.forEach((record) => {
        record.addedNodes.forEach((node) => {
          processTree(node);
          processPointerMotionTree(node);
          processScrollMotionTree(node);
          processChoreographyTree(node);
        });
        record.removedNodes.forEach(processRemovedTree);
      });
      // Async data and lazy sections can change document geometry after initial
      // setup. Debounce layout measurement until the DOM mutation burst settles.
      if (refreshTimer !== null) window.clearTimeout(refreshTimer);
      refreshTimer = window.setTimeout(() => {
        refreshTimer = null;
        ScrollTrigger.refresh();
      }, 120);
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });
    requestAnimationFrame(() => ScrollTrigger.refresh());
  };

  const syncMotionPreference = () => {
    clearReveals();
    clearAllPointerMotion();
    stopSmoothScroll();
    if (!reduceMotionQuery.matches) {
      startSmoothScroll();
      startReveals();
    }
  };

  syncMotionPreference();
  reduceMotionQuery.addEventListener('change', syncMotionPreference);
  canHoverQuery.addEventListener('change', syncMotionPreference);

  return () => {
    disposed = true;
    reduceMotionQuery.removeEventListener('change', syncMotionPreference);
    canHoverQuery.removeEventListener('change', syncMotionPreference);
    clearReveals();
    stopSmoothScroll();
  };
};
