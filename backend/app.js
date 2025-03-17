//Importar librerías
import express from "express";
import productsRoutes from "./src/routes/products.js";
import clientsRoutes from "./src/routes/clients.js";
import employeesRoutes from "./src/routes/employees.js";
import locationsRoutes from "./src/routes/locations.js";
import reviewsRoutes from "./src/routes/reviews.js"

//Crear constante para la libreria
const app = express();

//Usar Middleware para .json
app.use(express.json())

//Definir la ruta
app.use("/api/products", productsRoutes);
app.use("/api/clients", clientsRoutes);
app.use("/api/employees", employeesRoutes);
app.use("/api/locations", locationsRoutes);
app.use("/api/reviews", reviewsRoutes)

//Hacer la constante global
export default app;
