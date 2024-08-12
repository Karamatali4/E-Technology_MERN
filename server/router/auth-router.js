const express = require("express");
const { home, register,login } = require("../controllers/auth-controller");

const router = express.Router();
const authControllers = require("../controllers/auth-controller");
const {signupSchema} = require("../validator/auth-validator");

const validate = require("../middlewares/validate_middleware");
const {signinSchema} = require("../validator/auth-validator");
const authMiddleware = require("../middlewares/auth-Middleware");



router.get("/",home);
router.get("/register",register);
router.post("/register", validate(signupSchema), register);

router.get("/login", login);
router.post("/login", validate(signinSchema),login);


router.route("/user").get(authMiddleware, authControllers.user);
module.exports = router;