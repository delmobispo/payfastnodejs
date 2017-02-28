module.exports = PagamentoController;

function PagamentoController(app){
	var pagamentoDAO = require('../daos/PagamentoDAO');

	var controller = {
		lista: lista,
		recebe: recebe,
		buscaPorId: buscaPorId,
		confirma: confirma,
		cancela: cancela
	}
	return controller;

	function lista(request, response){
		new pagamentoDAO(app).lista(function(err, result){
			if(err){
				response.status(500).json(err);
				return;
			}
			if(result.length > 0){
				response.json(result);
				return;
			}
			response.status(204).json(result);
		});
	}

	function alteraStatus(status, request, response){
		var pagamento  = {
			id: request.params['id'], 
			status: status
		};

		new pagamentoDAO(app).alteraStatus(pagamento.id, status, function(err, result){
			if(err){
				response.status(500).json(err);
				return;
			}
			if(result.affectedRows == 0){
				response.status(304).json('');
				return;
			}
			response.status(205).json(pagamento);
		});
	}

	function confirma(request, response){
		alteraStatus('CONFIRMADO', request, response);
	}

	function cancela(request, response){
		alteraStatus('CANCELADO', request, response);
	}

	function recebe(request, response){
		request.assert('forma_de_pagamento', 'Forma de Pagamento é obrigatório').notEmpty();
		request.assert('valor', 'Valor deve ser preenchido').notEmpty();
		request.assert('valor', 'Valor deve ser um número decimal. Ex: 10.98').isFloat();
		var validationErrors = request.validationErrors();
		if(validationErrors){
			response.status(400).json(validationErrors);
			return;
		}

		var pagamento = request.body;
		pagamento.status = 'CRIADO';
		pagamento.data = new Date();
		new pagamentoDAO(app).salva(pagamento, function(err, result){
			if(err){
				response.status(500).json(err);
				return;
			}
			pagamento.id = result.insertId;

			//Hateoas
			var link = '/pagamentos/pagamento/' + pagamento.id;
			var hateoas = {
				dados_pagamento: pagamento,
				links : [
					{
						href: link,
						rel: 'confirmar',
						method: 'PUT'
					},
					{
						href: link,
						rel: 'cancelar',
						method: 'DELETE'
					}
				]
			}

			response.location(link);
			response.status(201).json(hateoas);
		});
	}

	function buscaPorId(request, response){
		var id = request.params['id'];
		new pagamentoDAO(app).buscaPorId(id, function(err, result){
			if(err){
				response.status(500).json(err);
				return;
			}
			if(result.length > 0){
				response.json(result[0]);
				return;
			}
			response.status(404).json('');
		});
	}
}