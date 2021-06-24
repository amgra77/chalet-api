const fastify = require('fastify')({logger:true})
const PORT = process.env.PORT || 5000;

const propertiesRoutes = require('./routes/properties')
const commonRoutes = require('./routes/common')

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
            {
                name: 'properties',
                description: 'Properties operations' 
            },
        ],
    }
});

fastify.register(require('fastify-mongodb'), {
  forceClose: true,
  authSource: 'admin',
  url: 'mongodb://root:Super%40123@localhost:27017/challetDB'
});

fastify.register(commonRoutes);
fastify.register(propertiesRoutes, {prefix: 'property'});

const start = async () => {
    try {
        await fastify.listen(PORT);
    } catch (error) {
        fastify.log.error(error);
        process.exit(1);
    }
}

start();