import React, { useState } from 'react';
import { Flag, CheckCircle, XCircle } from 'lucide-react';
import '../styles/ReportedContent.css';

function ReportedContent() {
  const [reports, setReports] = useState([
    { id: 1, content: 'Inappropriate comment', type: 'Comment', reporter: 'John Doe', status: 'Pending', date: '2024-02-11' },
    { id: 2, content: 'Misleading article', type: 'Article', reporter: 'Jane Smith', status: 'Reviewed', date: '2024-02-11' },
  ]);

  return (
    <div className="reported-wrapper">
      <div className="reported-header">
        <h1>Reported Content</h1>
        <button className="review-all-btn">
            <CheckCircle size={20} />
            Review All
          </button>
      </div>

      <div className="reported-container">
        <div className="reported-top-bar">
          
        </div>

        <table className="reported-table">
          <thead>
            <tr>
              <th>Content</th>
              <th>Type</th>
              <th>Reporter</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map(report => (
              <tr key={report.id}>
                <td>{report.content}</td>
                <td>{report.type}</td>
                <td>{report.reporter}</td>
                <td>{report.date}</td>
                <td>
                  <span className={`status-badge ${report.status.toLowerCase()}`}>
                    {report.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="action-btn approve">
                      <CheckCircle size={16} />
                    </button>
                    <button className="action-btn delete">
                      <XCircle size={16} />
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

export default ReportedContent;