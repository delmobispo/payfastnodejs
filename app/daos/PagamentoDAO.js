module.exports = PagamentoDAO;

function PagamentoDAO(app){
	this._poolConnection = app.factories.ConnectionMySQLFactory;
}

PagamentoDAO.prototype.lista = function(callback){
	this._poolConnection.getConnection(function(err, connection){
		if(err) throw err;
		connection.query('SELECT * FROM pagamentos', callback);
		connection.release();
	});
}

PagamentoDAO.prototype.alteraStatus = function(id, status, callback){
	this._poolConnection.getConnection(function(err, connection){
		if(err) throw err;
		connection.query('UPDATE pagamentos SET status = ? WHERE id = ?', [status, id], callback);
		connection.release();
	});
}

PagamentoDAO.prototype.salva = function(pagamento, callback){
	this._poolConnection.getConnection(function(err, connection){
		if(err) throw err;
		connection.query('INSERT INTO pagamentos SET ?', pagamento, callback);
		connection.release();
	});
}

PagamentoDAO.prototype.buscaPorId = function(id, callback){
	this._poolConnection.getConnection(function(err, connection){
		if(err) throw err;
		connection.query('SELECT * FROM pagamentos WHERE id = ?', id, callback);
		connection.release();
	});
}