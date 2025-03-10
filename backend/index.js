//Importar archivo app.js
import app from "./app.js";
import "./database.js";

//Ejecutar el servidor
async function main() {
    const port = 4000;
    app.listen(port);
    console.log("Server Is Running");

}

//Ejecutar todo
main();