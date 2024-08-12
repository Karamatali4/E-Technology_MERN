const express = require("express");


const router = express.Router();
const contactForm = require("../controllers/contact-controller");

router.get("/contact",contactForm);

router.post("/contact",contactForm);

module.exports = router;