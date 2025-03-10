//Definir métodos a usar
import express from "express";
import productsController from "../controllers/productsController.js"

//Crear constante para ruta
const router = express.Router();

//Valores de la ruta
router.route("/").get(productsController.getProducts).post(productsController.insertProduct)

//
router.route("/:id").get(productsController.deleteProduct).post(productsController.updateProduct)

//Exportar ruta
export default router;