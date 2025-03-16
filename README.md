# 📰 Mero Khabar

Mero Khabar is a news website that allows users to read the latest articles on various topics. It features an **Admin Dashboard** where authorized users can **create, edit, and delete articles**. The application is built using **React.js** for the frontend and **Node.js/Express.js** for the backend, with JSON files used for data storage instead of a database.

## ✨ Features

- 🗞 **News Listing**: Browse news articles on different topics.
- 🛠 **Admin Dashboard**: Manage articles and categories.
- 💾 **Local Storage**: News articles are stored in JSON files.
- 🎨 **User-Friendly UI**: Simple and interactive design for easy navigation.

## 🏗 Tech Stack

### Frontend:
- ⚛️ React.js
- 📌 Context API
- 🎨 CSS (for styling)

### Backend:
- 🟢 Node.js
- 🚀 Express.js
- 📂 File System (JSON for storage)

## 📂 File Structure

```
|   README.md
|
+---admin
|   |   package.json
|   |
|   +---public
|   |       index.html
|   |       logo.png
|   |
|   \---src
|       |   App.js
|       |   index.js
|       |
|       +---components
|       |       AddArticle.js
|       |       Dashboard.js
|       |       Sidebar.js
|       |       UserManagement.js
|       |
|       +---contexts
|       |       CategoryContext.js
|       |
|       \---services
|               .js
|
+---client
|   |   package.json
|   |
|   +---public
|   |       index.html
|   |       merokhabar.png
|   |
|   \---src
|       |   App.js
|       |   index.js
|       |
|       +---components
|       |       Navbar.js
|       |       NewsCard.js
|       |
|       +---pages
|       |       Home.js
|       |       Login.js
|       |
|       \---services
|               api.js
|
\---server
    |   index.js
    |   package.json
    |   server.js
    |
    +---data
    |       articles.json
    |       categories.json
    |       users.json
    |
    +---routes
    |       api.js  (New file)
    |       articles.js
    |       categories.js
    |       users.js
    |
    \---models  (New folder for MongoDB schemas)
            Article.js

```

## 🚀 Installation & Setup

### Prerequisites:
Make sure you have **Node.js** and **npm** installed.

### Steps to Run:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/the-abhishekroy/MeroKhabar.git
   cd MeroKhabar
   ```

2. **Install Dependencies:**
   ```bash
   cd admin && npm install
   cd ../client && npm install
   cd ../server && npm install
   ```

3. **Run the Server:**
   ```bash
   cd ../server
   npm start
   ```

4. **Run the Admin Panel:**
   ```bash
   cd ../admin
   npm start
   ```

5. **Run the Client:**
   ```bash
   cd ../client
   npm start
   ```

The admin panel will be available at `http://localhost:3001` 🚀, the frontend at `http://localhost:3000` 🌍, and the backend at `http://localhost:3002` ⚡.

## 🤝 Contributing

Want to contribute? Follow these steps:
- Fork the repository 🍴.
- Create a new branch (`git checkout -b feature-branch`) 🌿.
- Commit your changes (`git commit -m "Added new feature"`) ✅.
- Push to the branch (`git push origin feature-branch`) 🚀.
- Open a pull request 🔥.

## 📜 License

This project is open-source and available under the **MIT License**.

---

👨‍💻 **Author:** 
- **Author**: Abhishek Roy  
- **GitHub**: [the-abhishekroy](https://github.com/the-abhishekroy)  
- **Email**: [the.abhishekkroy@gmail.com](mailto:the.abhishekkroy@gmail.com)

---
Feel free to open an issue or contact me for any suggestions or improvements!



