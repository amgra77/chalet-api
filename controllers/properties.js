const getAllProperties = async function(req, res) {
    // console.log('req.user ', req.user); // {user:xxxx}
    const data = await this.mongo.db.collection('challet').find().toArray();
    data.map(one => one.id = one._id);
    res.send(data);
};

const getOneProperty = async function (req, res) {
    const { id } = req.params;
    const found = await this.mongo.db.collection('challet').findOne({"_id": this.mongo.ObjectId(id)});
    if (found) {
        found.id = found._id;
        res.send(found);
    }
    else {
        throw new Error('Item not found');
    }
};

const createProperty = async function (req, res) {
    const { name, city } = req.body;
    const newProperty = { name, city };
    const result = await this.mongo.db.collection("challet").insertOne(newProperty);
    res.code(201).send({id: result.insertedId, name, city});
};

const deleteProperty = async function(req, res) {
    const { id } = req.params;
    const found = await this.mongo.db.collection('challet').findOneAndDelete({"_id": this.mongo.ObjectId(id)});
    if (found.value) {
        found.value.id = found.value._id;
        res.send(found.value);
    }
    else {
        throw new Error('Item not found');
    }
};

const updateProperty = async function(req, res) {
    const { id } = req.params;
    const { name, city } = req.body;
    const found = await this.mongo.db.collection('challet').findOne({"_id": this.mongo.ObjectId(id)});
    if (found) {
        const data = {
            name: name || found.name,
            city: city || found.city,
        };
        const success = await this.mongo.db.collection('challet').findOneAndUpdate({"_id": this.mongo.ObjectId(id)},{$set: data});
        if (success.value) {
            res.send({...data, id});
        }
        else {
            throw new Error('Error updating item');
        }
    }
    else {
        throw new Error('Item not found');
    }
};

module.exports = {
    getOneProperty,
    getAllProperties,
    createProperty,
    deleteProperty,
    updateProperty,
};