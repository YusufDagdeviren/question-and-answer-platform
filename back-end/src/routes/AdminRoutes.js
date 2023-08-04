const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/AdminController");
const { authAdminMiddleware } = require("../middleware/Auth")
router.post("/register", authAdminMiddleware, AdminController.register);

router.get("/users", authAdminMiddleware, AdminController.getUsers);

router
    .route("/user/:id")
    .delete(authAdminMiddleware, AdminController.deleteUser)
    .put(authAdminMiddleware, AdminController.updateUser)
    .get(authAdminMiddleware, AdminController.getUser);

module.exports = router;