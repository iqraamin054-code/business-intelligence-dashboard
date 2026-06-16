import { FiBell, FiMenu, FiSearch, FiUser, FiSun, FiMoon } from 'react-icons/fi'
import './Header.css'

function Header({ onMenuToggle, theme, onThemeToggle }) {
  return (
    <header className="header">
      <div className="header__left">
        <button
          type="button"
          className="header__menu-btn"
          onClick={onMenuToggle}
          aria-label="Open navigation"
        >
          <FiMenu />
        </button>
        <h1 className="header__title">InsightHub</h1>
      </div>

      <div className="header__actions">
        <div className="header__search">
          <FiSearch className="header__search-icon" aria-hidden="true" />
          <input
            type="search"
            className="header__search-input"
            placeholder="Search dashboard..."
            aria-label="Search dashboard"
          />
        </div>

        {/* Theme Toggle Button */}
        <button
          type="button"
          className="header__icon-btn header__theme-toggle"
          onClick={onThemeToggle}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
        >
          {theme === 'light' ? <FiMoon /> : <FiSun />}
        </button>

        <button type="button" className="header__icon-btn" aria-label="Notifications">
          <FiBell />
        </button>

        <button type="button" className="header__profile" aria-label="User profile">
          <FiUser />
        </button>
      </div>
    </header>
  )
}

export default Header
