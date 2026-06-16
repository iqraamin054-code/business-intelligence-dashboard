import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import {
  FiDollarSign,
  FiShoppingCart,
  FiTrendingUp,
  FiUsers,
  FiTarget,
} from 'react-icons/fi'
import Header from '../components/layout/Header'
import KpiCard from '../components/cards/KpiCard'
import RevenueChart from '../components/charts/RevenueChart'
import SalesChart from '../components/charts/SalesChart'
import CustomerChart from '../components/charts/CustomerChart'
import CategoryChart from '../components/charts/CategoryChart'
import CustomerTable from '../components/table/CustomerTable'
import Sidebar from '../components/layout/Sidebar'
import './Dashboard.css'

const iconMap = {
  dollar: FiDollarSign,
  users: FiUsers,
  cart: FiShoppingCart,
  trending: FiTrendingUp,
  target: FiTarget,
}

const pageTitles = {
  dashboard: 'Dashboard',
  analytics: 'Analytics',
  reports: 'Reports',
  settings: 'Settings',
}

const pageDescriptions = {
  dashboard: 'Welcome to your business intelligence workspace. Select a section from the sidebar to get started.',
  analytics: 'Analyze key metrics and trends over time with visual analytics reporting.',
  reports: 'Generate, filter, and inspect various business performance reports.',
  settings: 'Configure your intelligence workspace profile and settings.',
}

function Dashboard() {
  const [activeItem, setActiveItem] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [theme, setTheme] = useState(() => localStorage.getItem('bi-theme') || 'light')
  
  const kpis = useSelector((state) => state.dashboard.kpis)

  // Effect to apply theme (light/dark)
  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(theme)
    localStorage.setItem('bi-theme', theme)
  }, [theme])

  const handleItemSelect = (itemId) => {
    setActiveItem(itemId)
    setSidebarOpen(false)
  }

  return (
    <div className="dashboard">
      <Sidebar
        activeItem={activeItem}
        onItemSelect={handleItemSelect}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="dashboard__main">
        <Header 
          onMenuToggle={() => setSidebarOpen(true)}
          theme={theme}
          onThemeToggle={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
        />

        <main className="dashboard__content">
          <div className="dashboard__content-inner" key={activeItem}>
            <section className="dashboard__welcome" aria-label="Welcome section">
              <h2 className="dashboard__page-title">{pageTitles[activeItem]}</h2>
              <p className="dashboard__page-description">
                {pageDescriptions[activeItem]}
              </p>
            </section>

            <section className="dashboard__kpi-section" aria-label="Key performance indicators">
              <h3 className="dashboard__section-title">Overview</h3>
              <div className="dashboard__kpi-grid">
                {kpis.map((kpi) => (
                  <KpiCard key={kpi.title} {...kpi} icon={iconMap[kpi.iconName]} />
                ))}
              </div>
            </section>

            <section className="dashboard__chart-section" aria-label="Analytics charts">
              <div className="dashboard__charts-grid">
                <RevenueChart />
                <SalesChart />
                <CustomerChart />
                <CategoryChart />
              </div>
            </section>

            <CustomerTable />
          </div>
        </main>
      </div>
    </div>
  )
}

export default Dashboard
