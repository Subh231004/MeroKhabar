const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/users.json');

// Get all users
router.get('/', async (req, res) => {
  try {
    const data = await fs.readFile(usersFilePath, 'utf8');
    const { users } = JSON.parse(data);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error reading users data' });
  }
});

// Add new user
router.post('/', async (req, res) => {
  try {
    const data = await fs.readFile(usersFilePath, 'utf8');
    const { users } = JSON.parse(data);
    
    const newUser = {
      id: users.length ? Math.max(...users.map(u => u.id)) + 1 : 1,
      ...req.body,
      status: 'Active',
      joinDate: new Date().toISOString().split('T')[0],
      avatar: `https://ui-avatars.com/api/?name=${req.body.name.replace(' ', '+')}`
    };

    users.push(newUser);
    await fs.writeFile(usersFilePath, JSON.stringify({ users }, null, 2));
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Error adding new user' });
  }
});

// Delete user
router.delete('/:id', async (req, res) => {
  try {
    const data = await fs.readFile(usersFilePath, 'utf8');
    let { users } = JSON.parse(data);
    
    users = users.filter(user => user.id !== parseInt(req.params.id));
    await fs.writeFile(usersFilePath, JSON.stringify({ users }, null, 2));
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting user' });
  }
});

// Update user status
router.patch('/:id/status', async (req, res) => {
  try {
    const data = await fs.readFile(usersFilePath, 'utf8');
    let { users } = JSON.parse(data);
    
    users = users.map(user => 
      user.id === parseInt(req.params.id)
        ? { ...user, status: user.status === 'Active' ? 'Inactive' : 'Active' }
        : user
    );

    await fs.writeFile(usersFilePath, JSON.stringify({ users }, null, 2));
    res.json(users.find(user => user.id === parseInt(req.params.id)));
  } catch (error) {
    res.status(500).json({ error: 'Error updating user status' });
  }
});

module.exports = router;