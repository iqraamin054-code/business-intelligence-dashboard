import { useSelector } from 'react-redux'
import {
  FiDollarSign,
  FiShoppingCart,
  FiTrendingUp,
  FiUsers,
  FiTarget,
} from 'react-icons/fi'
import KpiCard from '../components/cards/KpiCard'

const iconMap = {
  dollar: FiDollarSign,
  users: FiUsers,
  cart: FiShoppingCart,
  trending: FiTrendingUp,
  target: FiTarget,
}

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}

function Dashboard() {
  const { kpis, revenueData, customers } = useSelector((state) => state.dashboard)
  const latestRevenue = revenueData.at(-1)?.revenue || 0
  const activeCustomers = customers.filter((customer) => customer.status === 'Active').length

  return (
    <div className="dashboard__content-inner">
      <section className="dashboard__welcome" aria-label="Dashboard overview">
        <h2 className="dashboard__page-title">Dashboard</h2>
        <p className="dashboard__page-description">
          Monitor headline performance and review the fastest read on the business today.
        </p>
      </section>

      {kpis.length === 0 ? (
        <div className="dashboard__state dashboard__state--empty">
          <div className="dashboard__state-icon" role="img" aria-label="Empty state">i</div>
          <h4 className="dashboard__state-title">No Data Available</h4>
          <p className="dashboard__state-desc">
            We couldn't retrieve any business intelligence metrics for this segment.
          </p>
        </div>
      ) : (
        <>
          <section className="dashboard__kpi-section" aria-label="Key performance indicators">
            <h3 className="dashboard__section-title">KPI Cards</h3>
            <div className="dashboard__kpi-grid">
              {kpis.map((kpi) => (
                <KpiCard key={kpi.title} {...kpi} icon={iconMap[kpi.iconName]} />
              ))}
            </div>
          </section>

          <section className="quick-overview" aria-labelledby="quick-overview-title">
            <h3 id="quick-overview-title" className="dashboard__section-title">Quick Overview</h3>
            <div className="quick-overview__grid">
              <article className="quick-overview__item">
                <span className="quick-overview__label">Latest Monthly Revenue</span>
                <strong className="quick-overview__value">{formatCurrency(latestRevenue)}</strong>
              </article>
              <article className="quick-overview__item">
                <span className="quick-overview__label">Active Customers</span>
                <strong className="quick-overview__value">{activeCustomers}</strong>
              </article>
              <article className="quick-overview__item">
                <span className="quick-overview__label">Report Rows</span>
                <strong className="quick-overview__value">{customers.length}</strong>
              </article>
            </div>
          </section>
        </>
      )}
    </div>
  )
}

export default Dashboard
