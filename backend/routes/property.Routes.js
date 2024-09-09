
const propertyControllers = require("../controllers/propertyControllers.js");
const authControllers = require("../controllers/authControllers.js");
const { Router } = require("express");
const router = Router();

router
  .route("/")
  .get(propertyControllers.getProperties)
  .post(authControllers.protect, authControllers.restrictByRole("agent"), propertyControllers.addProperty);

router
  .route("/:id")
  .get(propertyControllers.getPropertyById)
  .patch(authControllers.protect, authControllers.restrictByRole("agent"), propertyControllers.editPropertyById)
  .delete(authControllers.protect, authControllers.restrictByRole("agent"), propertyControllers.deletePropertyById);

module.exports = router;