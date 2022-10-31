const { User, userValidate } = require("../models/userApiModel");

const getAllErrorsIfAny = (req, res, error) => {
  if (error.details) {
    const allErrors = error.details.map((eachObject) => eachObject.message);
    return res.status(400).json({
      error: allErrors,
    });
  }
  if (error.name === "CastError") {
    var customMessage =
      (error.path === "_id" ? "User ID" : error.path) + " is not valid";
    return res.status(404).json(customMessage);
  }
  if (error.code === 11000) {
    customMessage = Object.keys(error.keyValue).map((key, val) => {
      return key + " already exists, try different";
    });
    return res.status(400).json({ error: customMessage });
  }
  return res.status(400).json({
    error: error,
  });
};

const getAllUser = (req, res) => {
  try {
    User.find().then((data, err) => {
      if (err) {
        return getAllErrorsIfAny(req, res, err);
      }
      return res.status(200).send(data);
    });
  } catch (error) {
    return getAllErrorsIfAny(req, res, error);
  }
};

// Delete users, send get method to http://localhost:4000/users/delete/userID
const deleteUser = (req, res) => {
  try {
    User.findByIdAndUpdate(
      req.params.id,
      { $set: { softDelete: 1 } },
      { new: true }
    ).then((data, err) => {
      if (err) {
        return getAllErrorsIfAny(req, res, err);
      }
      return res.status(200).send(data);
    });
  } catch (error) {
    return getAllErrorsIfAny(req, res, error);
  }
};

// Update  users, send get method to http://localhost:4000/users/update/userID
const updateUser = (req, res) => {
  try {
    const { error } = userValidate.validate(req.body);
    if (error) {
      return getAllErrorsIfAny(req, res, error);
    }
    User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).then((data, err) => {
      if (err) {
        return getAllErrorsIfAny(req, res, err);
      }
      return res.status(200).send(data);
    });
  } catch (error) {
    return getAllErrorsIfAny(req, res, error);
  }
};

// Adding a new user, send post method to http://localhost:4000/users/addNewUser/
const addUser = (req, res) => {
  try {
    const { error } = userValidate.validate(req.body);
    if (error) {
      return getAllErrorsIfAny(req, res, error);
    }
    var entryOfUser = new User(req.body);
    entryOfUser.save((err, data) => {
      if (err) {
        return getAllErrorsIfAny(req, res, err);
      }
      res.status(200).json({ message: "Entry Successful" });
    });
  } catch (error) {
    return getAllErrorsIfAny(req, res, error);
  }
};

module.exports = { getAllUser, addUser, deleteUser, updateUser };
