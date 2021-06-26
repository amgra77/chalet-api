const rootSchema = {
    type: 'object',
    properties: {
        version: { type: 'string' },
        name:    { type: 'string' },
    }
};

const getRootController = (req, res) => {
    res.send({version: require('../package.json').version, name: require('../package.json').name});
}

const rootOptions = {
    schema: {
        response: {
            200: rootSchema
        }
    },
    handler: getRootController
};

function commonRoutes(fastify, options, done) {
    fastify.get('/', rootOptions);
    done();
}

module.exports = commonRoutes;