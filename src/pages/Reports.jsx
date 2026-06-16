import CustomerTable from '../components/table/CustomerTable'

function Reports() {
  return (
    <div className="dashboard__content-inner">
      <section className="dashboard__welcome" aria-label="Reports overview">
        <h2 className="dashboard__page-title">Reports</h2>
        <p className="dashboard__page-description">
          Review customer-level performance with searchable, sortable, and filterable report data.
        </p>
      </section>

      <CustomerTable />
    </div>
  )
}

export default Reports
