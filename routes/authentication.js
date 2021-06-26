// const { loginController, logoutController } = require('../controllers/authentication')
const { loginController, signupController } = require('../controllers/authentication')

const errorSchema = {
    type: 'object',
    properties: {
        statusCode: { type: 'integer' },
        error: { type: 'string' },
        message: { type: 'string' },
    }
}

const tokenSchema = {
    type: 'object',
    properties: {
        token: { type: 'string' },
    }
}

const loginRequestSchema = {
    type: 'object',
    required: ['username', 'password'],
    properties: {
        username: { type: 'string' },
        password: { type: 'string' },
    }
}

const loginOptions = {
    schema: {
        tags: ['auth'],
        body: loginRequestSchema,
        response: {
            200: tokenSchema,
            401: errorSchema,
            500: errorSchema,
        }
    },
    handler: loginController
};

const signupRequestSchema = {
    type: 'object',
    required: ['username', 'password'],
    properties: {
        username: { type: 'string' },
        password: { type: 'string' },
    }
}

const signupResponseSchema = {
    type: 'object',
    properties: {
        id: { type: 'string' },
        username: { type: 'string' },
    }
}

const signupOptions = {
    schema: {
        tags: ['auth'],
        body: signupRequestSchema,
        response: {
            200: signupResponseSchema,
            500: errorSchema,
        },
    },
    handler: signupController
};

function authRoutes(fastify, options, done) {
    fastify.post('/login', loginOptions);
    fastify.post('/signup', signupOptions);
    done();
}

module.exports = authRoutes;