import express from 'express';
import { inicializarBanco } from './src/database/db.js';
import router from './src/routes/usuarioRoutes.js';

const app = express();
app.use(express.json());

app.use('/usuarios', router);

inicializarBanco();

app.listen(process.env.PORT, () => {
    console.log(`Servidor rodando em http://localhost:${process.env.PORT}`)
});