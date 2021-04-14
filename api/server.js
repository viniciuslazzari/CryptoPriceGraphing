const express = require('express');
var cors = require('cors');
require('dotenv').config()

port = process.env.PORT;

const app = express();
app.set('port', port);
app.use(express.json());
app.use(cors());

require('./routes/historicalDataRoutes')(app);

app.listen(port, () => {
	console.log(`Servidor rodando na porta ${port}`)
});