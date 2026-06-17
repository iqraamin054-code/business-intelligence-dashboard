import { FiInbox } from 'react-icons/fi'
import { useOutletContext } from 'react-router-dom'
import RevenueChart from '../components/charts/RevenueChart'
import SalesChart from '../components/charts/SalesChart'
import CustomerChart from '../components/charts/CustomerChart'
import CategoryChart from '../components/charts/CategoryChart'

function Analytics() {
  const { t, searchText = '' } = useOutletContext()
  const query = searchText.trim().toLowerCase()

  const charts = [
    { key: 'revenue', title: t('revenueTrend'), Component: RevenueChart },
    { key: 'sales', title: t('salesComparison'), Component: SalesChart },
    { key: 'customers', title: t('customerGrowth'), Component: CustomerChart },
    { key: 'category', title: t('categoryDistribution'), Component: CategoryChart },
  ]

  const filteredCharts = charts.filter((chart) =>
    chart.title.toLowerCase().includes(query)
  )

  return (
    <div className="dashboard__content-inner">
      <section className="dashboard__welcome" aria-label="Analytics overview">
        <h2 className="dashboard__page-title">{t('analyticsTitle')}</h2>
        <p className="dashboard__page-description">
          {t('analyticsDescription')}
        </p>
      </section>

      <section className="dashboard__chart-section" aria-label="Analytics charts">
        <h3 className="dashboard__section-title">{t('performanceCharts')}</h3>
        {filteredCharts.length === 0 ? (
          <div className="dashboard__state dashboard__state--empty">
            <FiInbox className="dashboard__state-icon" aria-label="Empty state" />
            <h4 className="dashboard__state-title">{t('noData')}</h4>
            <p className="dashboard__state-desc">{t('noAnalyticsResults')}</p>
          </div>
        ) : (
          <div className="dashboard__charts-grid">
            {filteredCharts.map(({ key, title, Component }) => (
              <Component key={key} title={title} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default Analytics
