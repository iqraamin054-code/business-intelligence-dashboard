import { useEffect, useState } from 'react'
import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getDashboardData } from './redux/dashboardSlice'
import Header from './components/layout/Header'
import Sidebar from './components/layout/Sidebar'
import Dashboard from './pages/Dashboard'
import Analytics from './pages/Analytics'
import Reports from './pages/Reports'
import Settings from './pages/Settings'
import { getTranslator } from './utils/i18n'
import './pages/Dashboard.css'

const defaultProfile = {
  name: 'Admin User',
  role: 'Business Intelligence Analyst',
  email: 'admin@insighthub.com',
}

function loadStoredProfile() {
  try {
    const stored = JSON.parse(localStorage.getItem('bi-profile'))
    return stored ? { ...defaultProfile, ...stored } : defaultProfile
  } catch {
    return defaultProfile
  }
}

function AppShell() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [theme, setTheme] = useState(() => localStorage.getItem('bi-theme') || 'light')
  const [language, setLanguage] = useState(() => localStorage.getItem('bi-language') || 'en')
  const [profile, setProfile] = useState(loadStoredProfile)
  const [showProfileForm, setShowProfileForm] = useState(false)
  const [toastMessage, setToastMessage] = useState(null)
  const [searchText, setSearchText] = useState('')
  const dispatch = useDispatch()
  const { loading, error, dataFetched } = useSelector((state) => state.dashboard)
  const t = getTranslator(language)
  const location = useLocation()

  useEffect(() => {
    dispatch(getDashboardData())
  }, [dispatch])

  useEffect(() => {
    setSearchText('')
  }, [location.pathname])

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(theme)
    localStorage.setItem('bi-theme', theme)
  }, [theme])

  useEffect(() => {
    document.documentElement.lang = language
    document.documentElement.dir = language === 'ur' ? 'rtl' : 'ltr'
    localStorage.setItem('bi-language', language)
  }, [language])

  useEffect(() => {
    if (location.pathname !== '/settings') {
      setShowProfileForm(false)
    }
  }, [location.pathname])

  useEffect(() => {
    localStorage.setItem('bi-profile', JSON.stringify(profile))
  }, [profile])

  useEffect(() => {
    if (!toastMessage) return
    const timer = setTimeout(() => setToastMessage(null), 2500)
    return () => clearTimeout(timer)
  }, [toastMessage])

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'))
  }

  const updateProfile = (updates) => {
    setProfile((currentProfile) => ({ ...currentProfile, ...updates }))
  }

  const openProfileForm = () => setShowProfileForm(true)
  const closeProfileForm = () => setShowProfileForm(false)
  const showToast = (message) => setToastMessage(message)

  return (
    <div className="dashboard">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onNavigate={() => setSidebarOpen(false)}
        t={t}
      />

      <div className="dashboard__main">
        <Header
          onMenuToggle={() => setSidebarOpen(true)}
          theme={theme}
          onThemeToggle={toggleTheme}
          language={language}
          onLanguageChange={setLanguage}
          searchValue={searchText}
          onSearchChange={setSearchText}
          t={t}
          loading={loading}
          error={error}
          profile={profile}
          onOpenProfile={openProfileForm}
        />

        <main className="dashboard__content">
          {loading || !dataFetched ? (
            <div className="dashboard__state dashboard__state--loading">
              <div className="dashboard__spinner"></div>
              <p>{t('fetchingMetrics')}</p>
            </div>
          ) : error ? (
            <div className="dashboard__state dashboard__state--error">
              <div className="dashboard__state-icon" role="img" aria-label="Warning">!</div>
              <h4 className="dashboard__state-title">{t('systemError')}</h4>
              <p className="dashboard__state-desc">{error}</p>
              <button
                className="dashboard__state-btn"
                onClick={() => dispatch(getDashboardData())}
              >
                {t('retryRequest')}
              </button>
            </div>
          ) : (
            <Outlet
              context={{
                theme,
                setTheme,
                toggleTheme,
                language,
                t,
                searchText,
                setSearchText,
                profile,
                updateProfile,
                showProfileForm,
                closeProfileForm,
                showToast,
              }}
            />
          )}
        </main>
      </div>

      {toastMessage && (
        <div
          role="status"
          style={{
            position: 'fixed',
            top: '1.25rem',
            right: '1.25rem',
            zIndex: 200,
            padding: '0.75rem 1.25rem',
            borderRadius: 'var(--radius-lg)',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-lg)',
            color: 'var(--color-success)',
            fontWeight: 600,
            fontSize: '0.875rem',
          }}
        >
          {toastMessage}
        </div>
      )}
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<Dashboard />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="reports" element={<Reports />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default App