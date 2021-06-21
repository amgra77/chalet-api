const { getOneProperty, getAllProperties, createProperty, deleteProperty } = require('../controllers/properties')

const propertySchema = {
    type: 'object',
    properties: {
        id: { type: 'string', format: 'uuid' },
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

const errorSchema = {
    type: 'object',
    properties: {
        statusCode: { type: 'integer' },
        error: { type: 'string' },
        message: { type: 'string' },
    }
}

const getAllPropertiesOptions = {
    schema: {
        tags: ['properties'],
        description: 'Get a list of all available properties',
        summary: 'getAllProperties',
        response: {
            200: {
                type: 'array',
                items: propertySchema,
            }
        }
    },
    handler: getAllProperties,
};

const getOnePropertyOptions = {
    schema: {
        tags: ['properties'],
        // query: {
        //     id: { type: "string" }
        // },
        params: {
            id: { type: "string" }
        },
        response: {
            200: propertySchema,
            404: errorSchema,
        },
    },
    handler: getOneProperty
};

const deletePropertyOptions = {
    schema: {
        tags: ['properties'],
        params: {
            id: { type: "string" }
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    message: {type: 'string'}
                }
            },
            404: errorSchema,
        }
    },
    handler: deleteProperty
};

const createPropertyOptions = {
    schema: {
        tags: ['properties'],
        body: createPropertySchema,
        response: {
            201: propertySchema,
            400: errorSchema,
            500: errorSchema,
        }
    },
    handler: createProperty
};

function propertiesRoutes(fastify, options, done) {
    fastify.get('/property', getAllPropertiesOptions);
    fastify.get('/property/:id', getOnePropertyOptions);
    fastify.post('/property', createPropertyOptions);
    fastify.delete('/property/:id', deletePropertyOptions);
    done();
}

module.exports = propertiesRoutes;