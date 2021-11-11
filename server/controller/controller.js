let userDb = require('../model/model');

exports.create = (req,res) => {
    if(!req.body){
        res.status(400).send({ message: 'Content Cannot Be Empty!' })
        return;
    } 

    const user = new userDb({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    })

    user
        .save(user)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while creating a create operation."
            });
        });
}

exports.find = (req,res) => {
    userDb.find()
    .then(user => {
        res.send(user);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occured while get users data."
        })
    })
}

exports.update = (req,res) => {
    if(!req.body){
        res.status(400).send({ message: 'Data to update cannot be empty!' })
        return;
    } 

    const id = req.params.id
}

exports.delete = (req,res) => {
    
}