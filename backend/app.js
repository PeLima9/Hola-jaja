//Importar librerías
import express from "express";
import cookieParser from "cookie-parser";

//Routes
import productsRoutes from "./src/routes/products.js";
import clientsRoutes from "./src/routes/clients.js";
import employeesRoutes from "./src/routes/employees.js";
import locationsRoutes from "./src/routes/locations.js";
import reviewsRoutes from "./src/routes/reviews.js";
import evaluationsRoutes from "./src/routes/evaluations.js";
import registerEmpRoutes from "./src/routes/registerEmployees.js";
import loginRoutes from "./src/routes/login.js";
import logoutRoutes from "./src/routes/logout.js";
import registerCliRoutes from "./src/routes/registerClients.js";
import passRecoveryRoutes from "./src/routes/passwordRecovery.js";
import blogRoutes from "./src/routes/blog.js";
import swaggerUi from "swagger-ui-express";
import salesRoutes from "./src/routes/sales.js";

import fs from "fs";
import path from "path";

//Middlewares
import {validateAuthToken} from "./src/middlewares/validateAuthToken.js";

//Crear constante para la libreria
const app = express();

//Usar Middleware para .json
app.use(express.json())

//Accept Cookies
app.use(cookieParser());

//Swagger
const swaggerDocument = JSON.parse(fs.readFileSync(
    path.resolve("./CocaColaMERN.json"), "utf8")
);

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//Definir la ruta
app.use("/api/products", productsRoutes);
app.use("/api/clients", clientsRoutes);
app.use("/api/employees", validateAuthToken(["employee", "Admin"]), employeesRoutes);
app.use("/api/locations", locationsRoutes);
app.use("/api/reviews", reviewsRoutes);
app.use("/api/evaluations", evaluationsRoutes);

//Employees Register
app.use("/api/registerEmployees", registerEmpRoutes);

//Login
app.use("/api/login", loginRoutes);

//Logout
app.use("/api/logout", logoutRoutes);

//Clients Register
app.use("/api/registerClients", registerCliRoutes);

//Password Recovery
app.use("/api/passwordRecovery", passRecoveryRoutes);

//Images
app.use("/api/blog", blogRoutes);

//Sales
app.use("/api/sales", salesRoutes);

//Hacer la constante global
export default app;
