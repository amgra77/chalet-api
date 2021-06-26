const fp = require("fastify-plugin")

module.exports = fp(async function (fastify) {
    fastify.register(require("fastify-jwt"), {
        secret: process.env.JWT_SECRET || "secret",
        sign: {
            expiresIn: "1h"
        }
    });

    fastify.decorate("isAuthenticated", async function (req, res) {
        try {
            await req.jwtVerify()
        } catch (err) {
            res.send(err)
        }
    });
})