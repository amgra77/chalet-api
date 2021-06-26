const bcrypt = require("bcrypt");

const loginController = async function(req, res) {
    const { username, password } = req.body;

    const found = await this.mongo.db.collection('users').findOne({"username": username});
    if (found) {
        const hashedPassword = await bcrypt.hash(password, found.salt);
        if (hashedPassword===found.password) {
            const token = await res.jwtSign({ username });
            res.send({token});        
        }
        else {
            res.code(401).send({message: "Login error"});
        }
    }
    else {
        res.code(401).send({message: "Login error"});
    }
};

const signupController = async function(req, res) {
    const { username, password } = req.body;
    
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const userData = { username, password: hashedPassword, salt };
    const result = await this.mongo.db.collection("users").insertOne(userData);

    res.code(201).send({id: result.insertedId, username});
};

module.exports = { loginController, signupController };