# MeroKhabar

MeroKhabar is a modern **news portal** web application that delivers the latest news articles across various categories. Built using **React.js** for the frontend and **Node.js with Express.js** for the backend, it provides a seamless user experience for browsing and reading news articles.

---

## 📌 Features

- 📰 **Dynamic News Feed** – Fetches and displays news articles across multiple categories.
- 🔍 **Category Filtering** – Allows users to browse articles based on specific topics.
- 📝 **Detailed Article Pages** – Provides an in-depth reading experience.
- 🎨 **Responsive Design** – Fully optimized for mobile and desktop devices.
- ⚡ **Fast and Lightweight** – Uses React for efficient rendering and state management.
- 🌐 **REST API Integration** – Connects the frontend with an Express.js backend.

---

## 📂 Project Structure

```
news-portal/
├── client/             # Frontend (React.js)
│   ├── public/         # Static assets
│   ├── src/            # Source code
│   │   ├── components/  # UI Components
│   │   ├── pages/       # Page-level components
│   │   ├── App.js
│   │   ├── index.js
│   ├── package.json    # Frontend dependencies
├── server/             # Backend (Node.js + Express)
│   ├── data/          # Sample news articles
│   ├── server.js      # Express server setup
│   ├── package.json   # Backend dependencies
└── README.md           # Main project README
```

---

## 🛠️ Tech Stack

### Frontend:
- **React.js** – Component-based UI development
- **React Router** – Navigation between pages
- **CSS Modules** – Modular styling for components

### Backend:
- **Node.js + Express.js** – Handles API requests
- **JSON Data Storage** – Stores article data locally

---

## 🚀 Installation & Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/the-abhishekroy/MeroKhabar.git
   cd MeroKhabar
   ```

2. **Install Dependencies**
   ```bash
   cd client
   npm install
   cd ../server
   npm install
   ```

3. **Start the Backend Server**
   ```bash
   cd server
   node server.js
   ```

4. **Start the Frontend**
   ```bash
   cd client
   npm start
   ```

5. **Access the Application**
   Open your browser and visit: `http://localhost:3000`

---

## 📌 Future Enhancements

- 🔄 Fetch live news from an external API.
- 🔐 Implement user authentication.
- 🛢️ Integrate a database (MongoDB/PostgreSQL) for persistent storage.
- 📊 Improve UI/UX with additional features and animations.

---

## 🤝 Contributing

Contributions are welcome! If you'd like to improve this project, feel free to **fork** the repository, create a **new branch**, and submit a **pull request**.

---

## 📜 License

This project is licensed under the **MIT License**.

---

💡 *Developed by [Abhishek Roy](https://github.com/the-abhishekroy)* 🚀
