  const express = require("express");
  const cors = require("cors");
  const mongoose = require("mongoose");

  const apiRoutes = require("./routes/api");

  const app = express();

  mongoose
    .connect("mongodb+srv://user:user%40123@merokhabhar.vzedb.mongodb.net/MK", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((err) => console.log(err));

  app.use(cors());
  app.use(express.json());

  app.use("/api", apiRoutes);

  const PORT = 3001;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// const express = require("express");
// const connectDB = require('./db');
// const app = express();

// connectDB();

// app.use(express.json());

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => console.log('Server running on port ${PORT}'));

// require('dotenv').config();