/**
 * Core domain types for قطب‌نما.
 *
 * The questionnaire measures five conceptual dimensions drawn from established
 * political-science instruments (Political Compass, Nolan Chart, WVS, ESS, Pew).
 * Each question maps onto exactly one dimension to keep the model interpretable.
 */

/** The five scored dimensions. */
export type DimensionId =
  | 'economic' // Economic Left (−) ↔ Right (+)
  | 'social' // Libertarian (−) ↔ Authoritarian (+)
  | 'democratic' // Authoritarian governance (−) ↔ Democratic inclination (+)
  | 'state' // Free market (−) ↔ State intervention (+)
  | 'secular' // Religious/traditional (−) ↔ Secular (+)

/** Direction a question pushes a score when the user agrees. */
export type Polarity = 1 | -1

/** A single questionnaire item, stored as data (not invented ad-hoc). */
export interface Question {
  /** Stable id, e.g. "q01". */
  id: string
  /** Which dimension this question contributes to. */
  dimension: DimensionId
  /** Relative importance within its dimension (0.5–1.5). */
  weight: number
  /**
   * +1 means "agree" pushes the score toward the positive pole of the dimension;
   * −1 means "agree" pushes it toward the negative pole. Reverse-keyed items
   * (polarity −1) are mixed in to reduce acquiescence bias.
   */
  polarity: Polarity
  /** Translation key for the statement (in locales under `questions.<id>`). */
  i18nKey: string
  /** Short methodological note: where the concept comes from. */
  source: string
  /** Plain-language reasoning for why this item belongs to the dimension. */
  reasoning: string
}

/** The 7-point Likert response, stored as the chosen index 0..6. */
export type LikertValue = 0 | 1 | 2 | 3 | 4 | 5 | 6

/** Map of question id -> selected Likert index. */
export type Answers = Record<string, LikertValue>

/** Normalised result for a single dimension, in the range [-100, 100]. */
export interface DimensionScore {
  id: DimensionId
  /** Signed value in [-100, 100]. */
  value: number
  /** Absolute strength of leaning, 0..100. */
  magnitude: number
  /** Which pole the user leans toward: 'positive' | 'negative' | 'center'. */
  lean: 'positive' | 'negative' | 'center'
}

/** Full computed result of an assessment. */
export interface AssessmentResult {
  scores: Record<DimensionId, DimensionScore>
  /** Political-compass coordinates, both in [-100, 100]. */
  compass: {
    economic: number // x axis: left(−) ↔ right(+)
    social: number // y axis: libertarian(−) ↔ authoritarian(+)
  }
  /** The questions that contributed most to the final position. */
  topContributors: Array<{
    questionId: string
    dimension: DimensionId
    impact: number
    /** The user's actual Likert answer (0–6). */
    answer: LikertValue
    /** Signed contribution: positive = pushed toward positive pole, negative = toward negative pole. */
    contribution: number
  }>
  /** Ids of the educational topics most relevant to this result. */
  recommendedTopics: string[]
  /** ISO timestamp of when the assessment was completed. */
  completedAt: string
  /** How many of the questions were answered. */
  answeredCount: number
  totalQuestions: number
}

/** An educational topic card. */
export interface EducationTopic {
  id: string
  /** Lucide-style icon name we map to an inline SVG. */
  icon: string
  /** Category used for grouping & filtering. */
  category: 'systems' | 'ideologies' | 'economics' | 'structures'
  /** Accent color key from the brand palette. */
  accent: 'blue' | 'purple' | 'cyan' | 'orange' | 'indigo'
  /**
   * Position of this topic on the compass, used to recommend topics close to
   * the user's result. Both axes in [-100, 100]; null when not placeable.
   */
  position: { economic: number; social: number } | null
  /** Translation key root, content lives under `education.topics.<id>`. */
  i18nKey: string
}

export type ThemeMode = 'light' | 'dark'
export type LanguageCode = 'fa' | 'en' | 'de'
