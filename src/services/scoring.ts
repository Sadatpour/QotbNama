import type {
  Answers,
  AssessmentResult,
  DimensionId,
  DimensionScore,
  LikertValue,
} from '@/types'
import { QUESTIONS, QUESTION_BY_ID } from '@/data/questions'
import { DIMENSION_IDS } from '@/data/dimensions'
import { EDUCATION_TOPICS } from '@/data/education'

/**
 * Scoring methodology
 * ===================
 *
 * Each question is answered on a 7-point Likert scale stored as an index 0..6.
 * We first center it to a symmetric value in [-3, 3]:
 *
 *     centered = answerIndex - 3
 *
 *   index 0 (strongly disagree) → -3
 *   index 3 (neutral)           →  0
 *   index 6 (strongly agree)    → +3
 *
 * The centered value is multiplied by the item's `polarity` (+1 / -1) so that
 * reverse-keyed items count in the correct direction, and by its `weight`
 * (relative importance within the dimension):
 *
 *     contribution = centered * polarity * weight
 *
 * For each dimension we sum contributions and divide by the maximum possible
 * absolute sum (3 * Σweight) to normalise into [-1, 1], then scale to
 * [-100, 100]. Unanswered questions are skipped and excluded from the
 * denominator so partial completion still yields a fair estimate.
 *
 * The political-compass coordinates reuse two of these dimensions:
 *   x (economic) = economic score  (left −100 ↔ right +100)
 *   y (social)   = social score    (libertarian −100 ↔ authoritarian +100)
 */

const CENTER = 3 // neutral index on the 0..6 scale
const MAX_CENTERED = 3 // |index - 3| max

/** A score whose magnitude is below this (out of 100) is treated as "center". */
const CENTER_THRESHOLD = 12

export function centerLikert(value: LikertValue): number {
  return value - CENTER
}

function leanOf(value: number): DimensionScore['lean'] {
  if (value > CENTER_THRESHOLD) return 'positive'
  if (value < -CENTER_THRESHOLD) return 'negative'
  return 'center'
}

/** Compute the normalised score in [-100,100] for a single dimension. */
function scoreDimension(dimension: DimensionId, answers: Answers): DimensionScore {
  const items = QUESTIONS.filter((q) => q.dimension === dimension)

  let weightedSum = 0
  let maxAbs = 0

  for (const q of items) {
    const raw = answers[q.id]
    if (raw === undefined) continue
    const centered = centerLikert(raw)
    weightedSum += centered * q.polarity * q.weight
    maxAbs += MAX_CENTERED * q.weight
  }

  const value = maxAbs === 0 ? 0 : Math.round((weightedSum / maxAbs) * 100)
  return {
    id: dimension,
    value,
    magnitude: Math.abs(value),
    lean: leanOf(value),
  }
}

/**
 * Per-question impact on the final position, used for "which answers
 * contributed most". Impact is |centered * polarity * weight| — i.e. how far
 * from neutral the answer was, weighted by item importance.
 */
function topContributors(answers: Answers): AssessmentResult['topContributors'] {
  return QUESTIONS.flatMap((q) => {
    const raw = answers[q.id]
    if (raw === undefined) return []
    const centered = centerLikert(raw)
    const contribution = centered * q.polarity * q.weight
    const impact = Math.abs(contribution)
    if (impact === 0) return []
    return [{ questionId: q.id, dimension: q.dimension, impact, answer: raw, contribution }]
  })
    .sort((a, b) => b.impact - a.impact)
    .slice(0, 5)
}

/** Euclidean distance on the compass, used to recommend nearby topics. */
function recommendTopics(economic: number, social: number, limit = 6): string[] {
  return EDUCATION_TOPICS.filter((t) => t.position !== null)
    .map((t) => {
      const dx = (t.position!.economic - economic) / 100
      const dy = (t.position!.social - social) / 100
      return { id: t.id, dist: Math.sqrt(dx * dx + dy * dy) }
    })
    .sort((a, b) => a.dist - b.dist)
    .slice(0, limit)
    .map((t) => t.id)
}

/** Full assessment computation. */
export function computeResult(answers: Answers, completedAt: string): AssessmentResult {
  const scores = {} as Record<DimensionId, DimensionScore>
  for (const id of DIMENSION_IDS) {
    scores[id] = scoreDimension(id, answers)
  }

  const compass = {
    economic: scores.economic.value,
    social: scores.social.value,
  }

  const answeredCount = QUESTIONS.filter((q) => answers[q.id] !== undefined).length

  return {
    scores,
    compass,
    topContributors: topContributors(answers),
    recommendedTopics: recommendTopics(compass.economic, compass.social),
    completedAt,
    answeredCount,
    totalQuestions: QUESTIONS.length,
  }
}

/**
 * Translation key for a short label describing a compass quadrant.
 * Returned key resolves under `results.quadrants.<key>`.
 */
export function quadrantKey(economic: number, social: number): string {
  if (Math.abs(economic) <= CENTER_THRESHOLD && Math.abs(social) <= CENTER_THRESHOLD) {
    return 'centrist'
  }
  const horizontal = economic >= 0 ? 'right' : 'left'
  const vertical = social >= 0 ? 'authoritarian' : 'libertarian'
  return `${vertical}-${horizontal}` // e.g. "libertarian-left"
}

export { QUESTION_BY_ID }
