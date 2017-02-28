module.exports = ExpressConfig;
function ExpressConfig(){
	var app = require('express')();
	var bodyParser = require('body-parser');
	var load = require('express-load');
	var expressValidator = require('express-validator');

	//Content Negociation
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());
	app.use(expressValidator());

	load('factories', {cwd: 'app'})
		.then('controllers')
		.then('routes')
			.into(app);
	
	var porta = process.env.PORT || 3000;
	app.listen(porta, function(){
		if(process.env.NODE_ENV == 'test')
			console.log('Pronto para rodar os testes na porta :' + porta);
		else
			console.log('Servidor rodando na porta :' + porta);
	});
	return app;
}
