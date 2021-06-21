const uuid = require('uuid').v4
const properties = require('../properties');

const getAllProperties = (req, res) => {
    res.send(properties);
};

const getOneProperty = (req, res) => {
    const { id } = req.params;
    const found = properties.find(one => one.id == id);
    if (found) {
        res.send(found);
    }
    else {
        res.code(404).send({statusCode: 404, error: 'NOT_FOUND', message: 'Item not found'});
    }
}

const createProperty = (req, res) => {
    const { name, city } = req.body;
    const newProperty = {
        id: uuid(),
        name,
        city
    };
    properties.push(newProperty);
    res.code(201).send(newProperty);
}

const deleteProperty = (req, res) => {
    const { id } = req.params;
    const foundIndex = properties.findIndex(one => one.id == id);
    if (foundIndex>=0) {
        properties.splice(foundIndex, 1);
        res.send({message: 'DELETED'});
    }
    else {
        console.log('asdas das das d');
        res.code(404).send({statusCode: 404, error: 'NOT_FOUND', message: 'Item not found'});
    }
}

module.exports = {
    getOneProperty,
    getAllProperties,
    createProperty,
    deleteProperty,
};