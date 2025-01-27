const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Create data directory if it doesn't exist
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

// Initial data
const initialData = {
    news: [
        {
            id: "1",
            title: "Welcome to Mero Khabhar",
            content: "This is your first news article. You can add more through the admin panel.",
            category: "General",
            image: "https://picsum.photos/800/400",
            author: "Admin",
            publishDate: new Date().toISOString()
        }
    ],
    users: [
        {
            id: "1",
            name: "Admin User",
            email: "admin@example.com",
            password: "admin123",
            role: "admin"
        }
    ]
};

// Save initial data if file doesn't exist
const DATA_FILE = path.join(__dirname, 'data', 'news.json');
if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(initialData, null, 2));
}

// Routes
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Mero Khabhar API' });
});

app.get('/api/news', (req, res) => {
    const data = JSON.parse(fs.readFileSync(DATA_FILE));
    res.json(data.news);
});

app.post('/api/news', (req, res) => {
    const data = JSON.parse(fs.readFileSync(DATA_FILE));
    const newNews = {
        id: Date.now().toString(),
        ...req.body,
        publishDate: new Date().toISOString()
    };
    data.news.unshift(newNews);
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    res.json(newNews);
});

app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    const data = JSON.parse(fs.readFileSync(DATA_FILE));
    const user = data.users.find(u => u.email === email && u.password === password);
    
    if (user) {
        res.json({
            token: 'dummy-token',
            user: {
                id: user.id,
                name: user.name,
                role: user.role
            }
        });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));