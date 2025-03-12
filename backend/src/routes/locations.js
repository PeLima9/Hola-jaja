import express from "express";
import locationsController from "../controllers/locationsController.js";

//Constante para la ruta
const router = express.Router();

//Insert
router.route("/").get(locationsController.getLocations).post(locationsController.insertLocations);

//Delete
router.route("/:id").get(locationsController.deleteLocation).post(locationsController.updateLocation);

//Update
router.route("/:id").get(locationsController.updateLocation).post(locationsController.updateLocation);

//Exportar
export default router;