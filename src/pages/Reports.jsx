import { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useOutletContext } from 'react-router-dom'
import { FiDownload, FiFileText, FiRotateCcw } from 'react-icons/fi'
import CustomerTable from '../components/table/CustomerTable'
import { exportCustomersCsv, exportDashboardPdf } from '../utils/exportUtils'

const defaultFilters = {
  status: 'All',
  region: 'All',
  minRevenue: '',
  maxRevenue: '',
  minOrders: '',
  maxOrders: '',
}

function Reports() {
  const dashboardData = useSelector((state) => state.dashboard)
  const { customers } = dashboardData
  const { searchText = '', t, language } = useOutletContext()
  const [filters, setFilters] = useState(defaultFilters)

  const regions = useMemo(() => {
    return [...new Set(customers.map((customer) => customer.region))].sort()
  }, [customers])

  const filteredCustomers = useMemo(() => {
    const search = searchText.trim().toLowerCase()
    const minRevenue = filters.minRevenue === '' ? null : Number(filters.minRevenue)
    const maxRevenue = filters.maxRevenue === '' ? null : Number(filters.maxRevenue)
    const minOrders = filters.minOrders === '' ? null : Number(filters.minOrders)
    const maxOrders = filters.maxOrders === '' ? null : Number(filters.maxOrders)

    return customers.filter((customer) => {
      const matchesSearch =
        customer.name.toLowerCase().includes(search) ||
        customer.region.toLowerCase().includes(search) ||
        customer.status.toLowerCase().includes(search)
      const matchesStatus = filters.status === 'All' || customer.status === filters.status
      const matchesRegion = filters.region === 'All' || customer.region === filters.region
      const matchesRevenueMin = minRevenue === null || customer.revenue >= minRevenue
      const matchesRevenueMax = maxRevenue === null || customer.revenue <= maxRevenue
      const matchesOrdersMin = minOrders === null || customer.orders >= minOrders
      const matchesOrdersMax = maxOrders === null || customer.orders <= maxOrders

      return (
        matchesSearch &&
        matchesStatus &&
        matchesRegion &&
        matchesRevenueMin &&
        matchesRevenueMax &&
        matchesOrdersMin &&
        matchesOrdersMax
      )
    })
  }, [customers, filters, searchText])

  const updateFilter = (key, value) => {
    setFilters((currentFilters) => ({ ...currentFilters, [key]: value }))
  }

  return (
    <div className="dashboard__content-inner">
      <section className="dashboard__welcome" aria-label="Reports overview">
        <h2 className="dashboard__page-title">{t('reportsTitle')}</h2>
        <p className="dashboard__page-description">
          {t('reportsDescription')}
        </p>
      </section>

      <section className="report-toolbar" aria-label="Report actions and filters">
        <div className="report-toolbar__top">
          <div>
            <h3 className="dashboard__section-title">{t('advancedFilters')}</h3>
            <p className="report-toolbar__summary">
              {filteredCustomers.length} {t('of')} {customers.length} {t('entries')}
            </p>
          </div>

          <div className="report-toolbar__actions">
            <button
              type="button"
              className="report-toolbar__button"
              onClick={() => exportCustomersCsv(filteredCustomers)}
            >
              <FiDownload aria-hidden="true" />
              {t('exportCsv')}
            </button>
            <button
              type="button"
              className="report-toolbar__button report-toolbar__button--primary"
              onClick={() => exportDashboardPdf({ ...dashboardData, customers: filteredCustomers })}
            >
              <FiFileText aria-hidden="true" />
              {t('exportPdf')}
            </button>
          </div>
        </div>

        <div className="report-filters">
          <label>
            <span>{t('status')}</span>
            <select value={filters.status} onChange={(event) => updateFilter('status', event.target.value)}>
              <option value="All">{t('allStatuses')}</option>
              <option value="Active">{t('active')}</option>
              <option value="Inactive">{t('inactive')}</option>
            </select>
          </label>

          <label>
            <span>{t('region')}</span>
            <select value={filters.region} onChange={(event) => updateFilter('region', event.target.value)}>
              <option value="All">{t('allRegions')}</option>
              {regions.map((region) => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </label>

          <fieldset>
            <legend>{t('revenueRange')}</legend>
            <input
              type="number"
              min="0"
              placeholder={t('minRevenue')}
              value={filters.minRevenue}
              onChange={(event) => updateFilter('minRevenue', event.target.value)}
            />
            <input
              type="number"
              min="0"
              placeholder={t('maxRevenue')}
              value={filters.maxRevenue}
              onChange={(event) => updateFilter('maxRevenue', event.target.value)}
            />
          </fieldset>

          <fieldset>
            <legend>{t('ordersRange')}</legend>
            <input
              type="number"
              min="0"
              placeholder={t('minOrders')}
              value={filters.minOrders}
              onChange={(event) => updateFilter('minOrders', event.target.value)}
            />
            <input
              type="number"
              min="0"
              placeholder={t('maxOrders')}
              value={filters.maxOrders}
              onChange={(event) => updateFilter('maxOrders', event.target.value)}
            />
          </fieldset>

          <button
            type="button"
            className="report-filters__reset"
            onClick={() => setFilters(defaultFilters)}
          >
            <FiRotateCcw aria-hidden="true" />
            {t('resetFilters')}
          </button>
        </div>
      </section>

      <CustomerTable
        key={`${searchText}-${Object.values(filters).join('-')}`}
        customers={filteredCustomers}
        t={t}
        searchText={searchText}
        language={language}
      />
    </div>
  )
}

export default Reports
