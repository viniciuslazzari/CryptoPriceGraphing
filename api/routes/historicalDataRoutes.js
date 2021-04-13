module.exports = app => {
	const controller = require('../controllers/historicalDataController')();

	app.route('/api/v1/historicaldata')
		.get(controller.getHistoricalData);
}