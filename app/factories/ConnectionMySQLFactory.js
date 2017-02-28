module.exports = ConnectionMySQLFactory;

function ConnectionMySQLFactory(){
	if(process.env.NODE_ENV == 'test'){
		return modeTest();
	}
	return modeProduction();
}

function createPool(config){
	var mysql = require('mysql');
	var pool  = mysql.createPool(config);
	pool.on('acquire', function (connection) {
  		console.log('Connection %d acquired', connection.threadId);
	});
	pool.on('release', function (connection) {
  		console.log('Connection %d released', connection.threadId);
	});
	return pool;	
}

function modeProduction(){
	var config = {
		host: 'delmobispo.com.br',
		database: 'delmobis_nodejs',
		user: 'delmobis_nodejs',
		password: 's=Qz$)ZT5e2A'
	};
	return createPool(config);
}

function modeTest(){
	var config = {
		host: 'delmobispo.com.br',
		database: 'delmobis_nodejs_test',
		user: 'delmobis_nodejs',
		password: 's=Qz$)ZT5e2A'
	};
	return createPool(config);
}