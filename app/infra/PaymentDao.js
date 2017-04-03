function PaymentDao(connection) {
	this._connection = connection;
}

PaymentDao.prototype.save = function(payment, callback) {
	this._connection.query('INSERT INTO payments SET ?', payment, callback);
}

PaymentDao.prototype.list = function(callback) {
	this._connection.query('SELECT * FROM payments', callback);
}

PaymentDao.prototype.searchId = function(id, callback) {
	this._connection.query('SELECT * FROM payments WHERE id = ?', [id], callback);
}

module.exports = function() {
	return PaymentDao;
}