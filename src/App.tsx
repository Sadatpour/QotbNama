import { lazy, Suspense } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from '@/context/ThemeContext'
import { QuizProvider } from '@/context/QuizContext'
import { Layout } from '@/components/layout/Layout'
import { PageLoader } from '@/components/ui/PageLoader'
import { Landing } from '@/pages/Landing'

// Landing loads eagerly (first paint); the rest are code-split.
const Introduction = lazy(() => import('@/pages/Introduction').then((m) => ({ default: m.Introduction })))
const Questionnaire = lazy(() => import('@/pages/Questionnaire').then((m) => ({ default: m.Questionnaire })))
const Results = lazy(() => import('@/pages/Results').then((m) => ({ default: m.Results })))
const Education = lazy(() => import('@/pages/Education').then((m) => ({ default: m.Education })))
const EducationDetail = lazy(() =>
  import('@/pages/EducationDetail').then((m) => ({ default: m.EducationDetail })),
)
const WorldMap = lazy(() => import('@/pages/WorldMap').then((m) => ({ default: m.WorldMap })))
const SharePage = lazy(() => import('@/pages/SharePage').then((m) => ({ default: m.SharePage })))
const NotFound = lazy(() => import('@/pages/NotFound').then((m) => ({ default: m.NotFound })))

export default function App() {
  return (
    <ThemeProvider>
      <QuizProvider>
        <HashRouter>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route element={<Layout />}>
                <Route index element={<Landing />} />
                <Route path="intro" element={<Introduction />} />
                <Route path="quiz" element={<Questionnaire />} />
                <Route path="results" element={<Results />} />
                <Route path="education" element={<Education />} />
                <Route path="education/:id" element={<EducationDetail />} />
                <Route path="map" element={<WorldMap />} />
                <Route path="share" element={<SharePage />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </Suspense>
        </HashRouter>
      </QuizProvider>
    </ThemeProvider>
  )
}
