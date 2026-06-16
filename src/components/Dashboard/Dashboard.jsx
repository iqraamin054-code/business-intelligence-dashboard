import { useState } from 'react'
import {
  FiDollarSign,
  FiShoppingCart,
  FiTrendingUp,
  FiUsers,
  FiTarget,
} from 'react-icons/fi'
import Header from '../Header/Header'
import KpiCard from '../KpiCard/KpiCard'
import RevenueChart from '../RevenueChart/RevenueChart'
import SalesChart from '../SalesChart/SalesChart'
import Sidebar from '../Sidebar/Sidebar'
import './Dashboard.css'

const kpiData = [
  {
    title: 'Total Revenue',
    value: '$125,430',
    trend: '+8.2% from last month',
    trendDirection: 'up',
    icon: FiDollarSign,
  },
  {
    title: 'Total Customers',
    value: '2,845',
    trend: '+156 new this month',
    trendDirection: 'up',
    icon: FiUsers,
  },
  {
    title: 'Total Orders',
    value: '1,234',
    trend: '+5.3% from last month',
    trendDirection: 'up',
    icon: FiShoppingCart,
  },
  {
    title: 'Monthly Growth',
    value: '+12.5%',
    trend: 'Up from 10.1% last month',
    trendDirection: 'up',
    icon: FiTrendingUp,
  },
  {
    title: 'Conversion Rate',
    value: '4.8%',
    trend: '+0.6% from last month',
    trendDirection: 'up',
    icon: FiTarget,
  },
]

const pageTitles = {
  dashboard: 'Dashboard',
  analytics: 'Analytics',
  reports: 'Reports',
  settings: 'Settings',
}

function Dashboard() {
  const [activeItem, setActiveItem] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)

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
        <Header onMenuToggle={() => setSidebarOpen(true)} />

        <main className="dashboard__content">
          <div className="dashboard__content-inner">
            <section className="dashboard__welcome">
              <h2 className="dashboard__page-title">{pageTitles[activeItem]}</h2>
              <p className="dashboard__page-description">
                Welcome to your business intelligence workspace. Select a section
                from the sidebar to get started.
              </p>
            </section>

            <section className="dashboard__kpi-section" aria-label="Key performance indicators">
              <h3 className="dashboard__section-title">Overview</h3>
              <div className="dashboard__kpi-grid">
                {kpiData.map((kpi) => (
                  <KpiCard key={kpi.title} {...kpi} />
                ))}
              </div>
            </section>

            <section className="dashboard__chart-section" aria-label="Analytics charts">
              <div className="dashboard__charts-grid">
                <RevenueChart />
                <SalesChart />
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Dashboard
