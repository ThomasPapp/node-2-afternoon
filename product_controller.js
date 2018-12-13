function create(req, res) {
    const db = req.app.get('db');
    const { name, description, price, image_url } = req.body
    db.create_product([ name, description, price, image_url ])
    .then(() => res.sendStatus(200))
    .catch(error => console.log(error))
}

function getOne(req, res) {
    const db = req.app.get('db');
    db.read_product([ +req.params.id ])
    .then(product => res.status(200).json(product))
    .catch(error => console.log(error))
}

function getAll(req, res) {
    const db = req.app.get('db');
    db.read_products()
    .then(products => res.status(200).json(products))
    .catch(error => console.log(error))
}

function update(req, res) {
    if (!req.query.desc) {
        res.sendStatus(400);
        return;
    }

    const db = req.app.get('db');
    db.update_product([ req.query.desc, +req.params.id ])
    .then(() => res.sendStatus(200))
    .catch(error => console.log(error))
}

function remove(req, res) {
    const db = req.app.get('db');
    db.delete_product([ +req.params.id ])
    .then(() => res.sendStatus(200))
    .catch(error => console.log(error))
}

module.exports = {
    create,
    getOne,
    getAll,
    update,
    remove
}