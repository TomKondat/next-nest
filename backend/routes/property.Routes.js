const propertyControllers = require("../controllers/propertyControllers.js");
const authControllers = require("../controllers/authControllers.js");
const userControllers = require("../controllers/userControllers.js");

const { Router } = require("express");
const router = Router();

router
  .route("/")
  .get(propertyControllers.getProperties)
  .post(authControllers.protect, authControllers.restrictByRole("agent"), propertyControllers.uploadPropertyImage, propertyControllers.addProperty, userControllers.addManagedProperty);


router.route("/:propertyId/add-saved-property")
  .patch(authControllers.protect, authControllers.restrictByRole("buyer"), userControllers.addSavedProperty);
router.route("/:propertyId/add-managed-property")
  .patch(authControllers.protect, authControllers.restrictByRole("agent"), userControllers.addManagedProperty);

router
  .route("/:id")
  .get(propertyControllers.getPropertyById)
  .patch(authControllers.protect, authControllers.restrictByRole("agent"), propertyControllers.uploadPropertyImage, propertyControllers.editPropertyById)
  .delete(authControllers.protect, authControllers.restrictByRole("agent"), propertyControllers.deletePropertyById);

module.exports = router;