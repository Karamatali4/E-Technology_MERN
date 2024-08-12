const express = require("express");
const {getAllUsers,getAllContact, deleteUsersById, updateUsersById,deleteContactsById, usersgetById }= require("../controllers/admin-controller");
const authMiddleware = require("../middlewares/auth-Middleware");
const adminmiddleware = require("../middlewares/admin-middleware");

const router = express.Router();


// *____________________________________________________
    // users  route
// *____________________________________________________
// route for users
router.route("/users").get(authMiddleware,adminmiddleware,getAllUsers);
usersgetById

// single user  route
router.route("/users/:id").get(authMiddleware,adminmiddleware,usersgetById);

//user Update route
router.route("/users/update/:id").patch(authMiddleware,adminmiddleware,updateUsersById);

//user Delete route
router.route("/users/delete/:id").delete(authMiddleware,adminmiddleware,deleteUsersById);





// *____________________________________________________
    // contact  route
// *____________________________________________________


//route for contact
router.route("/contact").get(authMiddleware,adminmiddleware,getAllContact);

//contact Delete route
router.route("/contact/delete/:id").delete(authMiddleware,adminmiddleware,deleteContactsById);



// *____________________________________________________
    // services  route
// *____________________________________________________
//route for services
// router.route("/service").get(authMiddleware,adminmiddleware,getAllservice);






module.exports = router;