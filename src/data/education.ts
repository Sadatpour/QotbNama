import type { EducationTopic } from '@/types'

/**
 * Educational topic catalogue.
 *
 * `position` places each concept on the political compass (economic x in
 * [-100,100] left→right, social y in [-100,100] libertarian→authoritarian) so
 * the Results page can surface the topics nearest to the user's own position.
 * Positions are approximate teaching aids, not precise classifications — kept
 * deliberately neutral. Topics that are structural (e.g. federalism) have a
 * null position because they don't sit on the left/right–lib/auth plane.
 *
 * Full localized content (definition, history, advantages, criticisms,
 * examples, misconceptions) lives in the locale files under
 * `education.topics.<id>`.
 */
export const EDUCATION_TOPICS: EducationTopic[] = [
  // ── Systems of government ──────────────────────────────────────────────
  {
    id: 'democracy',
    icon: 'vote',
    category: 'systems',
    accent: 'blue',
    position: { economic: 0, social: -40 },
    i18nKey: 'education.topics.democracy',
  },
  {
    id: 'republic',
    icon: 'landmark',
    category: 'systems',
    accent: 'blue',
    position: { economic: 0, social: -20 },
    i18nKey: 'education.topics.republic',
  },
  {
    id: 'constitutional-monarchy',
    icon: 'crown',
    category: 'systems',
    accent: 'indigo',
    position: { economic: 10, social: 0 },
    i18nKey: 'education.topics.constitutional-monarchy',
  },
  {
    id: 'absolute-monarchy',
    icon: 'crown',
    category: 'systems',
    accent: 'purple',
    position: { economic: 20, social: 75 },
    i18nKey: 'education.topics.absolute-monarchy',
  },
  {
    id: 'parliamentary',
    icon: 'users',
    category: 'systems',
    accent: 'cyan',
    position: null,
    i18nKey: 'education.topics.parliamentary',
  },
  {
    id: 'presidential',
    icon: 'user-check',
    category: 'systems',
    accent: 'orange',
    position: null,
    i18nKey: 'education.topics.presidential',
  },
  {
    id: 'authoritarianism',
    icon: 'shield',
    category: 'systems',
    accent: 'purple',
    position: { economic: 0, social: 80 },
    i18nKey: 'education.topics.authoritarianism',
  },
  {
    id: 'totalitarianism',
    icon: 'eye',
    category: 'systems',
    accent: 'purple',
    position: { economic: -10, social: 95 },
    i18nKey: 'education.topics.totalitarianism',
  },

  // ── Ideologies ─────────────────────────────────────────────────────────
  {
    id: 'liberalism',
    icon: 'feather',
    category: 'ideologies',
    accent: 'blue',
    position: { economic: 25, social: -55 },
    i18nKey: 'education.topics.liberalism',
  },
  {
    id: 'conservatism',
    icon: 'columns',
    category: 'ideologies',
    accent: 'orange',
    position: { economic: 35, social: 35 },
    i18nKey: 'education.topics.conservatism',
  },
  {
    id: 'socialism',
    icon: 'handshake',
    category: 'ideologies',
    accent: 'cyan',
    position: { economic: -65, social: -10 },
    i18nKey: 'education.topics.socialism',
  },
  {
    id: 'social-democracy',
    icon: 'heart-handshake',
    category: 'ideologies',
    accent: 'cyan',
    position: { economic: -35, social: -30 },
    i18nKey: 'education.topics.social-democracy',
  },
  {
    id: 'communism',
    icon: 'flag',
    category: 'ideologies',
    accent: 'purple',
    position: { economic: -85, social: 60 },
    i18nKey: 'education.topics.communism',
  },
  {
    id: 'fascism',
    icon: 'alert-triangle',
    category: 'ideologies',
    accent: 'purple',
    position: { economic: 45, social: 90 },
    i18nKey: 'education.topics.fascism',
  },
  {
    id: 'anarchism',
    icon: 'wind',
    category: 'ideologies',
    accent: 'cyan',
    position: { economic: -50, social: -90 },
    i18nKey: 'education.topics.anarchism',
  },
  {
    id: 'secularism',
    icon: 'scale',
    category: 'ideologies',
    accent: 'indigo',
    position: { economic: 0, social: -25 },
    i18nKey: 'education.topics.secularism',
  },

  // ── Economic systems ───────────────────────────────────────────────────
  {
    id: 'capitalism',
    icon: 'trending-up',
    category: 'economics',
    accent: 'orange',
    position: { economic: 70, social: 0 },
    i18nKey: 'education.topics.capitalism',
  },
  {
    id: 'welfare-state',
    icon: 'shield-check',
    category: 'economics',
    accent: 'cyan',
    position: { economic: -45, social: -10 },
    i18nKey: 'education.topics.welfare-state',
  },

  // ── State structures ───────────────────────────────────────────────────
  {
    id: 'federalism',
    icon: 'network',
    category: 'structures',
    accent: 'blue',
    position: null,
    i18nKey: 'education.topics.federalism',
  },
  {
    id: 'unitary-state',
    icon: 'square',
    category: 'structures',
    accent: 'indigo',
    position: null,
    i18nKey: 'education.topics.unitary-state',
  },
]

export const TOPIC_BY_ID: Record<string, EducationTopic> = Object.fromEntries(
  EDUCATION_TOPICS.map((t) => [t.id, t]),
)

export const EDUCATION_CATEGORIES = ['systems', 'ideologies', 'economics', 'structures'] as const
