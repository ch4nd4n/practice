const fastify = require('fastify')({logger: true});

const PORT = process.env.PORT || 3002;

fastify.get('/', function (request, reply) {
	reply.send({hello: 'world'});
});

fastify.listen(PORT, '0.0.0.0', (err, address) => {
	if(err) {
		console.log(err);
		process.exit(1);
	}
	fastify.log.info(`server listening on ${PORT}`);

});
