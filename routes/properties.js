const {
    getOneProperty,
    getAllProperties,
    createProperty,
    deleteProperty,
    updateProperty,
} = require('../controllers/properties')

const errorSchema = {
    type: 'object',
    properties: {
        statusCode: { type: 'integer' },
        error: { type: 'string' },
        message: { type: 'string' },
    }
}

const propertySchema = {
    type: 'object',
    properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        city: { type: 'string' },
    }
}

const createPropertySchema = {
    type: 'object',
    required: ['name','city'],
    properties: {
        name: { type: 'string' },
        city: { type: 'string' },
    },
}

const updatePropertySchema = {
    type: 'object',
    properties: {
        name: { type: 'string' },
        city: { type: 'string' },
    },
}

function propertiesRoutes(fastify, options, done) {
    fastify.get('/', {
        schema: {
            tags: ['properties'],
            description: 'Get a list of all available properties',
            summary: 'getAllProperties',
            response: {
                200: {
                    type: 'array',
                    items: propertySchema,
                },
                401: errorSchema,
            },
            security: [{"JWTToken": []}],
        },
        preValidation: [fastify.isAuthenticated],
        handler: getAllProperties,
    });

    fastify.get('/:id', {
        schema: {
            tags: ['properties'],
            params: {
                id: { type: "string" }
            },
            response: {
                200: propertySchema,
                401: errorSchema,
                404: errorSchema,
            },
            security: [{"JWTToken": []}],
        },
        preValidation: [fastify.isAuthenticated],
        handler: getOneProperty
    });
    
    fastify.post('/', {
        schema: {
            tags: ['properties'],
            body: createPropertySchema,
            response: {
                201: propertySchema,
                401: errorSchema,
                500: errorSchema,
            },
            security: [{"JWTToken": []}],
        },
        preValidation: [fastify.isAuthenticated],
        handler: createProperty
    });
    
    fastify.delete('/:id', {
        schema: {
            tags: ['properties'],
            params: {
                id: { type: "string" }
            },
            response: {
                200: propertySchema,
                401: errorSchema,
                404: errorSchema,
                500: errorSchema,
            },
            security: [{"JWTToken": []}],
        },
        preValidation: [fastify.isAuthenticated],
        handler: deleteProperty
    });
    
    fastify.patch('/:id', {
        schema: {
            tags: ['properties'],
            params: {
                id: { type: "string" }
            },
            body: updatePropertySchema,
            response: {
                200: propertySchema,
                401: errorSchema,
                404: errorSchema,
                500: errorSchema,
            },
            security: [{"JWTToken": []}],
        },
        preValidation: [fastify.isAuthenticated],
        handler: updateProperty
    });
    
    done();
}

module.exports = propertiesRoutes;