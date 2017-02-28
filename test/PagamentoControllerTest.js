process.env['NODE_ENV'] = 'test';
var app = require('../app/config/ExpressConfig')();
var request = require('supertest')(app);
var DatabaseCleaner = require('database-cleaner');

describe('#PagamentoControllerTest', PagamentoControllerTest);

function PagamentoControllerTest(){
	before(function(done){
		this.timeout(10000);
		var databaseCleaner = new DatabaseCleaner('mysql');
		app.factories.ConnectionMySQLFactory.getConnection(function(err, connection){
			if(err) throw err;
			databaseCleaner.clean(connection, function(){
				console.log('Banco de dados limpo.');
				done();
			});
			connection.release();
		});
	});
	
	it('#Listagem de todos os pagamentos retornando vazio', function(done){
		this.timeout(5000);
		request.get('/pagamentos').expect(204, [], done);
	});

	it('#Criação do pagamento com ID #1', function(done){
		request.post('/pagamentos/pagamento').send({
    		"id": 1,
    		"forma_de_pagamento": "Cartão de Crédito",
    		"valor": 33.88,
    		"moeda": "BRL",
    		"descricao": "Pagamento 1 criado"
  		}).expect(201, done);
	});

	it('#Criação do pagamento com ID #2', function(done){
		request.post('/pagamentos/pagamento').send({
    		"id": 2,
    		"forma_de_pagamento": "Cartão de Crédito",
    		"valor": 80,
    		"moeda": "BRL",
    		"descricao": "Pagamento 2 criado"
  		}).expect(201, done);
	});

	it('#Criação do pagamento com ID #3', function(done){
		request.post('/pagamentos/pagamento').send({
    		"id": 3,
    		"forma_de_pagamento": "Cartão de Crédito",
    		"valor": 99.43,
    		"moeda": "BRL",
    		"descricao": "Pagamento 3 criado"
  		}).expect(201, done);
	});

	it('#Nega criação do pagamento com valor inválido', function(done){
		var retorno = [
			{
				"param": "valor",
				"msg": "Valor deve ser um número decimal. Ex: 10.98",
				"value": "99,43"
			}
		];
		request.post('/pagamentos/pagamento').send({
    		"forma_de_pagamento": "Cartão de Crédito",
    		"valor": '99,43',
    		"moeda": "BRL",
    		"descricao": "Pagamento invalido"
  		}).expect(400, retorno, done);
	});

	it('#Nega criação do pagamento com valor vazio', function(done){
		var retorno = [
			{
    			"param": "valor",
    			"msg": "Valor deve ser preenchido",
    			"value": ""
  			},
  			{
    			"param": "valor",
    			"msg": "Valor deve ser um número decimal. Ex: 10.98",
    			"value": ""
  			}
		];
		request.post('/pagamentos/pagamento').send({
    		"forma_de_pagamento": "Cartão de Crédito",
    		"valor": '',
    		"moeda": "BRL",
    		"descricao": "Pagamento invalido"
  		}).expect(400, retorno, done);
	});

	it('#Nega criação do pagamento com valor nulo', function(done){
		var retorno = [
			{
    			"param": "valor",
    			"msg": "Valor deve ser preenchido",
    			"value":  null
  			},
  			{
    			"param": "valor",
    			"msg": "Valor deve ser um número decimal. Ex: 10.98",
    			"value": null
  			}
		];
		request.post('/pagamentos/pagamento').send({
    		"forma_de_pagamento": "Cartão de Crédito",
    		"valor": null,
    		"moeda": "BRL",
    		"descricao": "Pagamento invalido"
  		}).expect(400, retorno, done);
	});

	it('#Nega criação do pagamento com forma_de_pagamento vazio', function(done){
		var retorno = [
			{
    			"param": "forma_de_pagamento",
    			"msg": "Forma de Pagamento é obrigatório",
    			"value": ""
  			}
		];
		request.post('/pagamentos/pagamento').send({
    		"forma_de_pagamento": "",
    		"valor": '99.43',
    		"moeda": "BRL",
    		"descricao": "Pagamento invalido"
  		}).expect(400, retorno, done);
	});

	it('#Nega criação do pagamento com forma_de_pagamento nulo', function(done){
		var retorno = [
			{
    			"param": "forma_de_pagamento",
    			"msg": "Forma de Pagamento é obrigatório",
    			"value": null
  			}
		];
		request.post('/pagamentos/pagamento').send({
    		"forma_de_pagamento": null,
    		"valor": '99.43',
    		"moeda": "BRL",
    		"descricao": "Pagamento invalido"
  		}).expect(400, retorno, done);
	});

	it('#Nega criação do pagamento com forma_de_pagamento nulo e valor inválido', function(done){
		var retorno = [
			{
				"param": "forma_de_pagamento",
				"msg": "Forma de Pagamento é obrigatório",
				"value": null
			},
			{
				"param": "valor",
				"msg": "Valor deve ser um número decimal. Ex: 10.98",
				"value": "14,11"
			}
		];
		request.post('/pagamentos/pagamento').send({
    		"forma_de_pagamento": null,
    		"valor": '14,11',
    		"moeda": "BRL",
    		"descricao": "Pagamento invalido"
  		}).expect(400, retorno, done);
	});

	it('#Nega criação do pagamento com forma_de_pagamento vazio e valor inválido', function(done){
		var retorno = [
			{
				"param": "forma_de_pagamento",
				"msg": "Forma de Pagamento é obrigatório",
				"value": ""
			},
			{
				"param": "valor",
				"msg": "Valor deve ser um número decimal. Ex: 10.98",
				"value": "14,11"
			}
		];
		request.post('/pagamentos/pagamento').send({
    		"forma_de_pagamento": "",
    		"valor": '14,11',
    		"moeda": "BRL",
    		"descricao": "Pagamento invalido"
  		}).expect(400, retorno, done);
	});

	it('#Nega criação do pagamento com forma_de_pagamento vazio e valor vazio', function(done){
		var retorno = [
			{
				"param": "forma_de_pagamento",
				"msg": "Forma de Pagamento é obrigatório",
				"value": ""
			},
			{
				"param": "valor",
				"msg": "Valor deve ser preenchido",
				"value": ""
			},
			{
				"param": "valor",
				"msg": "Valor deve ser um número decimal. Ex: 10.98",
				"value": ""
			}
		];
		request.post('/pagamentos/pagamento').send({
    		"forma_de_pagamento": "",
    		"valor": "",
    		"moeda": "BRL",
    		"descricao": "Pagamento invalido"
  		}).expect(400, retorno, done);
	});

	it('#Nega criação do pagamento com forma_de_pagamento nulo e valor nulo', function(done){
		var retorno = [
			{
				"param": "forma_de_pagamento",
				"msg": "Forma de Pagamento é obrigatório",
				"value": null
			},
			{
				"param": "valor",
				"msg": "Valor deve ser preenchido",
				"value": null
			},
			{
				"param": "valor",
				"msg": "Valor deve ser um número decimal. Ex: 10.98",
				"value": null
			}
		];
		request.post('/pagamentos/pagamento').send({
    		"forma_de_pagamento": null,
    		"valor": null,
    		"moeda": "BRL",
    		"descricao": "Pagamento invalido"
  		}).expect(400, retorno, done);
	});

	it('#Listagem de todos os pagamentos', function(done){
		this.timeout(5000);
		request.get('/pagamentos').expect(200, done);
	});

	it('#Pega um pagamento com ID #1', function(done){
		request.get('/pagamentos/pagamento/1').expect(200, done);
	});

	it('#Confirma o pagamento com ID #2', function(done){
		request.put('/pagamentos/pagamento/2').expect(205, done);
	});

	it('#Cancela o pagamento com ID #3', function(done){
		request.delete('/pagamentos/pagamento/3').expect(205, done);
	});

	it('#Pagamento com ID #22 não encontrado', function(done){
		request.get('/pagamentos/pagamento/22').expect(404, done);
	});

	it('#Confirma o pagamento com ID #22 inexistente', function(done){
		request.put('/pagamentos/pagamento/22').expect(304, done);
	});

	it('#Cancela o pagamento com ID #22 inexistente', function(done){
		request.delete('/pagamentos/pagamento/22').expect(304, done);
	});
}
