module.exports = PagamentoRoutes;
function PagamentoRoutes(app){
	app.get('/pagamentos', app.controllers.PagamentoController.lista);
	app.get('/pagamentos/pagamento/:id', app.controllers.PagamentoController.buscaPorId);
	app.post('/pagamentos/pagamento', app.controllers.PagamentoController.recebe);
	app.put('/pagamentos/pagamento/:id', app.controllers.PagamentoController.confirma);
	app.delete('/pagamentos/pagamento/:id', app.controllers.PagamentoController.cancela);
}