import {
  FiBarChart2,
  FiFileText,
  FiLayout,
  FiSettings,
  FiX,
} from 'react-icons/fi'
import { NavLink } from 'react-router-dom'
import './Sidebar.css'

const navItems = [
  { path: '/', label: 'Dashboard', icon: FiLayout },
  { path: '/analytics', label: 'Analytics', icon: FiBarChart2 },
  { path: '/reports', label: 'Reports', icon: FiFileText },
  { path: '/settings', label: 'Settings', icon: FiSettings },
]

function Sidebar({ isOpen, onClose, onNavigate }) {
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
            {navItems.map(({ path, label, icon: Icon }) => (
              <li key={path}>
                <NavLink
                  to={path}
                  end={path === '/'}
                  className={({ isActive }) =>
                    `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`
                  }
                  onClick={onNavigate}
                >
                  <Icon className="sidebar__link-icon" aria-hidden="true" />
                  <span>{label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  )
}

export default Sidebar
