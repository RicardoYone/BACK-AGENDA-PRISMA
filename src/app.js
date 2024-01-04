import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import contactController from "./controllers/contactController.js";

dotenv.config();

const app = express();

app.set("view engine", "ejs");
app.set("views", "./src/views");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(contactController);


app.listen(3000, () => {
  console.log("Servidor iniciado en el puerto http://localhost:3000");
});
