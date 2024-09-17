const userControllers = require("../controllers/userControllers");
const authControllers = require("../controllers/authControllers.js");

const { Router } = require("express");
const router = Router();

router.route("/").get(/* authControllers.restrictByRole("agent"), */ userControllers.getUsers);
router.route("/register").post(authControllers.registerUser);
router.route("/login").post(authControllers.login);
router.route("/logout").post(authControllers.logout);

router.route("/get-managed-properties")
    .get(authControllers.protect, authControllers.restrictByRole("agent"), userControllers.getManagedProperties);
router.route("/get-saved-properties")
    .get(authControllers.protect, authControllers.restrictByRole("buyer"), userControllers.getSavedProperties);

router.route("/delete-from-managed-properties/:propertyId")
    .delete(authControllers.protect, authControllers.restrictByRole("agent"), userControllers.deleteFromManagedProperties);
router.route("/delete-from-saved-properties/:propertyId")
    .delete(authControllers.protect, authControllers.restrictByRole("buyer"), userControllers.deleteFromSavedProperties);

router.route("/get-user-info")
    .get(authControllers.protect, userControllers.getUserInfo);

// router.route("/:id")
// .get(/* authControllers.restrictByRole("agent"), */ userControllers.getUserById)
// .delete(authControllers.protect, authControllers.restrictByRole("agent"), authControllers.deleteUser);

router.route("/updateUser")
    .patch(authControllers.protect, authControllers.updateUser)

//  FIX WHEN NEEDED------------>>>>>>
// router.post('/forgotPassword', authControllers.forgotPassword)
// router.post('/resetPassword/:plainResetToken', authControllers.resetPassword)
// router    

module.exports = router;