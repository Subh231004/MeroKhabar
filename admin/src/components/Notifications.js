import React, { useState } from 'react';
import { Bell, CheckCircle, Trash2 } from 'lucide-react';
import '../styles/Notifications.css';

function Notifications() {
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New article published', type: 'info', date: '2024-02-11', read: false },
    { id: 2, message: 'Comment requires approval', type: 'warning', date: '2024-02-11', read: true }
  ]);

  return (
    <div className="notifications-wrapper">
      <div className="notifications-header">
        <h1>Notifications</h1>
      </div>

      <div className="notifications-container">
        <div className="notifications-top-bar">
          <button className="clear-all-btn">
            <Trash2 size={20} />
            Clear All
          </button>
        </div>

        <div className="notifications-list">
          {notifications.map(notification => (
            <div key={notification.id} 
                 className={`notification-item ${notification.read ? 'read' : ''}`}>
              <div className={`notification-icon ${notification.type}`}>
                <Bell size={20} />
              </div>
              <div className="notification-content">
                <p>{notification.message}</p>
                <span className="notification-date">{notification.date}</span>
              </div>
              {!notification.read && (
                <button className="mark-read-btn">
                  <CheckCircle size={16} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Notifications;