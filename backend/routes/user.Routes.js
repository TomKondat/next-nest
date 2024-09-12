const userControllers = require("../controllers/userControllers");
const authControllers = require("../controllers/authControllers.js");

const { Router } = require("express");
const router = Router();


router.route("/").get(userControllers.getUsers);
router.route("/:id").get(userControllers.getUserById);
router.route("/register").post(authControllers.registerUser);

router.route("/login").post(authControllers.login);
router.route("/logout").post(authControllers.logout);

router.route("/update/:id")
    .patch(authControllers.protect, authControllers.restrictByRole("agent"), authControllers.updateUser);
router.route("/delete/:id")
    .delete(authControllers.protect, authControllers.restrictByRole("agent"), authControllers.deleteUser);

//  FIX WHEN NEEDED------------>>>>>>
// router.post('/forgotPassword', authControllers.forgotPassword)
// router.post('/resetPassword/:plainResetToken', authControllers.resetPassword)
// router    

module.exports = router;