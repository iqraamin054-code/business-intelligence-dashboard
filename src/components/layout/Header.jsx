import { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import {
  FiBell,
  FiChevronDown,
  FiGlobe,
  FiLogOut,
  FiMenu,
  FiMoon,
  FiSearch,
  FiSettings,
  FiSun,
  FiUser,
  FiHelpCircle,
} from 'react-icons/fi'
import './Header.css'

const searchPlaceholderMap = {
  '/': 'searchInsights',
  '/analytics': 'searchAnalytics',
  '/reports': 'searchCustomers',
  '/settings': 'searchSettings',
}

function Header({
  onMenuToggle,
  theme,
  onThemeToggle,
  language,
  onLanguageChange,
  searchValue,
  onSearchChange,
  t,
  loading,
  error,
}) {
  const [openMenu, setOpenMenu] = useState(null)
  const headerRef = useRef(null)
  const location = useLocation()

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!headerRef.current?.contains(event.target)) {
        setOpenMenu(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const toggleMenu = (menuName) => {
    setOpenMenu((currentMenu) => (currentMenu === menuName ? null : menuName))
  }

  const placeholderKey = searchPlaceholderMap[location.pathname]
  const showSearch = !!placeholderKey && !loading && !error

  return (
    <header className="header" ref={headerRef}>
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

      {showSearch && (
        <div className="header__search">
          <FiSearch className="header__search-icon" aria-hidden="true" />
          <input
            type="search"
            className="header__search-input"
            placeholder={t(placeholderKey)}
            aria-label={t(placeholderKey)}
            value={searchValue}
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </div>
      )}

      <div className="header__actions">

        <div className="header__menu-wrap">
          <button
            type="button"
            className="header__language"
            onClick={() => toggleMenu('language')}
            aria-expanded={openMenu === 'language'}
          >
            <FiGlobe aria-hidden="true" />
            <span>{language === 'en' ? 'EN' : 'UR'}</span>
            <FiChevronDown aria-hidden="true" />
          </button>
          {openMenu === 'language' && (
            <div className="header__dropdown header__dropdown--compact">
              <button type="button" onClick={() => onLanguageChange('en')}>English</button>
              <button type="button" onClick={() => onLanguageChange('ur')}>اردو</button>
            </div>
          )}
        </div>

        <button
          type="button"
          className="header__icon-btn header__theme-toggle"
          onClick={onThemeToggle}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
        >
          {theme === 'light' ? <FiMoon /> : <FiSun />}
        </button>

        <div className="header__menu-wrap">
          <button
            type="button"
            className="header__icon-btn"
            onClick={() => toggleMenu('notifications')}
            aria-label={t('notifications')}
            aria-expanded={openMenu === 'notifications'}
          >
            <FiBell />
            <span className="header__notification-dot" />
          </button>
          {openMenu === 'notifications' && (
            <div className="header__dropdown">
              <h3>{t('notifications')}</h3>
              <p>{t('revenueIncreased')}</p>
              <p>{t('newCustomersJoined')}</p>
              <p>{t('monthlySalesGenerated')}</p>
              <p>{t('systemSyncCompleted')}</p>
            </div>
          )}
        </div>

        <div className="header__menu-wrap">
          <button
            type="button"
            className="header__profile"
            onClick={() => toggleMenu('profile')}
            aria-label="User profile"
            aria-expanded={openMenu === 'profile'}
          >
            <FiUser />
          </button>
          {openMenu === 'profile' && (
            <div className="header__dropdown header__profile-menu">
              <strong>{t('adminUser')}</strong>
              <span>{t('biAnalyst')}</span>
              <NavLink to="/settings" onClick={() => setOpenMenu(null)}>
                <FiUser aria-hidden="true" />
                {t('profile')}
              </NavLink>
              <NavLink to="/settings" onClick={() => setOpenMenu(null)}>
                <FiSettings aria-hidden="true" />
                {t('settingsTitle')}
              </NavLink>
              <NavLink to="/settings" onClick={() => setOpenMenu(null)}>
                <FiHelpCircle aria-hidden="true" />
                {t('helpCenter')}
              </NavLink>
              <button type="button">
                <FiLogOut aria-hidden="true" />
                {t('logout')}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
