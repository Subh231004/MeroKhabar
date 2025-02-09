import React, { useState, useEffect } from 'react';
import { Edit, Trash2, UserPlus, Mail, Phone, MapPin } from 'lucide-react';
import './UserManagement.css';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [showAddUser, setShowAddUser] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'User',
    phone: '',
    location: ''
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:3002/api/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3002/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });
      const data = await response.json();
      setUsers([...users, data]);
      setShowAddUser(false);
      setNewUser({ name: '', email: '', role: 'User', phone: '', location: '' });
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await fetch(`http://localhost:3002/api/users/${id}`, {
          method: 'DELETE',
        });
        setUsers(users.filter(user => user.id !== id));
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const toggleUserStatus = async (id) => {
    try {
      const response = await fetch(`http://localhost:3002/api/users/${id}/status`, {
        method: 'PATCH',
      });
      const updatedUser = await response.json();
      setUsers(users.map(user => 
        user.id === id ? updatedUser : user
      ));
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };

  return (
    <div className="user-management">
      <div className="management-header">
        <h1>User Management</h1>
        <button 
          className="add-user-btn"
          onClick={() => setShowAddUser(true)}
        >
          <UserPlus size={20} />
          Add New User
        </button>
      </div>

      {showAddUser && (
        <div className="add-user-modal">
          <div className="modal-content">
            <h2>Add New User</h2>
            <form onSubmit={handleAddUser}>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Role</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                >
                  <option value="Admin">Admin</option>
                  <option value="Editor">Editor</option>
                  <option value="User">User</option>
                </select>
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  value={newUser.phone}
                  onChange={(e) => setNewUser({...newUser, phone: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  value={newUser.location}
                  onChange={(e) => setNewUser({...newUser, location: e.target.value})}
                />
              </div>
              <div className="modal-actions">
                <button type="submit" className="submit-btn">Add User</button>
                <button 
                  type="button" 
                  className="cancel-btn"
                  onClick={() => setShowAddUser(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="users-grid">
        {users.map(user => (
          <div key={user.id} className="user-card">
            <div className="user-header">
              <img src={user.avatar} alt={user.name} className="user-avatar" />
              <div className="user-info">
                <h3>{user.name}</h3>
                <span className={`user-role ${user.role.toLowerCase()}`}>
                  {user.role}
                </span>
              </div>
              <div className="user-actions">
                <button className="edit-btn">
                  <Edit size={16} />
                </button>
                <button 
                  className="delete-btn"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <div className="user-details">
              <div className="detail">
                <Mail size={16} />
                <span>{user.email}</span>
              </div>
              <div className="detail">
                <Phone size={16} />
                <span>{user.phone}</span>
              </div>
              <div className="detail">
                <MapPin size={16} />
                <span>{user.location}</span>
              </div>
            </div>
            <div className="user-footer">
              <span className="join-date">Joined: {user.joinDate}</span>
              <button 
                className={`status-toggle ${user.status.toLowerCase()}`}
                onClick={() => toggleUserStatus(user.id)}
              >
                {user.status}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserManagement;