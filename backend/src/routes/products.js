//Definir métodos a usar
import express from "express";
import productsController from "../controllers/productsController.js"

//Crear constante para ruta
const router = express.Router();

//Insert
router.route("/").get(productsController.getProducts).post(productsController.insertProduct)

//Delete
router.route("/:id").get(productsController.deleteProduct).post(productsController.updateProduct)

//Update
router.route("/:id").get(productsController.updateProduct).post(productsController.updateProduct)

//Exportar ruta
export default router;