const router = require("express").Router();
const token = require("./../middleware/auth");
const authController = require("../controllers/authentication.controller");
router.post("/register", authController.register);
router.post("/login", authController.login);

router.get("/users", authController.getAllUser);

router.delete("/user/:id", authController.deleteUser);
router.get("/", token.verifyToken, authController.getToken);
module.exports = router;
