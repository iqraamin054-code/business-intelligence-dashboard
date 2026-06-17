import { useSelector } from 'react-redux'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import './RevenueChart.css'

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}

function RevenueTooltip({ active, payload, label }) {
  if (!active || !payload?.length) {
    return null
  }

  return (
    <div className="revenue-chart__tooltip">
      <p className="revenue-chart__tooltip-label">{label}</p>
      <p className="revenue-chart__tooltip-value">
        {formatCurrency(payload[0].value)}
      </p>
    </div>
  )
}

function RevenueChart({ title = 'Revenue Trend' }) {
  const revenueData = useSelector((state) => state.dashboard.revenueData)

  return (
    <section className="revenue-chart" aria-label="Revenue trend chart">
      <h3 className="revenue-chart__title">{title}</h3>
      <div className="revenue-chart__container">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={revenueData}
            margin={{ top: 8, right: 16, left: 0, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--border-color)"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'var(--text-muted)', fontSize: 12, fontWeight: 500 }}
              dy={8}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'var(--text-muted)', fontSize: 12, fontWeight: 500 }}
              tickFormatter={(value) => `$${value / 1000}k`}
              width={48}
            />
            <Tooltip content={<RevenueTooltip />} cursor={{ stroke: 'var(--border-color)', strokeWidth: 1 }} />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="var(--accent)"
              strokeWidth={3}
              dot={{ fill: 'var(--accent)', strokeWidth: 2, r: 4, stroke: 'var(--bg-card)' }}
              activeDot={{ r: 6, fill: 'var(--accent)', stroke: 'var(--bg-card)', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}

export default RevenueChart
