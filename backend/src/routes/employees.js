//Metodos a usar
import express from "express";
import employeesController from "../controllers/employeesController.js";

//Constante para la ruta
const router = express.Router();

//Insert
router.route("/").get(employeesController.getEmployees).post(employeesController.insertEmployees);

//Delete
router.route("/:id").get(employeesController.deleteEmployee).post(employeesController.updateEmployee);

//Update
router.route("/:id").get(employeesController.updateEmployee).post(employeesController.updateEmployee);

//Exportar la ruta
export default router;