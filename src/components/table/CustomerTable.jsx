import { useState } from 'react'
import {
  FiSearch,
  FiChevronUp,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiFilter,
} from 'react-icons/fi'
import './CustomerTable.css'

const sampleCustomers = [
  { id: 1, name: 'Alice Johnson', revenue: 12450, orders: 45, status: 'Active', region: 'North America' },
  { id: 2, name: 'Bob Smith', revenue: 8200, orders: 28, status: 'Active', region: 'Europe' },
  { id: 3, name: 'Charlie Brown', revenue: 0, orders: 0, status: 'Inactive', region: 'North America' },
  { id: 4, name: 'Diana Prince', revenue: 24500, orders: 82, status: 'Active', region: 'Asia' },
  { id: 5, name: 'Ethan Hunt', revenue: 15300, orders: 51, status: 'Active', region: 'Europe' },
  { id: 6, name: 'Fiona Gallagher', revenue: 3200, orders: 12, status: 'Inactive', region: 'North America' },
  { id: 7, name: 'George Clark', revenue: 19800, orders: 64, status: 'Active', region: 'Asia' },
  { id: 8, name: 'Hannah Abbott', revenue: 0, orders: 0, status: 'Inactive', region: 'Europe' },
  { id: 9, name: 'Ian Malcolm', revenue: 11200, orders: 37, status: 'Active', region: 'South America' },
  { id: 10, name: 'Julia Roberts', revenue: 27100, orders: 95, status: 'Active', region: 'North America' },
  { id: 11, name: 'Kevin Bacon', revenue: 5400, orders: 19, status: 'Active', region: 'Europe' },
  { id: 12, name: 'Laura Croft', revenue: 31000, orders: 110, status: 'Active', region: 'Asia' },
]

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}

function CustomerTable() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [sortField, setSortField] = useState('revenue') // Default sort by revenue
  const [sortOrder, setSortOrder] = useState('desc') // Default desc
  const [currentPage, setCurrentPage] = useState(1)
  const rowsPerPage = 5

  // Handle sorting
  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortOrder('desc')
    }
    setCurrentPage(1)
  }

  // Filter & Sort logic
  const filteredCustomers = sampleCustomers
    .filter((customer) => {
      const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === 'All' || customer.status === statusFilter
      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
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

  // Pagination
  const totalPages = Math.ceil(filteredCustomers.length / rowsPerPage) || 1
  const paginatedCustomers = filteredCustomers.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  )

  // Reset pagination if search/filter changes totalPages to be less than current page
  if (currentPage > totalPages) {
    setCurrentPage(totalPages)
  }

  return (
    <section className="customer-table-section" aria-label="Customer records table">
      <div className="customer-table-header">
        <h3 className="customer-table-title">Customer Details</h3>
        
        <div className="customer-table-controls">
          <div className="customer-table-search-wrapper">
            <FiSearch className="customer-table-search-icon" />
            <input
              type="text"
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
              className="customer-table-search-input"
            />
          </div>

          <div className="customer-table-filter-wrapper">
            <FiFilter className="customer-table-filter-icon" />
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value)
                setCurrentPage(1)
              }}
              className="customer-table-filter-select"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      <div className="customer-table-container">
        <table className="customer-table">
          <thead>
            <tr>
              <th>Customer Name</th>
              <th 
                onClick={() => handleSort('revenue')} 
                className="sortable-header"
                role="columnheader"
                aria-sort={sortField === 'revenue' ? (sortOrder === 'asc' ? 'ascending' : 'descending') : 'none'}
              >
                <div className="header-cell-content">
                  Revenue
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
                  Orders
                  <span className={`sort-icon ${sortField === 'orders' ? 'active' : ''}`}>
                    {sortField === 'orders' && sortOrder === 'asc' ? <FiChevronUp /> : <FiChevronDown />}
                  </span>
                </div>
              </th>
              <th>Status</th>
              <th>Region</th>
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
                      {customer.status}
                    </span>
                  </td>
                  <td>{customer.region}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="empty-table-cell">
                  No customers match the search criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="customer-table-pagination">
        <span className="pagination-info">
          Showing {filteredCustomers.length > 0 ? (currentPage - 1) * rowsPerPage + 1 : 0} to{' '}
          {Math.min(currentPage * rowsPerPage, filteredCustomers.length)} of {filteredCustomers.length} entries
        </span>
        
        <div className="pagination-buttons">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="pagination-btn"
            aria-label="Previous page"
          >
            <FiChevronLeft />
            <span>Prev</span>
          </button>
          
          <span className="pagination-current-page">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="pagination-btn"
            aria-label="Next page"
          >
            <span>Next</span>
            <FiChevronRight />
          </button>
        </div>
      </div>
    </section>
  )
}

export default CustomerTable
