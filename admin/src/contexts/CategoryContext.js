import React, { createContext, useContext, useState, useEffect } from 'react';

export const CategoryContext = createContext();

export function useCategories() {
  return useContext(CategoryContext);
}

export function CategoryProvider({ children }) {
  const [categories, setCategories] = useState([]);

  const refreshCategories = async () => {
    try {
      const response = await fetch('http://localhost:3002/api/categories');
      if (!response.ok) throw new Error('Failed to fetch categories');
      const data = await response.json();
      // Ensure we're getting the full category data including article counts
      setCategories(data.map(category => ({
        ...category,
        articleCount: category.articleCount || 0
      })));
    } catch (error) {
      console.error('Error refreshing categories:', error);
    }
  };

  const addCategory = async (categoryData) => {
    try {
      const response = await fetch('http://localhost:3002/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(categoryData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add category');
      }

      const data = await response.json();
      setCategories(prev => [...prev, data]);
      return data;
    } catch (error) {
      console.error('Error adding category:', error);
      throw error;
    }
  };

  const deleteCategory = async (id) => {
    try {
      const response = await fetch(`http://localhost:3002/api/categories/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete category');
      }

      setCategories(prev => prev.filter(category => category.id !== id));
    } catch (error) {
      console.error('Error deleting category:', error);
      throw error;
    }
  };

  // Load categories when component mounts
  useEffect(() => {
    refreshCategories();
  }, []);

  return (
    <CategoryContext.Provider value={{ 
      categories, 
      addCategory,
      refreshCategories,
      deleteCategory,
      // ... other methods
    }}>
      {children}
    </CategoryContext.Provider>
  );
}