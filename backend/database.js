//Importar ORM Mongoose
import mongoose from "mongoose";

//Dirección de la Base de Datos
const URI = "mongodb://127.0.0.1:27017/cocacolaDB"

//Conectar a MongoDB
mongoose.connect(URI);

//Validación DB
const connection = mongoose.connection;

connection.once("open", () => {
    console.log("DB Is Connected");
});

connection.on("disconnected", () => {
    console.log("DB Is Disconnected");
});

connection.on("error", (error) => {
    console.log("Error Found: " + error);
});