import {
  FiBarChart2,
  FiFileText,
  FiLayout,
  FiSettings,
  FiX,
} from 'react-icons/fi'
import './Sidebar.css'

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: FiLayout },
  { id: 'analytics', label: 'Analytics', icon: FiBarChart2 },
  { id: 'reports', label: 'Reports', icon: FiFileText },
  { id: 'settings', label: 'Settings', icon: FiSettings },
]

function Sidebar({ activeItem, onItemSelect, isOpen, onClose }) {
  return (
    <>
      <div
        className={`sidebar-overlay ${isOpen ? 'sidebar-overlay--visible' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}>
        <div className="sidebar__header">
          <div className="sidebar__brand">
            <span className="sidebar__brand-icon">BI</span>
            <span className="sidebar__brand-text">InsightHub</span>
          </div>
          <button
            type="button"
            className="sidebar__close"
            onClick={onClose}
            aria-label="Close navigation"
          >
            <FiX />
          </button>
        </div>

        <nav className="sidebar__nav" aria-label="Main navigation">
          <ul className="sidebar__list">
            {navItems.map(({ id, label, icon: Icon }) => (
              <li key={id}>
                <button
                  type="button"
                  className={`sidebar__link ${activeItem === id ? 'sidebar__link--active' : ''}`}
                  onClick={() => onItemSelect(id)}
                  aria-current={activeItem === id ? 'page' : undefined}
                >
                  <Icon className="sidebar__link-icon" aria-hidden="true" />
                  <span>{label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  )
}

export default Sidebar
