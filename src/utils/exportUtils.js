function escapeCsvValue(value) {
  const stringValue = String(value ?? '')
  return `"${stringValue.replaceAll('"', '""')}"`
}

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function downloadTextFile(content, fileName, type) {
  const blob = new Blob([content], { type })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = fileName
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}

export function exportCustomersCsv(customers) {
  const headers = ['Customer Name', 'Revenue', 'Orders', 'Status', 'Region']
  const rows = customers.map((customer) => [
    customer.name,
    customer.revenue,
    customer.orders,
    customer.status,
    customer.region,
  ])
  const csv = [headers, ...rows]
    .map((row) => row.map(escapeCsvValue).join(','))
    .join('\n')

  downloadTextFile(csv, 'customers.csv', 'text/csv;charset=utf-8;')
}

function renderDataTable(title, rows, columns) {
  return `
    <section>
      <h2>${escapeHtml(title)}</h2>
      <table>
        <thead>
          <tr>${columns.map((column) => `<th>${escapeHtml(column.label)}</th>`).join('')}</tr>
        </thead>
        <tbody>
          ${rows.map((row) => `
            <tr>
              ${columns.map((column) => `<td>${escapeHtml(row[column.key])}</td>`).join('')}
            </tr>
          `).join('')}
        </tbody>
      </table>
    </section>
  `
}

export function exportDashboardPdf({ kpis, revenueData, salesData, customerData, categoryData, customers }) {
  const reportWindow = window.open('', '_blank')

  if (!reportWindow) {
    window.alert('Please allow pop-ups to export the PDF report.')
    return
  }

  const html = `
    <!doctype html>
    <html>
      <head>
        <title>Business Intelligence Dashboard Report</title>
        <style>
          body {
            margin: 32px;
            color: #0f172a;
            font-family: Arial, sans-serif;
            line-height: 1.45;
          }
          h1, h2 {
            margin: 0 0 12px;
          }
          h1 {
            font-size: 26px;
          }
          h2 {
            margin-top: 28px;
            font-size: 18px;
          }
          .kpis {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }
          .kpi {
            border: 1px solid #cbd5e1;
            border-radius: 8px;
            padding: 12px;
          }
          .kpi span {
            display: block;
            color: #64748b;
            font-size: 12px;
          }
          .kpi strong {
            display: block;
            margin: 6px 0;
            font-size: 22px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
            font-size: 12px;
          }
          th, td {
            border: 1px solid #cbd5e1;
            padding: 8px;
            text-align: left;
          }
          th {
            background: #f1f5f9;
          }
          @media print {
            button {
              display: none;
            }
          }
        </style>
      </head>
      <body>
        <button onclick="window.print()">Save as PDF</button>
        <h1>Business Intelligence Dashboard Report</h1>
        <p>Use your browser print dialog and choose "Save as PDF".</p>

        <section>
          <h2>KPI Cards</h2>
          <div class="kpis">
            ${kpis.map((kpi) => `
              <div class="kpi">
                <span>${escapeHtml(kpi.title)}</span>
                <strong>${escapeHtml(kpi.value)}</strong>
                <span>${escapeHtml(kpi.trend)}</span>
              </div>
            `).join('')}
          </div>
        </section>

        ${renderDataTable('Revenue Chart Data', revenueData, [
          { key: 'month', label: 'Month' },
          { key: 'revenue', label: 'Revenue' },
        ])}
        ${renderDataTable('Sales Chart Data', salesData, [
          { key: 'category', label: 'Category' },
          { key: 'sales', label: 'Sales' },
        ])}
        ${renderDataTable('Customer Growth Chart Data', customerData, [
          { key: 'month', label: 'Month' },
          { key: 'customers', label: 'Customers' },
        ])}
        ${renderDataTable('Category Distribution Chart Data', categoryData, [
          { key: 'name', label: 'Category' },
          { key: 'value', label: 'Share' },
        ])}
        ${renderDataTable('Customer Table', customers, [
          { key: 'name', label: 'Customer Name' },
          { key: 'revenue', label: 'Revenue' },
          { key: 'orders', label: 'Orders' },
          { key: 'status', label: 'Status' },
          { key: 'region', label: 'Region' },
        ])}
      </body>
    </html>
  `

  reportWindow.document.open()
  reportWindow.document.write(html)
  reportWindow.document.close()
  reportWindow.focus()
  reportWindow.print()
}
