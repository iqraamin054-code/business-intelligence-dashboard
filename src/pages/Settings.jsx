import { useState } from 'react'
import { FiInbox, FiMoon, FiSun } from 'react-icons/fi'
import { useOutletContext } from 'react-router-dom'

const themeOptions = [
  {
    value: 'light',
    labelKey: 'lightMode',
    descriptionKey: 'lightDescription',
    icon: FiSun,
  },
  {
    value: 'dark',
    labelKey: 'darkMode',
    descriptionKey: 'darkDescription',
    icon: FiMoon,
  },
]

function Settings() {
  const { theme, setTheme, toggleTheme, t, searchText = '', profile, updateProfile, showProfileForm, closeProfileForm, showToast } = useOutletContext()
  const query = searchText.trim().toLowerCase()
  const [formValues, setFormValues] = useState(profile || { name: '', email: '', role: '' })

  const filteredOptions = themeOptions.filter(({ labelKey, descriptionKey }) => {
    return (
      t(labelKey).toLowerCase().includes(query) ||
      t(descriptionKey).toLowerCase().includes(query)
    )
  })

  const handleFieldChange = (field, value) => {
    setFormValues((current) => ({ ...current, [field]: value }))
  }

  const handleProfileSubmit = (event) => {
    event.preventDefault()
    updateProfile(formValues)
    closeProfileForm()
    showToast(t('profileSaved'))
  }

  return (
    <div className="dashboard__content-inner">
      <section className="dashboard__welcome" aria-label="Settings overview">
        <h2 className="dashboard__page-title">{t('settingsTitle')}</h2>
        <p className="dashboard__page-description">
          {t('settingsDescription')}
        </p>
      </section>

      {showProfileForm && (
        <section className="settings-panel" aria-labelledby="profile-settings-title">
          <div className="settings-panel__header">
            <div>
              <h3 id="profile-settings-title" className="dashboard__section-title">{t('profileSection')}</h3>
              <p className="settings-panel__description">
                {t('profileSectionDescription')}
              </p>
            </div>
          </div>

          <form className="profile-form" onSubmit={handleProfileSubmit}>
            <label>
              <span>{t('fullName')}</span>
              <input
                type="text"
                value={formValues.name}
                onChange={(event) => handleFieldChange('name', event.target.value)}
                required
              />
            </label>

            <label>
              <span>{t('email')}</span>
              <input
                type="email"
                value={formValues.email}
                onChange={(event) => handleFieldChange('email', event.target.value)}
                required
              />
            </label>

            <label>
              <span>{t('role')}</span>
              <input
                type="text"
                value={formValues.role}
                onChange={(event) => handleFieldChange('role', event.target.value)}
                required
              />
            </label>

            <button type="submit" className="settings-panel__toggle">
              {t('saveChanges')}
            </button>
          </form>
        </section>
      )}

      <section className="settings-panel" aria-labelledby="theme-settings-title">
        <div className="settings-panel__header">
          <div>
            <h3 id="theme-settings-title" className="dashboard__section-title">{t('appearance')}</h3>
            <p className="settings-panel__description">
              {t('themeSaved')}
            </p>
          </div>

          <button
            type="button"
            className="settings-panel__toggle"
            onClick={toggleTheme}
          >
            {theme === 'light' ? <FiMoon aria-hidden="true" /> : <FiSun aria-hidden="true" />}
            <span>{theme === 'light' ? t('switchToDark') : t('switchToLight')}</span>
          </button>
        </div>

        {filteredOptions.length === 0 ? (
          <div className="dashboard__state dashboard__state--empty" style={{ marginTop: '2rem' }}>
            <FiInbox className="dashboard__state-icon" aria-label="Empty state" />
            <h4 className="dashboard__state-title">{t('noData')}</h4>
            <p className="dashboard__state-desc">{t('noSettingsResults')}</p>
          </div>
        ) : (
          <div className="settings-panel__options" role="radiogroup" aria-label="Theme mode">
            {filteredOptions.map(({ value, labelKey, descriptionKey, icon: Icon }) => (
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
                  <span className="settings-panel__option-label">{t(labelKey)}</span>
                  <span className="settings-panel__option-description">{t(descriptionKey)}</span>
                </span>
              </button>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default Settings