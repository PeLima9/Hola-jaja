//Importar librerías
import express from "express";
import cookieParser from "cookie-parser";
import productsRoutes from "./src/routes/products.js";
import clientsRoutes from "./src/routes/clients.js";
import employeesRoutes from "./src/routes/employees.js";
import locationsRoutes from "./src/routes/locations.js";
import reviewsRoutes from "./src/routes/reviews.js";
import evaluationsRoutes from "./src/routes/evaluations.js";
import registerEmpRoutes from "./src/routes/registerEmployees.js";
import loginRoutes from "./src/routes/login.js";

//Crear constante para la libreria
const app = express();

//Usar Middleware para .json
app.use(express.json())

//Accept Cookies
app.use(cookieParser());

//Definir la ruta
app.use("/api/products", productsRoutes);
app.use("/api/clients", clientsRoutes);
app.use("/api/employees", employeesRoutes);
app.use("/api/locations", locationsRoutes);
app.use("/api/reviews", reviewsRoutes);
app.use("/api/evaluations", evaluationsRoutes);

//Register and Login
app.use("/api/registerEmployees", registerEmpRoutes);
app.use("api/login", loginRoutes);

//Hacer la constante global
export default app;
