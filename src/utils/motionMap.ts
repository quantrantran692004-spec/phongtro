export type MotionSequenceName =
  | 'hero'
  | 'featured'
  | 'university'
  | 'areas'
  | 'guide'
  | 'landlord'
  | 'footer'
  | 'search'
  | 'search-results'
  | 'detail-header'
  | 'gallery'
  | 'detail-content'
  | 'related';

export interface MotionSequenceConfig {
  start: string;
  toggleActions: string;
  overlap: number;
  stagger: number;
  textDuration: number;
}

/** Scroll rhythm and reverse behavior for each authored section. */
export const MOTION_MAP: Record<MotionSequenceName, MotionSequenceConfig> = {
  hero: { start: 'top top', toggleActions: 'play none none none', overlap: 0.1, stagger: 0.1, textDuration: 0.78 },
  featured: { start: 'top 84%', toggleActions: 'play none none reverse', overlap: 0.16, stagger: 0.075, textDuration: 0.62 },
  university: { start: 'top 86%', toggleActions: 'play none none reverse', overlap: 0.14, stagger: 0.065, textDuration: 0.58 },
  areas: { start: 'top 84%', toggleActions: 'play none none reverse', overlap: 0.14, stagger: 0.085, textDuration: 0.62 },
  guide: { start: 'top 86%', toggleActions: 'play none none reverse', overlap: 0.16, stagger: 0.08, textDuration: 0.62 },
  landlord: { start: 'top 86%', toggleActions: 'play none none reverse', overlap: 0.18, stagger: 0.08, textDuration: 0.72 },
  footer: { start: 'top 96%', toggleActions: 'play none none reverse', overlap: 0.1, stagger: 0.045, textDuration: 0.46 },
  search: { start: 'top 94%', toggleActions: 'play none none reverse', overlap: 0.12, stagger: 0.05, textDuration: 0.5 },
  'search-results': { start: 'top 90%', toggleActions: 'play none none reverse', overlap: 0.08, stagger: 0.055, textDuration: 0.5 },
  'detail-header': { start: 'top 92%', toggleActions: 'play none none reverse', overlap: 0.1, stagger: 0.045, textDuration: 0.68 },
  gallery: { start: 'top 90%', toggleActions: 'play none none reverse', overlap: 0.12, stagger: 0.065, textDuration: 0.5 },
  'detail-content': { start: 'top 88%', toggleActions: 'play none none reverse', overlap: 0.16, stagger: 0.07, textDuration: 0.54 },
  related: { start: 'top 88%', toggleActions: 'play none none reverse', overlap: 0.12, stagger: 0.07, textDuration: 0.58 },
};
