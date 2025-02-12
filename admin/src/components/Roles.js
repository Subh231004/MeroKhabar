import React, { useState } from 'react';
import { Shield, Edit, Trash2, Plus } from 'lucide-react';
import '../styles/Roles.css';

function Roles() {
  const [roles, setRoles] = useState([
    { id: 1, name: 'Admin', permissions: ['all'], users: 2 },
    { id: 2, name: 'Editor', permissions: ['create', 'edit', 'delete'], users: 5 },
    { id: 3, name: 'Author', permissions: ['create', 'edit'], users: 10 }
  ]);

  return (
    <div className="roles-wrapper">
      <div className="roles-header">
        <h1>Roles & Permissions</h1>
      </div>

      <div className="roles-container">
        <div className="roles-top-bar">
          <button className="add-role-btn">
            <Plus size={20} />
            Add New Role
          </button>
        </div>

        <table className="roles-table">
          <thead>
            <tr>
              <th>Role Name</th>
              <th>Permissions</th>
              <th>Total Users</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles.map(role => (
              <tr key={role.id}>
                <td>{role.name}</td>
                <td>{role.permissions.join(', ')}</td>
                <td>{role.users}</td>
                <td>
                  <div className="action-buttons">
                    <button className="action-btn edit">
                      <Edit size={16} />
                    </button>
                    <button className="action-btn delete">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Roles;