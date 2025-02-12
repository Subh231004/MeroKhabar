import React, { useState } from 'react';
import { MessageCircle, CheckCircle, XCircle } from 'lucide-react';
import '../styles/Comments.css';

function Comments() {
  const [comments, setComments] = useState([
    { 
      id: 1, 
      content: 'Great article!', 
      author: 'John Doe', 
      article: 'Top 10 News', 
      date: '2024-02-11',
      status: 'Pending' 
    },
    { 
      id: 2, 
      content: 'Very informative content', 
      author: 'Jane Smith', 
      article: 'Breaking News', 
      date: '2024-02-11',
      status: 'Approved' 
    }
  ]);

  return (
    <div className="comments-wrapper">
      <div className="comments-header">
        <h1>Comments Management</h1>
      </div>

      <div className="comments-container">
        <div className="comments-top-bar">
          <button className="approve-all-btn">
            <CheckCircle size={20} />
            Approve All Pending
          </button>
        </div>

        <table className="comments-table">
          <thead>
            <tr>
              <th>Comment</th>
              <th>Author</th>
              <th>Article</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {comments.map(comment => (
              <tr key={comment.id}>
                <td>{comment.content}</td>
                <td>{comment.author}</td>
                <td>{comment.article}</td>
                <td>{comment.date}</td>
                <td>
                  <span className={`status-badge ${comment.status.toLowerCase()}`}>
                    {comment.status}
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

export default Comments;