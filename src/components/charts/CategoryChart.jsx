import { useSelector } from 'react-redux'
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import './CategoryChart.css'

const COLORS = [
  'var(--accent)',
  'rgb(var(--color-emerald-rgb))',
  'rgb(var(--color-violet-rgb))',
  'rgb(var(--color-amber-rgb))',
]

const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
  const RADIAN = Math.PI / 180
  const radius = outerRadius + 15
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text
      x={x}
      y={y}
      fill="var(--text-main)"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      className="category-chart__label"
    >
      {`${name} (${(percent * 100).toFixed(0)}%)`}
    </text>
  )
}

function CategoryTooltip({ active, payload }) {
  if (!active || !payload?.length) {
    return null
  }

  const data = payload[0].payload
  return (
    <div className="category-chart__tooltip">
      <p className="category-chart__tooltip-label">{data.name}</p>
      <p className="category-chart__tooltip-value">{data.value}% of Sales</p>
    </div>
  )
}

function CategoryChart() {
  const categoryData = useSelector((state) => state.dashboard.categoryData)

  return (
    <section className="category-chart" aria-label="Category distribution chart">
      <h3 className="category-chart__title">Category Distribution</h3>
      <div className="category-chart__container">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="45%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={4}
              dataKey="value"
              label={renderCustomLabel}
              labelLine={{ stroke: 'var(--border-color)', strokeWidth: 1 }}
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CategoryTooltip />} />
            <Legend
              iconType="circle"
              iconSize={8}
              verticalAlign="bottom"
              height={36}
              formatter={(value) => <span className="category-chart__legend-text">{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}

export default CategoryChart
