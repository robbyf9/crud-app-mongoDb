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
            // res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while creating a create operation."
            });
        });
}

exports.find = (req,res) => {
    const id = req.query.id

    if(id){
        userDb.findById(id)
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occured while get user data."
                })
            })
    } else {
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

}

exports.update = (req,res) => {
    if(!req.body){
        res.status(400).send({ message: 'Data to update cannot be empty!' })
        return;
    } 

    const id = req.params.id

    userDb.findByIdAndUpdate(id, req.body, { useFindAndModify:false })
        .then(data => {
            if(!data){
                res.status(404).send({ message: `Cannot update user with ${id}. Maybe user not found!` })
            }else{
                res.send({
                    message: "User updated sucessfully!"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while update user data."
            })
        })
}

exports.delete = (req,res) => {
    const id = req.params.id

    userDb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message: `Cannot delete user with ${id}. Maybe id is wrong!` })
            }else{
                res.send({
                    message: "User deleted sucessfully!"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while delete user data."
            })
        })
}