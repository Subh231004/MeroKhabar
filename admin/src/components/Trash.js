import React, { useState } from 'react';
import { RefreshCw, Trash2 } from 'lucide-react';
import '../styles/Trash.css';

function Trash() {
  const [trashedItems, setTrashedItems] = useState([
    { id: 1, title: 'News Article 1', type: 'Article', deletedBy: 'Admin', date: '2024-02-11' },
    { id: 2, title: 'Comment on Article', type: 'Comment', deletedBy: 'Moderator', date: '2024-02-11' }
  ]);

  return (
    <div className="trash-wrapper">
      <div className="trash-header">
        <h1>Trash</h1>
        <button className="clear-trash-btn">
            <Trash2 size={20} />
            Clear All Trash
          </button>
      </div>

      <div className="trash-container">
        <div className="trash-top-bar">
        </div>

        <table className="trash-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Type</th>
              <th>Deleted By</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {trashedItems.map(item => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>{item.type}</td>
                <td>{item.deletedBy}</td>
                <td>{item.date}</td>
                <td>
                  <div className="action-buttons">
                    <button className="action-btn restore">
                      <RefreshCw size={16} />
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

export default Trash;