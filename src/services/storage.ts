import type { Answers, ThemeMode } from '@/types'

/**
 * Tiny, typed wrapper over localStorage. Everything in قطب‌نما is processed and
 * stored locally — there is no backend, no account and no analytics. Failures
 * (private mode, disabled storage) degrade gracefully to no-ops.
 */

const KEYS = {
  answers: 'qotbnama.answers',
  theme: 'qotbnama.theme',
  language: 'qotbnama.language',
  langSource: 'qotbnama.langSource',
  completedAt: 'qotbnama.completedAt',
  completionHistory: 'qotbnama.completionHistory',
} as const

export interface CompletionRecord {
  completedAt: string
  quadrant: string
  economic: number
  social: number
}

/** How the current language was decided. */
export type LangSource = 'user' | 'geo' | 'browser'

function read<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key)
    return raw === null ? null : (JSON.parse(raw) as T)
  } catch {
    return null
  }
}

function write(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* storage unavailable — ignore */
  }
}

function remove(key: string): void {
  try {
    localStorage.removeItem(key)
  } catch {
    /* ignore */
  }
}

export const storage = {
  getAnswers: (): Answers => read<Answers>(KEYS.answers) ?? {},
  saveAnswers: (answers: Answers) => write(KEYS.answers, answers),

  getCompletedAt: (): string | null => read<string>(KEYS.completedAt),
  setCompletedAt: (iso: string) => write(KEYS.completedAt, iso),

  getTheme: (): ThemeMode | null => read<ThemeMode>(KEYS.theme),
  saveTheme: (theme: ThemeMode) => write(KEYS.theme, theme),

  getLanguage: (): string | null => read<string>(KEYS.language),
  saveLanguage: (lang: string) => write(KEYS.language, lang),

  getLangSource: (): LangSource | null => read<LangSource>(KEYS.langSource),
  setLangSource: (source: LangSource) => write(KEYS.langSource, source),

  clearAssessment: () => {
    remove(KEYS.answers)
    remove(KEYS.completedAt)
  },

  getCompletionHistory: (): CompletionRecord[] =>
    read<CompletionRecord[]>(KEYS.completionHistory) ?? [],

  addCompletionRecord: (record: CompletionRecord) => {
    const history = read<CompletionRecord[]>(KEYS.completionHistory) ?? []
    history.push(record)
    write(KEYS.completionHistory, history)
  },
}
