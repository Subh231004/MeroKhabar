import React, { useState } from 'react';
import { Save, Bell, Lock, Globe, Palette } from 'lucide-react';
import '../styles/Settings.css';

function Settings() {
  const [settings, setSettings] = useState({
    notifications: {
      emailAlerts: true,
      pushNotifications: false,
      weeklyDigest: true
    },
    appearance: {
      theme: 'light',
      fontSize: 'medium',
      compactMode: false
    },
    privacy: {
      publicProfile: true,
      showEmail: false,
      activityStatus: true
    },
    language: 'English',
    timezone: 'UTC+00:00'
  });

  const handleNotificationChange = (key) => {
    setSettings({
      ...settings,
      notifications: {
        ...settings.notifications,
        [key]: !settings.notifications[key]
      }
    });
  };

  const handleAppearanceChange = (key, value) => {
    setSettings({
      ...settings,
      appearance: {
        ...settings.appearance,
        [key]: value
      }
    });
  };

  const handlePrivacyChange = (key) => {
    setSettings({
      ...settings,
      privacy: {
        ...settings.privacy,
        [key]: !settings.privacy[key]
      }
    });
  };

  const handleSave = () => {
    // Save settings to backend
    console.log('Settings saved:', settings);
  };

  return (
    <div className="settings-container">
      <div className="settings-header">
        <h1>Settings</h1>
        <button className="save-btn" onClick={handleSave}>
          <Save size={20} />
          Save Changes
        </button>
      </div>

      <div className="settings-grid">
        {/* Notifications Section */}
        <div className="settings-card">
          <div className="card-header">
            <Bell size={20} />
            <h2>Notifications</h2>
          </div>
          <div className="settings-options">
            <label className="toggle-option">
              <span>Email Alerts</span>
              <input
                type="checkbox"
                checked={settings.notifications.emailAlerts}
                onChange={() => handleNotificationChange('emailAlerts')}
              />
              <span className="toggle-slider"></span>
            </label>
            <label className="toggle-option">
              <span>Push Notifications</span>
              <input
                type="checkbox"
                checked={settings.notifications.pushNotifications}
                onChange={() => handleNotificationChange('pushNotifications')}
              />
              <span className="toggle-slider"></span>
            </label>
            <label className="toggle-option">
              <span>Weekly Digest</span>
              <input
                type="checkbox"
                checked={settings.notifications.weeklyDigest}
                onChange={() => handleNotificationChange('weeklyDigest')}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>

        {/* Appearance Section */}
        <div className="settings-card">
          <div className="card-header">
            <Palette size={20} />
            <h2>Appearance</h2>
          </div>
          <div className="settings-options">
            <div className="select-option">
              <span>Theme</span>
              <select
                value={settings.appearance.theme}
                onChange={(e) => handleAppearanceChange('theme', e.target.value)}
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System</option>
              </select>
            </div>
            <div className="select-option">
              <span>Font Size</span>
              <select
                value={settings.appearance.fontSize}
                onChange={(e) => handleAppearanceChange('fontSize', e.target.value)}
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
            <label className="toggle-option">
              <span>Compact Mode</span>
              <input
                type="checkbox"
                checked={settings.appearance.compactMode}
                onChange={() => handleAppearanceChange('compactMode', !settings.appearance.compactMode)}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>

        {/* Privacy Section */}
        <div className="settings-card">
          <div className="card-header">
            <Lock size={20} />
            <h2>Privacy</h2>
          </div>
          <div className="settings-options">
            <label className="toggle-option">
              <span>Public Profile</span>
              <input
                type="checkbox"
                checked={settings.privacy.publicProfile}
                onChange={() => handlePrivacyChange('publicProfile')}
              />
              <span className="toggle-slider"></span>
            </label>
            <label className="toggle-option">
              <span>Show Email</span>
              <input
                type="checkbox"
                checked={settings.privacy.showEmail}
                onChange={() => handlePrivacyChange('showEmail')}
              />
              <span className="toggle-slider"></span>
            </label>
            <label className="toggle-option">
              <span>Activity Status</span>
              <input
                type="checkbox"
                checked={settings.privacy.activityStatus}
                onChange={() => handlePrivacyChange('activityStatus')}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>

        {/* Regional Section */}
        <div className="settings-card">
          <div className="card-header">
            <Globe size={20} />
            <h2>Regional</h2>
          </div>
          <div className="settings-options">
            <div className="select-option">
              <span>Language</span>
              <select
                value={settings.language}
                onChange={(e) => setSettings({...settings, language: e.target.value})}
              >
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="German">German</option>
              </select>
            </div>
            <div className="select-option">
              <span>Timezone</span>
              <select
                value={settings.timezone}
                onChange={(e) => setSettings({...settings, timezone: e.target.value})}
              >
                <option value="UTC+00:00">UTC+00:00</option>
                <option value="UTC+01:00">UTC+01:00</option>
                <option value="UTC+02:00">UTC+02:00</option>
                <option value="UTC+03:00">UTC+03:00</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings; 