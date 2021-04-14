var spawn = require("child_process").spawn;

module.exports = () => {
	const controller = {};

	controller.getHistoricalData = (req, res) => {
		var process = spawn('python', ['./microservices/cryptoPriceHistory.py',
			req.query.coin,
			req.query.timePeriod]);

		process.stdout.on('data', function (data) {
			res.status(200).send(JSON.parse(data));
		})
	}

	return controller;
}