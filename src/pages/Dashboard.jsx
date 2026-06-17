import { useSelector } from 'react-redux'
import {
  FiDollarSign,
  FiInbox,
  FiShoppingCart,
  FiTarget,
  FiTrendingUp,
  FiUsers,
} from 'react-icons/fi'
import { useOutletContext } from 'react-router-dom'
import KpiCard from '../components/cards/KpiCard'

const iconMap = {
  dollar: FiDollarSign,
  users: FiUsers,
  cart: FiShoppingCart,
  trending: FiTrendingUp,
  target: FiTarget,
}

const kpiTitleKeys = {
  'Total Revenue': 'totalRevenue',
  'Total Customers': 'totalCustomers',
  'Total Orders': 'totalOrders',
  'Monthly Growth': 'monthlyGrowth',
  'Conversion Rate': 'conversionRate',
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
  const { t, searchText = '' } = useOutletContext()
  const latestRevenue = revenueData.at(-1)?.revenue || 0
  const activeCustomers = customers.filter((customer) => customer.status === 'Active').length
  const query = searchText.trim().toLowerCase()

  const filteredKpis = kpis.filter((kpi) => {
    const title = t(kpiTitleKeys[kpi.title] || kpi.title).toLowerCase()
    return title.includes(query)
  })

  const quickOverviewItems = [
    { label: t('latestMonthlyRevenue'), value: formatCurrency(latestRevenue) },
    { label: t('activeCustomers'), value: String(activeCustomers) },
    { label: t('reportRows'), value: String(customers.length) },
  ]

  const filteredQuickOverviewItems = quickOverviewItems.filter((item) =>
    item.label.toLowerCase().includes(query)
  )

  const hasResults = filteredKpis.length > 0 || filteredQuickOverviewItems.length > 0

  return (
    <div className="dashboard__content-inner">
      <section className="dashboard__welcome" aria-label="Dashboard overview">
        <h2 className="dashboard__page-title">{t('dashboardTitle')}</h2>
        <p className="dashboard__page-description">
          {t('dashboardDescription')}
        </p>
      </section>

      {kpis.length === 0 ? (
        <div className="dashboard__state dashboard__state--empty">
          <FiInbox className="dashboard__state-icon" aria-label="Empty state" />
          <h4 className="dashboard__state-title">{t('noData')}</h4>
          <p className="dashboard__state-desc">
            {t('noDataDescription')}
          </p>
        </div>
      ) : !hasResults ? (
        <div className="dashboard__state dashboard__state--empty">
          <FiInbox className="dashboard__state-icon" aria-label="Empty state" />
          <h4 className="dashboard__state-title">{t('noData')}</h4>
          <p className="dashboard__state-desc">{t('noDashboardResults')}</p>
        </div>
      ) : (
        <>
          {filteredKpis.length > 0 && (
            <section className="dashboard__kpi-section" aria-label="Key performance indicators">
              <h3 className="dashboard__section-title">{t('kpiCards')}</h3>
              <div className="dashboard__kpi-grid">
                {filteredKpis.map((kpi) => (
                  <KpiCard
                    key={kpi.title}
                    {...kpi}
                    title={t(kpiTitleKeys[kpi.title] || kpi.title)}
                    icon={iconMap[kpi.iconName]}
                  />
                ))}
              </div>
            </section>
          )}

          {filteredQuickOverviewItems.length > 0 && (
            <section className="quick-overview" aria-labelledby="quick-overview-title">
              <h3 id="quick-overview-title" className="dashboard__section-title">{t('quickOverview')}</h3>
              <div className="quick-overview__grid">
                {filteredQuickOverviewItems.map((item) => (
                  <article className="quick-overview__item" key={item.label}>
                    <span className="quick-overview__label">{item.label}</span>
                    <strong className="quick-overview__value">{item.value}</strong>
                  </article>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  )
}

export default Dashboard
