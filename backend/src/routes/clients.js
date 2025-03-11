//Metodos a usar
import express from "express";
import clientsController from "../controllers/clientsController.js";

//Constante para la ruta
const router = express.Router();

//Insert
router.route("/").get(clientsController.getClients).post(clientsController.insertClient);

//Delete
router.route("/:id").get(clientsController.deleteClient).post(clientsController.updateClient);

//Update
router.route("/:id").get(clientsController.updateClient).post(clientsController.updateClient);

//Exportar la ruta
export default router;