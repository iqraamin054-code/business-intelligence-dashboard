import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import './SalesChart.css'

const salesData = [
  { category: 'Electronics', sales: 450 },
  { category: 'Clothing', sales: 320 },
  { category: 'Furniture', sales: 210 },
  { category: 'Books', sales: 180 },
]

function formatSales(value) {
  return new Intl.NumberFormat('en-US').format(value)
}

function SalesTooltip({ active, payload, label }) {
  if (!active || !payload?.length) {
    return null
  }

  return (
    <div className="sales-chart__tooltip">
      <p className="sales-chart__tooltip-label">{label}</p>
      <p className="sales-chart__tooltip-value">
        {formatSales(payload[0].value)} units
      </p>
    </div>
  )
}

function SalesChart() {
  return (
    <section className="sales-chart" aria-label="Sales comparison chart">
      <h3 className="sales-chart__title">Sales Comparison</h3>
      <div className="sales-chart__container">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={salesData}
            margin={{ top: 8, right: 16, left: 0, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e2e8f0"
              vertical={false}
            />
            <XAxis
              dataKey="category"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 12 }}
              dy={8}
              interval={0}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 12 }}
              width={40}
            />
            <Tooltip
              content={<SalesTooltip />}
              cursor={{ fill: 'rgba(37, 99, 235, 0.08)' }}
            />
            <Bar
              dataKey="sales"
              fill="#2563eb"
              radius={[4, 4, 0, 0]}
              maxBarSize={56}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}

export default SalesChart
