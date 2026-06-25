import type { Question } from '@/types'

/**
 * The قطب‌نما item bank — 35 items, 7 per dimension.
 *
 * Design principles (see README "Scoring methodology"):
 *  - One concept per item.
 *  - Neutral, non-leading wording (the statement text lives in the locale files).
 *  - Balanced keying: each dimension mixes positive- and reverse-keyed items so
 *    that always-agreeing or always-disagreeing does not bias the result
 *    (acquiescence control, standard in WVS/ESS instruments).
 *  - Items adapt concepts from the Political Compass, Nolan Chart, the World
 *    Values Survey, the European Social Survey and Pew political-values batteries;
 *    none are invented to pad the count.
 *
 * polarity = +1 → agreeing moves the dimension toward its POSITIVE pole
 * polarity = -1 → agreeing moves the dimension toward its NEGATIVE pole
 *
 * Dimension poles:
 *  economic   : negative = Left            positive = Right
 *  social     : negative = Libertarian     positive = Authoritarian
 *  democratic : negative = Authoritarian   positive = Democratic
 *  state      : negative = Free market      positive = State intervention
 *  secular    : negative = Religious/trad.  positive = Secular
 */
export const QUESTIONS: Question[] = [
  // ── Economic Left ↔ Right ──────────────────────────────────────────────
  {
    id: 'q01',
    dimension: 'economic',
    weight: 1.2,
    polarity: -1,
    i18nKey: 'questions.q01',
    source: 'WVS — income equality vs. incentives item',
    reasoning: 'Preference for reducing income inequality indicates an economic-left orientation.',
  },
  {
    id: 'q02',
    dimension: 'economic',
    weight: 1.0,
    polarity: 1,
    i18nKey: 'questions.q02',
    source: 'Political Compass — competition & free enterprise',
    reasoning: 'Valuing competition and private enterprise indicates an economic-right orientation.',
  },
  {
    id: 'q03',
    dimension: 'economic',
    weight: 1.0,
    polarity: -1,
    i18nKey: 'questions.q03',
    source: 'ESS — role of progressive taxation',
    reasoning: 'Support for higher taxes on the wealthy to fund services is an economic-left marker.',
  },
  {
    id: 'q04',
    dimension: 'economic',
    weight: 0.9,
    polarity: 1,
    i18nKey: 'questions.q04',
    source: 'Pew — individual responsibility vs. circumstance',
    reasoning: 'Attributing outcomes mainly to individual effort aligns with the economic right.',
  },

  // ── Libertarian ↔ Authoritarian (social) ───────────────────────────────
  {
    id: 'q05',
    dimension: 'social',
    weight: 1.1,
    polarity: 1,
    i18nKey: 'questions.q05',
    source: 'Political Compass — order & security vs. liberty',
    reasoning: 'Prioritising order and security over personal freedom is a social-authoritarian marker.',
  },
  {
    id: 'q06',
    dimension: 'social',
    weight: 1.0,
    polarity: -1,
    i18nKey: 'questions.q06',
    source: 'WVS — tolerance of diverse lifestyles',
    reasoning: 'Acceptance of lifestyles different from one’s own indicates a libertarian leaning.',
  },
  {
    id: 'q07',
    dimension: 'social',
    weight: 1.0,
    polarity: 1,
    i18nKey: 'questions.q07',
    source: 'ESS — obedience to authority',
    reasoning: 'Valuing obedience and respect for authority indicates a social-authoritarian leaning.',
  },
  {
    id: 'q08',
    dimension: 'social',
    weight: 0.9,
    polarity: -1,
    i18nKey: 'questions.q08',
    source: 'Pew — civil liberties vs. surveillance',
    reasoning: 'Protecting privacy over state surveillance indicates a libertarian leaning.',
  },

  // ── Democratic inclination ──────────────────────────────────────────────
  {
    id: 'q09',
    dimension: 'democratic',
    weight: 1.2,
    polarity: 1,
    i18nKey: 'questions.q09',
    source: 'WVS — importance of living in a democracy',
    reasoning: 'Valuing democratic governance and elections indicates a democratic inclination.',
  },
  {
    id: 'q10',
    dimension: 'democratic',
    weight: 1.1,
    polarity: -1,
    i18nKey: 'questions.q10',
    source: 'WVS — "strong leader" item (reverse-keyed)',
    reasoning: 'Preferring a strong leader unconstrained by elections indicates a non-democratic leaning.',
  },
  {
    id: 'q11',
    dimension: 'democratic',
    weight: 1.0,
    polarity: 1,
    i18nKey: 'questions.q11',
    source: 'ESS — free press & checks and balances',
    reasoning: 'Support for a free press and independent courts indicates a democratic inclination.',
  },
  {
    id: 'q12',
    dimension: 'democratic',
    weight: 0.9,
    polarity: 1,
    i18nKey: 'questions.q12',
    source: 'Comparative politics — minority rights & pluralism',
    reasoning: 'Protecting minority rights against majority will is a liberal-democratic marker.',
  },

  // ── State intervention ↔ Free market ────────────────────────────────────
  {
    id: 'q13',
    dimension: 'state',
    weight: 1.1,
    polarity: 1,
    i18nKey: 'questions.q13',
    source: 'ESS — government responsibility for welfare',
    reasoning: 'Believing government should ensure a decent standard of living indicates pro-intervention.',
  },
  {
    id: 'q14',
    dimension: 'state',
    weight: 1.0,
    polarity: -1,
    i18nKey: 'questions.q14',
    source: 'Political Compass — deregulation & privatisation',
    reasoning: 'Preferring markets over regulation indicates a free-market (low-intervention) leaning.',
  },
  {
    id: 'q15',
    dimension: 'state',
    weight: 1.0,
    polarity: 1,
    i18nKey: 'questions.q15',
    source: 'WVS — public vs. private ownership',
    reasoning: 'Support for public ownership of key industries indicates a pro-intervention leaning.',
  },
  {
    id: 'q16',
    dimension: 'state',
    weight: 0.9,
    polarity: 1,
    i18nKey: 'questions.q16',
    source: 'Pew — regulation of business',
    reasoning: 'Support for regulating business to protect the public indicates a pro-intervention leaning.',
  },

  // ── Religious/traditional ↔ Secular ─────────────────────────────────────
  {
    id: 'q17',
    dimension: 'secular',
    weight: 1.1,
    polarity: -1,
    i18nKey: 'questions.q17',
    source: 'WVS — religion’s role in public life',
    reasoning: 'Believing religious principles should guide laws indicates a religious/traditional leaning.',
  },
  {
    id: 'q18',
    dimension: 'secular',
    weight: 1.0,
    polarity: 1,
    i18nKey: 'questions.q18',
    source: 'ESS — separation of religion and state',
    reasoning: 'Support for keeping religion separate from government indicates a secular leaning.',
  },
  {
    id: 'q19',
    dimension: 'secular',
    weight: 0.9,
    polarity: -1,
    i18nKey: 'questions.q19',
    source: 'WVS — tradition vs. change',
    reasoning: 'Valuing long-standing traditions over change indicates a traditional leaning.',
  },
  {
    id: 'q20',
    dimension: 'secular',
    weight: 0.9,
    polarity: 1,
    i18nKey: 'questions.q20',
    source: 'Pew — science & reason as basis for policy',
    reasoning: 'Preferring scientific evidence as the basis for policy indicates a secular leaning.',
  },

  // ── Economic Left ↔ Right (additional) ──────────────────────────────────
  {
    id: 'q21',
    dimension: 'economic',
    weight: 1.1,
    polarity: -1,
    i18nKey: 'questions.q21',
    source: 'WVS — fair distribution of wealth',
    reasoning: 'Favouring a fairer distribution of wealth across society is an economic-left marker.',
  },
  {
    id: 'q22',
    dimension: 'economic',
    weight: 1.0,
    polarity: 1,
    i18nKey: 'questions.q22',
    source: 'Pew — lower taxes & smaller government',
    reasoning: 'Preferring lower taxes and a smaller state is an economic-right marker.',
  },
  {
    id: 'q23',
    dimension: 'economic',
    weight: 0.9,
    polarity: -1,
    i18nKey: 'questions.q23',
    source: 'ESS — labour vs. capital (workers’ share)',
    reasoning: 'Prioritising workers’ share of profits over company profit aligns with the economic left.',
  },

  // ── Libertarian ↔ Authoritarian (additional) ────────────────────────────
  {
    id: 'q24',
    dimension: 'social',
    weight: 1.0,
    polarity: 1,
    i18nKey: 'questions.q24',
    source: 'Political psychology — RWA (punitiveness)',
    reasoning: 'Endorsing harsh punishment to control crime indicates a social-authoritarian leaning.',
  },
  {
    id: 'q25',
    dimension: 'social',
    weight: 1.0,
    polarity: -1,
    i18nKey: 'questions.q25',
    source: 'Mill’s harm principle (personal autonomy)',
    reasoning: 'Defending adults’ freedom in private life as long as no one is harmed is a libertarian marker.',
  },
  {
    id: 'q26',
    dimension: 'social',
    weight: 0.9,
    polarity: 1,
    i18nKey: 'questions.q26',
    source: 'ESS — security vs. liberty trade-off',
    reasoning: 'Accepting temporary limits on freedoms during security threats indicates an authoritarian leaning.',
  },

  // ── Democratic inclination (additional) ─────────────────────────────────
  {
    id: 'q27',
    dimension: 'democratic',
    weight: 1.0,
    polarity: -1,
    i18nKey: 'questions.q27',
    source: 'WVS — outcomes over process (reverse-keyed)',
    reasoning: 'Caring only about results, not how or by whom decisions are made, indicates a non-democratic leaning.',
  },
  {
    id: 'q28',
    dimension: 'democratic',
    weight: 1.1,
    polarity: 1,
    i18nKey: 'questions.q28',
    source: 'ESS — freedom of political expression',
    reasoning: 'Supporting citizens’ free expression of political views, even against rulers, is a democratic marker.',
  },
  {
    id: 'q29',
    dimension: 'democratic',
    weight: 1.0,
    polarity: -1,
    i18nKey: 'questions.q29',
    source: 'WVS — army/experts rule (reverse-keyed)',
    reasoning: 'Preferring the military or experts over elected politicians in a crisis indicates a non-democratic leaning.',
  },

  // ── State intervention ↔ Free market (additional) ───────────────────────
  {
    id: 'q30',
    dimension: 'state',
    weight: 1.0,
    polarity: -1,
    i18nKey: 'questions.q30',
    source: 'Pew — individual vs. state responsibility',
    reasoning: 'Believing people should provide for their own needs rather than the state indicates a low-intervention leaning.',
  },
  {
    id: 'q31',
    dimension: 'state',
    weight: 0.9,
    polarity: 1,
    i18nKey: 'questions.q31',
    source: 'WVS — price controls on essentials',
    reasoning: 'Supporting government control of essential prices indicates a pro-intervention leaning.',
  },
  {
    id: 'q32',
    dimension: 'state',
    weight: 1.0,
    polarity: -1,
    i18nKey: 'questions.q32',
    source: 'Political Compass — privatisation (reverse-keyed)',
    reasoning: 'Believing privatisation usually benefits society indicates a free-market (low-intervention) leaning.',
  },

  // ── Religious/traditional ↔ Secular (additional) ────────────────────────
  {
    id: 'q33',
    dimension: 'secular',
    weight: 1.0,
    polarity: -1,
    i18nKey: 'questions.q33',
    source: 'Pew — religion in public schooling',
    reasoning: 'Wanting religious values taught in public schools indicates a religious/traditional leaning.',
  },
  {
    id: 'q34',
    dimension: 'secular',
    weight: 1.0,
    polarity: 1,
    i18nKey: 'questions.q34',
    source: 'WVS — social consensus vs. religious rulings',
    reasoning: 'Preferring laws set by public consensus rather than religious rulings indicates a secular leaning.',
  },
  {
    id: 'q35',
    dimension: 'secular',
    weight: 0.9,
    polarity: -1,
    i18nKey: 'questions.q35',
    source: 'WVS — preserving traditional identity',
    reasoning: 'Prioritising the preservation of traditional values and identity indicates a traditional leaning.',
  },
]

/** Quick lookup by id. */
export const QUESTION_BY_ID: Record<string, Question> = Object.fromEntries(
  QUESTIONS.map((q) => [q.id, q]),
)

/**
 * Display order for the questionnaire: items are interleaved by dimension
 * (round-robin) so that two consecutive questions never measure the same
 * dimension. This reduces respondent fatigue and answer patterning. Scoring is
 * order-independent, so this affects presentation only — not the result.
 */
export const QUESTIONS_ORDERED: Question[] = (() => {
  const byDimension = new Map<string, Question[]>()
  for (const q of QUESTIONS) {
    const group = byDimension.get(q.dimension) ?? []
    group.push(q)
    byDimension.set(q.dimension, group)
  }
  const groups = [...byDimension.values()]
  const longest = Math.max(...groups.map((g) => g.length))
  const ordered: Question[] = []
  for (let i = 0; i < longest; i++) {
    for (const group of groups) {
      if (group[i]) ordered.push(group[i])
    }
  }
  return ordered
})()
