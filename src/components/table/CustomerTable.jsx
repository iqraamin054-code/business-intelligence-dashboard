import { useMemo, useState } from 'react'
import {
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiChevronUp,
} from 'react-icons/fi'
import './CustomerTable.css'

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}

function CustomerTable({ customers, t, searchText = '', language }) {
  const [sortField, setSortField] = useState('revenue')
  const [sortOrder, setSortOrder] = useState('desc')
  const [currentPage, setCurrentPage] = useState(1)
  const rowsPerPage = 5

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder((currentOrder) => (currentOrder === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortField(field)
      setSortOrder('desc')
    }
  }

  const sortedCustomers = useMemo(() => {
    return [...customers].sort((a, b) => {
      if (!sortField) return 0
      const valueA = a[sortField]
      const valueB = b[sortField]

      if (valueA < valueB) {
        return sortOrder === 'asc' ? -1 : 1
      }
      if (valueA > valueB) {
        return sortOrder === 'asc' ? 1 : -1
      }
      return 0
    })
  }, [customers, sortField, sortOrder])

  const totalPages = Math.ceil(sortedCustomers.length / rowsPerPage) || 1
  const safeCurrentPage = Math.min(currentPage, totalPages)
  const paginatedCustomers = sortedCustomers.slice(
    (safeCurrentPage - 1) * rowsPerPage,
    safeCurrentPage * rowsPerPage
  )

  return (
    <section className="customer-table-section" aria-label="Customer records table">
      <div className="customer-table-header">
        <h3 className="customer-table-title">{t('customerDetails')}</h3>
      </div>

      <div className="customer-table-container">
        <table className="customer-table">
          <thead>
            <tr>
              <th>{t('customerName')}</th>
              <th
                onClick={() => handleSort('revenue')}
                className="sortable-header"
                role="columnheader"
                aria-sort={sortField === 'revenue' ? (sortOrder === 'asc' ? 'ascending' : 'descending') : 'none'}
              >
                <div className="header-cell-content">
                  {t('revenue')}
                  <span className={`sort-icon ${sortField === 'revenue' ? 'active' : ''}`}>
                    {sortField === 'revenue' && sortOrder === 'asc' ? <FiChevronUp /> : <FiChevronDown />}
                  </span>
                </div>
              </th>
              <th
                onClick={() => handleSort('orders')}
                className="sortable-header"
                role="columnheader"
                aria-sort={sortField === 'orders' ? (sortOrder === 'asc' ? 'ascending' : 'descending') : 'none'}
              >
                <div className="header-cell-content">
                  {t('orders')}
                  <span className={`sort-icon ${sortField === 'orders' ? 'active' : ''}`}>
                    {sortField === 'orders' && sortOrder === 'asc' ? <FiChevronUp /> : <FiChevronDown />}
                  </span>
                </div>
              </th>
              <th>{t('status')}</th>
              <th>{t('region')}</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCustomers.length > 0 ? (
              paginatedCustomers.map((customer) => (
                <tr key={customer.id}>
                  <td className="customer-name-cell">{customer.name}</td>
                  <td className="customer-revenue-cell">{formatCurrency(customer.revenue)}</td>
                  <td>{customer.orders}</td>
                  <td>
                    <span className={`status-badge status-${customer.status.toLowerCase()}`}>
                      {customer.status === 'Active' ? t('active') : t('inactive')}
                    </span>
                  </td>
                  <td>{customer.region}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="empty-table-cell">
                  {searchText
                    ? (language === 'ur'
                        ? `تلاش کے مطابق کوئی صارفین نہیں ملے: "${searchText}"`
                        : `No customers match the search criteria for "${searchText}".`)
                    : t('noCustomers')}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="customer-table-pagination">
        <span className="pagination-info">
          {t('showing')} {sortedCustomers.length > 0 ? (safeCurrentPage - 1) * rowsPerPage + 1 : 0} {t('to')}{' '}
          {Math.min(safeCurrentPage * rowsPerPage, sortedCustomers.length)} {t('of')} {sortedCustomers.length}{' '}
          {t('entries')}
        </span>

        <div className="pagination-buttons">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={safeCurrentPage === 1}
            className="pagination-btn"
            aria-label="Previous page"
          >
            <FiChevronLeft />
            <span>{t('prev')}</span>
          </button>

          <span className="pagination-current-page">
            {t('page')} {safeCurrentPage} {t('of')} {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={safeCurrentPage === totalPages}
            className="pagination-btn"
            aria-label="Next page"
          >
            <span>{t('next')}</span>
            <FiChevronRight />
          </button>
        </div>
      </div>
    </section>
  )
}

export default CustomerTable
