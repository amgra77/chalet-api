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

const updatePropertyOptions = {
    schema: {
        tags: ['properties'],
        params: {
            id: { type: "string" }
        },
        body: updatePropertySchema,
        response: {
            200: propertySchema,
            404: errorSchema,
        }
    },
    handler: updateProperty
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
            200: propertySchema,
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
    fastify.get('/', getAllPropertiesOptions);
    fastify.get('/:id', getOnePropertyOptions);
    fastify.post('/', createPropertyOptions);
    fastify.delete('/:id', deletePropertyOptions);
    fastify.patch('/:id', updatePropertyOptions);
    done();
}

module.exports = propertiesRoutes;