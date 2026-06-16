import { FiMoon, FiSun } from 'react-icons/fi'
import { useOutletContext } from 'react-router-dom'

const themeOptions = [
  {
    value: 'light',
    label: 'Light',
    description: 'Bright workspace for daytime reporting.',
    icon: FiSun,
  },
  {
    value: 'dark',
    label: 'Dark',
    description: 'Low-light mode for focused analysis.',
    icon: FiMoon,
  },
]

function Settings() {
  const { theme, setTheme, toggleTheme } = useOutletContext()

  return (
    <div className="dashboard__content-inner">
      <section className="dashboard__welcome" aria-label="Settings overview">
        <h2 className="dashboard__page-title">Settings</h2>
        <p className="dashboard__page-description">
          Choose the display mode that fits your workspace and reporting environment.
        </p>
      </section>

      <section className="settings-panel" aria-labelledby="theme-settings-title">
        <div className="settings-panel__header">
          <div>
            <h3 id="theme-settings-title" className="dashboard__section-title">Appearance</h3>
            <p className="settings-panel__description">
              Your theme preference is saved on this device.
            </p>
          </div>

          <button
            type="button"
            className="settings-panel__toggle"
            onClick={toggleTheme}
          >
            {theme === 'light' ? <FiMoon aria-hidden="true" /> : <FiSun aria-hidden="true" />}
            <span>Switch to {theme === 'light' ? 'Dark' : 'Light'}</span>
          </button>
        </div>

        <div className="settings-panel__options" role="radiogroup" aria-label="Theme mode">
          {themeOptions.map(({ value, label, description, icon: Icon }) => (
            <button
              key={value}
              type="button"
              className={`settings-panel__option ${theme === value ? 'settings-panel__option--active' : ''}`}
              onClick={() => setTheme(value)}
              role="radio"
              aria-checked={theme === value}
            >
              <span className="settings-panel__option-icon">
                <Icon aria-hidden="true" />
              </span>
              <span>
                <span className="settings-panel__option-label">{label} Mode</span>
                <span className="settings-panel__option-description">{description}</span>
              </span>
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Settings
