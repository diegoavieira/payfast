module.exports = function(app) {
	app.get('/payments', function(req, res) {
		res.send('Payments OK!');
	});

	app.post('/payments/payment', function(req, res) {
		let payment = req.body;
		
		req.assert('payment_form', 'Payment form is required!').notEmpty();
		req.assert('value', 'Value is required and must be decimal number!').notEmpty().isFloat();
		req.assert('currency', 'Currency is required and must be three characters!').notEmpty().len(3,3);

		let errors = req.validationErrors();

		if (errors) {
			console.log('Valitation errors found!');
			res.status(400).send(errors);
			return;
		}

		console.log('Processing payment...');

		let connection = app.infra.connectionFactory();
		let paymentDao = new app.infra.PaymentDao(connection);

		payment.status = 'created';
		payment.date = new Date();

		paymentDao.save(payment, function(error, result) {
			console.log(`Payment created: ${result}`);

			res.location(`/payments/payment/${result.insertId}`);

			payment.id = result.insertId;

			res.status(201).json(payment);
		});

		connection.end();
	});
}
