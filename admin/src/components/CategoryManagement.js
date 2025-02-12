import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useCategories } from '../contexts/CategoryContext';
import '../styles/CategoryManagement.css';

function CategoryManagement() {
  const { categories, addCategory, deleteCategory, refreshCategories, updateCategory } = useCategories();
  const [newCategory, setNewCategory] = useState({ name: '', description: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    refreshCategories();
    
    // Optional: Set up polling for real-time updates
    const interval = setInterval(refreshCategories, 5000); // Poll every 5 seconds
    
    return () => clearInterval(interval);
  }, [refreshCategories]);

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (newCategory.name.trim()) {
      try {
        const categoryData = {
          name: newCategory.name.trim(),
          description: newCategory.description.trim(),
        };
        
        console.log('Sending category data:', categoryData); // Debug log
        await addCategory(categoryData);
        await refreshCategories(); // Add this line to refresh the list
        setNewCategory({ name: '', description: '' });
      } catch (error) {
        console.error('Detailed error:', error.message); // More detailed error
        alert(`Failed to add category: ${error.message}`); // Add error feedback
      }
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await deleteCategory(id);
        await refreshCategories();
      } catch (error) {
        console.error('Error deleting category:', error);
        alert('Failed to delete category: ' + error.message);
      }
    }
  };

  // Add loading state
  if (!categories || categories.length === 0) {
    return (
      <div className="category-management">
        <div className="management-header">
          <h1>Category Management</h1>
          <form className="add-category" onSubmit={handleAddCategory}>
            <input
              type="text"
              value={newCategory.name}
              onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
              placeholder="New category name"
              required
            />
            <input
              type="text"
              placeholder="Description"
              value={newCategory.description}
              onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
            />
            <button type="submit" className="add-btn">
              <Plus size={20} />
              Add Category
            </button>
          </form>
        </div>
        <div className="categories-grid">
          <p>No categories found. Add your first category above.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="category-management">
      <div className="management-header">
        <h1>Category Management</h1>
      </div>

      <div className="management-content">
        <div className="management-actions">
          <form onSubmit={handleAddCategory} className="add-form">
            <input
              type="text"
              placeholder="Category Name"
              value={newCategory.name}
              onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Description"
              value={newCategory.description}
              onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
            />
            <button type="submit" className="add-btn">
              <Plus size={20} />
              Add Category
            </button>
          </form>
        </div>

        <div className="table-container">
          <table className="management-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Articles</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id}>
                  <td>{category.name}</td>
                  <td>{category.description}</td>
                  <td className="article-count">{category.articleCount}</td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="edit-btn"
                        onClick={() => setEditingId(category.id)}
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        className="delete-btn"
                        onClick={() => handleDelete(category.id)}
                      >
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
    </div>
  );
}

export default CategoryManagement;