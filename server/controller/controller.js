let userDb = require("../model/model");

exports.create = (req, res) => {
  if (!req.body) {
    return res.send({ message: "Content Cannot Be Empty!" });
  } else if (req.body.name.match(/\d+/) !== null) {
    return res.send({ message: "Name Can't Contains Numbers" });
  }

  const user = new userDb({
    name: req.body.name,
    email: req.body.email,
    umur: req.body.umur,
  });

  user
    .save(user)
    .then((data) => {
      return res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while creating a create operation.",
      });
    });
};

exports.find = (req, res) => {
  const id = req.query.id;
  if (id) {
    userDb
      .findById(id)
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occured while get user data.",
        });
      });
  } else {
    userDb
      .find()
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occured while get users data.",
        });
      });
  }
};

exports.update = (req, res) => {
  const id = req.params.id;

  if (!req.body) {
    return res.send({ message: "Data to update cannot be empty!" });
  } else if (req.body.name.match(/\d+/) !== null) {
    return res.send({ message: "Name Can't Contains Numbers" });
  }

  userDb
    .findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        return res.send({ message: `Cannot update user with ${id}. Maybe user not found!` });
      } else {
        res.send({
          message: "User updated sucessfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while update user data.",
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  userDb
    .findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        return res.send({ message: `Cannot delete user with ${id}. Maybe id is wrong!` });
      } else {
        res.send({
          message: "User deleted sucessfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while delete user data.",
      });
    });
};
