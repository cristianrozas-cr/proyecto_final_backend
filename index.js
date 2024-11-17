import express from "express";
import cors from "cors";
import router from "./rutas/rutas.js";


const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use("/tecno", router);

app.listen(port, () => console.log(`Servidor iniciado en puerto ${port}!`));
  