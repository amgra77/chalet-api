const fastify = require('fastify')({logger:true})
const PORT = process.env.PORT || 5000;
const propertiesRoutes = require('./routes/properties')

const getWelcome = (req, res) => {
    res.send({version: require('./package.json').version, name: require('./package.json').name});
}

fastify.register(require('fastify-swagger'), {
    exposeRoute: true,
    routePrefix: 'docs',
    swagger: {
        info: {
            title: 'Challet API',
            description: 'API to manage Challet',
            version: require('./package.json').version
        },
        tags: [
            { name: 'properties', description: 'Properties operations' },
        ],
    }
});
fastify.register(propertiesRoutes);
fastify.get('/', getWelcome);

const start = async () => {
    try {
        await fastify.listen(PORT);
    } catch (error) {
        fastify.log.error(error);
        process.exit(1);
    }
}

start();