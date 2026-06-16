import './KpiCard.css'

function KpiCard({ title, value, trend, trendDirection = 'up', icon: Icon }) {
  return (
    <article className="kpi-card">
      <div className="kpi-card__header">
        <span className="kpi-card__title">{title}</span>
        <span className="kpi-card__icon" aria-hidden="true">
          <Icon />
        </span>
      </div>
      <p className="kpi-card__value">{value}</p>
      <p className={`kpi-card__trend kpi-card__trend--${trendDirection}`}>
        {trend}
      </p>
    </article>
  )
}

export default KpiCard
