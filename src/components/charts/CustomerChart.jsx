import { useSelector } from 'react-redux'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import './CustomerChart.css'

function formatNumber(value) {
  return new Intl.NumberFormat('en-US').format(value)
}

function CustomerTooltip({ active, payload, label }) {
  if (!active || !payload?.length) {
    return null
  }

  return (
    <div className="customer-chart__tooltip">
      <p className="customer-chart__tooltip-label">{label}</p>
      <p className="customer-chart__tooltip-value">
        {formatNumber(payload[0].value)} customers
      </p>
    </div>
  )
}

function CustomerChart({ title = 'Customer Growth' }) {
  const customerData = useSelector((state) => state.dashboard.customerData)

  return (
    <section className="customer-chart" aria-label="Customer growth chart">
      <h3 className="customer-chart__title">{title}</h3>
      <div className="customer-chart__container">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={customerData}
            margin={{ top: 8, right: 16, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="customerColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.4} />
                <stop offset="95%" stopColor="var(--accent)" stopOpacity={0.0} />
              </linearGradient>
            </defs>
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
              tickFormatter={(value) => value.toLocaleString()}
              width={48}
            />
            <Tooltip content={<CustomerTooltip />} cursor={{ stroke: 'var(--border-color)', strokeWidth: 1 }} />
            <Area
              type="monotone"
              dataKey="customers"
              stroke="var(--accent)"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#customerColor)"
              dot={{ fill: 'var(--accent)', strokeWidth: 2, r: 4, stroke: 'var(--bg-card)' }}
              activeDot={{ r: 6, fill: 'var(--accent)', stroke: 'var(--bg-card)', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}

export default CustomerChart
