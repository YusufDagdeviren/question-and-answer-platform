const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/AdminController");
const { isAdmin } = require("../middlewares/auth");
const { doubleCsrfProtection } = require("../csrf-settings/csrf")

router.post("/register", isAdmin, doubleCsrfProtection, AdminController.register);

router.get("/users", isAdmin, doubleCsrfProtection, AdminController.getUsers);

router
    .route("/user/:id")
    .delete(isAdmin, doubleCsrfProtection, AdminController.deleteUser)
    .put(isAdmin, doubleCsrfProtection, AdminController.updateUser)
    .get(isAdmin, doubleCsrfProtection, AdminController.getUser);

module.exports = router;