const express = require('express');
var cors = require('cors');
require('dotenv').config()

port = process.env.PORT;

const app = express();
app.set('port', port || 8080);
app.use(express.json());
app.use(cors());

require('./routes/historicalDataRoutes')(app);

app.listen(port, () => {
	console.log(`Server running on port: ${port}`)
});