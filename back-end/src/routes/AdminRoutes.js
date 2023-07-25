const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/AdminController");

router.post("/register", AdminController.register);

router.get("/users", AdminController.getUsers);

router
    .route("/user/:id")
    .delete(AdminController.deleteUser)
    .put(AdminController.updateUser)
    .get(AdminController.getUser);

module.exports = router;