const express = require("express");

const router = express.Router();

const articleRoutes = require("./articles");
const categoryRoutes = require("./categories");
const userRoutes = require("./users");

router.use("/articles", articleRoutes);
router.use("/categories", categoryRoutes);
router.use("/users", userRoutes);

module.exports = router;
