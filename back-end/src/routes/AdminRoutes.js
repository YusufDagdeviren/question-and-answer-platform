const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/AdminController");
const { isAdmin } = require("../middlewares/auth");

router.post("/register", isAdmin, AdminController.register);

router.get("/users", isAdmin, AdminController.getUsers);

router
    .route("/user/:id")
    .delete(isAdmin, AdminController.deleteUser)
    .put(isAdmin, AdminController.updateUser)
    .get(isAdmin, AdminController.getUser);

module.exports = router;