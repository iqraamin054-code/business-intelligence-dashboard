import { useEffect, useState } from 'react'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getDashboardData } from './redux/dashboardSlice'
import Header from './components/layout/Header'
import Sidebar from './components/layout/Sidebar'
import Dashboard from './pages/Dashboard'
import Analytics from './pages/Analytics'
import Reports from './pages/Reports'
import Settings from './pages/Settings'
import './pages/Dashboard.css'

function AppShell() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [theme, setTheme] = useState(() => localStorage.getItem('bi-theme') || 'light')
  const dispatch = useDispatch()
  const { loading, error, dataFetched } = useSelector((state) => state.dashboard)

  useEffect(() => {
    dispatch(getDashboardData())
  }, [dispatch])

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(theme)
    localStorage.setItem('bi-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'))
  }

  return (
    <div className="dashboard">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onNavigate={() => setSidebarOpen(false)}
      />

      <div className="dashboard__main">
        <Header
          onMenuToggle={() => setSidebarOpen(true)}
          theme={theme}
          onThemeToggle={toggleTheme}
        />

        <main className="dashboard__content">
          {loading || !dataFetched ? (
            <div className="dashboard__state dashboard__state--loading">
              <div className="dashboard__spinner"></div>
              <p>Fetching dashboard metrics...</p>
            </div>
          ) : error ? (
            <div className="dashboard__state dashboard__state--error">
              <div className="dashboard__state-icon" role="img" aria-label="Warning">!</div>
              <h4 className="dashboard__state-title">System Error</h4>
              <p className="dashboard__state-desc">{error}</p>
              <button
                className="dashboard__state-btn"
                onClick={() => dispatch(getDashboardData())}
              >
                Retry Request
              </button>
            </div>
          ) : (
            <Outlet context={{ theme, setTheme, toggleTheme }} />
          )}
        </main>
      </div>
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
