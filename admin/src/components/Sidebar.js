import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Tags, 
  BarChart2, 
  Users, 
  MessageSquare,
  Settings, 
  Bell,
  Flag,
  Trash,
  Shield
} from 'lucide-react';
import '../styles/Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Mero Khabar </h2>
      </div>
      
      <nav className="sidebar-nav">
        <div className="nav-section">
          <h3>Main</h3>
          <NavLink to="/" className="nav-item">
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </NavLink>
        </div>

        <div className="nav-section">
          <h3>Content</h3>
          <NavLink to="/articles" className="nav-item">
            <FileText size={20} />
            <span>Articles</span>
          </NavLink>
          <NavLink to="/categories" className="nav-item">
            <Tags size={20} />
            <span>Categories</span>
          </NavLink>
        </div>

        <div className="nav-section">
          <h3>User Management</h3>
          <NavLink to="/users" className="nav-item">
            <Users size={20} />
            <span>Users</span>
          </NavLink>
          <NavLink to="/comments" className="nav-item">
            <MessageSquare size={20} />
            <span>Comments</span>
          </NavLink>
        </div>

        <div className="nav-section">
          <h3>Monitoring</h3>
          <NavLink to="/analytics" className="nav-item">
            <BarChart2 size={20} />
            <span>Analytics</span>
          </NavLink>
          <NavLink to="/notifications" className="nav-item">
            <Bell size={20} />
            <span>Notifications</span>
          </NavLink>
        </div>

        <div className="nav-section">
          <h3>Moderation</h3>
          <NavLink to="/reported-content" className="nav-item">
            <Flag size={20} />
            <span>Reported Content</span>
          </NavLink>
          <NavLink to="/trash" className="nav-item">
            <Trash size={20} />
            <span>Trash</span>
          </NavLink>
        </div>

        <div className="nav-section">
          <h3>System</h3>
          <NavLink to="/settings" className="nav-item">
            <Settings size={20} />
            <span>Settings</span>
          </NavLink>
          <NavLink to="/roles" className="nav-item">
            <Shield size={20} />
            <span>Roles & Permissions</span>
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;

