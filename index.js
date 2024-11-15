import express from "express";
import cors from "cors";
import { infoUsuario } from "./consultas.js";
import jsonwebtoken from "jsonwebtoken";
// import { reportMiddleware, requestLogger } from "./middlewares/middleWares.js";

const app = express();
const port = 3000;

// app.use(reportMiddleware);
// app.use(requestLogger);
app.use(cors());
app.use(express.json());

app.listen(port, () => console.log(`Servidor iniciado en puerto ${port}!`));

app.get('/usuarios', async (req, res) => {
    try {
        const result = await infoUsuario(); // Cambia 'users' a una tabla existente
        res.json(result.rows); // Devuelve los registros en formato JSON
    } catch (error) {
        console.error('Error al ejecutar la consulta:', error);
        res.status(500).json({ error: 'Error al conectar con la base de datos' });
    }
});