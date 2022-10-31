const {
  getAllUser,
  deleteUser,
  updateUser,
  addUser,
} = require("../controllers/userApiController");

const userApiRoutes = (app) => {
  app.route("/users").get(getAllUser);
  app.route("/users/:id").delete(deleteUser).patch(updateUser);
  app.route("/users/addNewUser").post(addUser);
};

module.exports = { userApiRoutes };
