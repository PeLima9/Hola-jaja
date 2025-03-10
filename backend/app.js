//Importar librerías
import express from "express";
import productsRoutes from "./src/routes/products.js";

//Crear constante para la libreria
const app = express();

//Usar Middleware para .json
app.use(express.json())

//Definir la ruta
app.use("/api/products", productsRoutes);

//Hacer la constante global
export default app;
