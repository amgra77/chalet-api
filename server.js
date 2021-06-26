require('dotenv').config()
const path = require('path')
const fastify = require('fastify')({logger:process.env.LOGGER || false})
const PORT = process.env.PORT || 5000;
const propertiesRoutes = require('./routes/properties')
const commonRoutes = require('./routes/common')
const authenticationRoutes = require('./routes/authentication')
const auth = require("./plugins/authentication")
const DB_HOST = process.env.DB_HOST || "localhost";
const DB_PORT = process.env.DB_PORT || "27017";
const DB_USER = process.env.DB_USER || "username";
const DB_PASSWORD = process.env.DB_PASSWORD || "password";

fastify.register(require('fastify-static'), {
    root: path.join(__dirname, 'public'),
    // prefix: '/public/', // optional: default '/'
});

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
        securityDefinitions: {
            JWTToken: {
                type: 'apiKey',
                name: 'Authorization',
                in: 'header'
            }
        }
    }
});

function getUrl() {
    if (process.env.NODE_ENV=="production") {
        return `mongodb+srv://${encodeURIComponent(DB_USER)}:${encodeURIComponent(DB_PASSWORD)}@${DB_HOST}/challetDB?retryWrites=true&w=majority`
    }
    else {
        `mongodb://${encodeURIComponent(DB_USER)}:${encodeURIComponent(DB_PASSWORD)}@${DB_HOST}:${DB_PORT}/challetDB` 
    }
}

fastify.register(require('fastify-mongodb'), {
  forceClose: true,
  authSource: 'admin',
  url: getUrl()
});

fastify.register(auth);

fastify.register(allRoutes, {prefix: 'api'});

function allRoutes(fastify, options, done) {
    fastify.register(authenticationRoutes, {prefix: 'auth'});    
    fastify.register(commonRoutes);
    fastify.register(propertiesRoutes, {prefix: 'property'});
    done();
}


const start = async () => {
    try {
        await fastify.listen(PORT, '0.0.0.0');
    } catch (error) {
        fastify.log.error(error);
        process.exit(1);
    }
}

start();