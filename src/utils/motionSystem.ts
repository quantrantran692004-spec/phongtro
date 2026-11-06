import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MOTION_MAP, MotionSequenceName } from './motionMap';

gsap.registerPlugin(ScrollTrigger);

let activeScroller: Lenis | null = null;

const revealSelector = '[data-scroll-reveal], [data-motion-hero], [data-motion-split]';
const pointerMotionSelector = '[data-motion-magnetic], [data-motion-tilt], [data-motion-light], [data-motion-cinematic]';
const sequenceSelector = '[data-motion-sequence]';
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
  const sequenceTimelines = new Map<HTMLElement, gsap.core.Timeline>();
  const queuedSequenceBuilds = new WeakMap<HTMLElement, boolean>();
  const targetTriggers = new Map<HTMLElement, ScrollTrigger>();
  const pointerMotionCleanup = new Map<HTMLElement, () => void>();
  const canHoverQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
  const touchMotionQuery = window.matchMedia('(hover: none), (pointer: coarse), (max-width: 767px)');

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
    gsap.set([...sequenceElements, ...sequenceChildren], {
      clearProps: 'transform,clipPath,opacity,visibility,filter,willChange',
    });
  };

  const clearPointerMotion = (element: HTMLElement) => {
    pointerMotionCleanup.get(element)?.();
    pointerMotionCleanup.delete(element);
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
    // Touch devices already have native momentum scrolling. Keeping Lenis on
    // the GSAP ticker there costs a frame loop without improving touch scroll.
    if (reduceMotionQuery.matches || touchMotionQuery.matches || !canHoverQuery.matches || activeScroller || disposed) return;

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
    let tickerActive = false;
    lenisTicker = (time) => {
      lenis.raf(time * 1000);
      if (!lenis.isScrolling) {
        gsap.ticker.remove(lenisTicker!);
        tickerActive = false;
      }
    };
    lenis.on('virtual-scroll', () => {
      if (tickerActive || !lenisTicker) return;
      tickerActive = true;
      gsap.ticker.add(lenisTicker);
    });
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
        start: name === 'hero' ? 'top 95%' : config.start,
        toggleActions: 'play none none none',
        once: true,
        invalidateOnRefresh: true,
      },
    });
    steps.forEach((step, index) => {
      timeline.fromTo(
        step,
        { autoAlpha: 0, y: 8 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.3,
          ease: 'power2.out',
          clearProps: 'transform,opacity,visibility',
        },
        index * Math.min(config.overlap, 0.05),
      );
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
    if (touchMotionQuery.matches && element.matches('[data-motion-tilt]')) return;
    const choreographyRoot = element.closest<HTMLElement>(sequenceSelector);
    if (choreographyRoot && element.closest('[data-motion-step]')) return;
    initialized.add(element);
    activeTargets.add(element);

    if (element.hasAttribute('data-motion-hero')) {
      gsap.set(element, { '--hero-drift-x': '0%', '--hero-drift-y': '0%', '--hero-scale': 1.035 });
      return;
    }

    const trigger = ScrollTrigger.create({
      trigger: element,
      start: 'top 95%',
      once: true,
      onEnter: () => {
        const tween = gsap.fromTo(
          element,
          { autoAlpha: 0, y: 8 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.3,
            ease: 'power2.out',
            clearProps: 'transform,opacity,visibility',
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
    processChoreographyTree(document.body);

    mutationObserver = new MutationObserver((records) => {
      let refreshRequired = false;
      const containsMotionGeometry = (node: Node) => node instanceof HTMLElement && (
        node.matches(`${revealSelector}, ${sequenceSelector}`)
        || Boolean(node.querySelector(`${revealSelector}, ${sequenceSelector}`))
      );

      records.forEach((record) => {
        record.addedNodes.forEach((node) => {
          processTree(node);
          processPointerMotionTree(node);
          processChoreographyTree(node);
          refreshRequired ||= containsMotionGeometry(node);
        });
        record.removedNodes.forEach((node) => {
          refreshRequired ||= containsMotionGeometry(node);
          processRemovedTree(node);
        });
      });
      // Image swaps, modals and other leaf mutations do not change motion
      // trigger geometry. Refresh only when sections/reveal targets are added
      // or removed, so common UI updates do not repeatedly measure the page.
      if (!refreshRequired) return;
      if (refreshTimer !== null) window.clearTimeout(refreshTimer);
      refreshTimer = window.setTimeout(() => {
        refreshTimer = null;
        ScrollTrigger.refresh();
      }, 180);
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
  touchMotionQuery.addEventListener('change', syncMotionPreference);

  return () => {
    disposed = true;
    reduceMotionQuery.removeEventListener('change', syncMotionPreference);
    canHoverQuery.removeEventListener('change', syncMotionPreference);
    touchMotionQuery.removeEventListener('change', syncMotionPreference);
    clearReveals();
    stopSmoothScroll();
  };
};
