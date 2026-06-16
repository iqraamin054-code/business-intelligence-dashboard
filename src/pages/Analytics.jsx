import RevenueChart from '../components/charts/RevenueChart'
import SalesChart from '../components/charts/SalesChart'
import CustomerChart from '../components/charts/CustomerChart'
import CategoryChart from '../components/charts/CategoryChart'

function Analytics() {
  return (
    <div className="dashboard__content-inner">
      <section className="dashboard__welcome" aria-label="Analytics overview">
        <h2 className="dashboard__page-title">Analytics</h2>
        <p className="dashboard__page-description">
          Track revenue, sales, customer growth, and category performance from one focused analytics view.
        </p>
      </section>

      <section className="dashboard__chart-section" aria-label="Analytics charts">
        <h3 className="dashboard__section-title">Performance Charts</h3>
        <div className="dashboard__charts-grid">
          <RevenueChart />
          <SalesChart />
          <CustomerChart />
          <CategoryChart />
        </div>
      </section>
    </div>
  )
}

export default Analytics
