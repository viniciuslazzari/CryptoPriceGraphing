const express = require('express');
require('dotenv').config()

port = process.env.PORT;

const app = express();
app.set('port', port);
app.use(express.json());

app.listen(port, () => {
	console.log(`Servidor rodando na porta ${port}`)
});