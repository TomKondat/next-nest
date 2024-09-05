
const propertyControllers = require("../controllers/propertyControllers.js");

const { Router } = require("express");
const router = Router();

router
  .route("/")
  .get(propertyControllers.getProperties)
  .post(propertyControllers.addProperty);

router
  .route("/:id")
  .get(propertyControllers.getPropertyById)
  .patch(/* authControllers.protect,  */propertyControllers.editPropertyById)
  .delete(/* authControllers.protect,  */propertyControllers.deletePropertyById);

module.exports = router;