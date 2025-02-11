import React, { useState } from 'react';
import { Edit, Trash2, Plus, FileText } from 'lucide-react';
import { useCategories } from '../contexts/CategoryContext';
import './CategoryManagement.css';

function CategoryManagement() {
  const { categories, addCategory, deleteCategory, refreshCategories, updateCategory } = useCategories();
  const [newCategory, setNewCategory] = useState('');
  const [editingId, setEditingId] = useState(null);

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (newCategory.trim()) {
      try {
        const categoryData = {
          name: newCategory.trim(),
          articleCount: 0
        };
        
        console.log('Sending category data:', categoryData); // Debug log
        await addCategory(categoryData);
        await refreshCategories(); // Add this line to refresh the list
        setNewCategory('');
      } catch (error) {
        console.error('Detailed error:', error.message); // More detailed error
        alert(`Failed to add category: ${error.message}`); // Add error feedback
      }
    }
  };

  const handleDeleteCategory = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await deleteCategory(id);
        // No need to call refreshCategories here since we update state in context
      } catch (error) {
        console.error('Error deleting category:', error);
        alert('Failed to delete category: ' + error.message);
      }
    }
  };

  const handleEditCategory = async (id, newName) => {
    try {
      await updateCategory(id, newName);
      setEditingId(null);
    } catch (error) {
      console.error('Error updating category:', error);
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
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="New category name"
              required
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
        <form className="add-category" onSubmit={handleAddCategory}>
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="New category name"
            required
          />
          <button type="submit" className="add-btn">
            <Plus size={20} />
            Add Category
          </button>
        </form>
      </div>

      <div className="categories-grid">
        {categories.map((category) => (
          <div key={category.id} className="category-card">
            <div className="category-header">
              {editingId === category.id ? (
                <input
                  type="text"
                  value={category.name}
                  onChange={(e) => handleEditCategory(category.id, e.target.value)}
                  onBlur={() => setEditingId(null)}
                  autoFocus
                />
              ) : (
                <h3>{category.name}</h3>
              )}
              <div className="category-actions">
                <button onClick={() => setEditingId(category.id)}>
                  <Edit size={16} />
                </button>
                <button onClick={() => handleDeleteCategory(category.id)}>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <div className="category-stats">
              <FileText size={16} />
              <span>{category.articleCount || 0} Articles</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryManagement;