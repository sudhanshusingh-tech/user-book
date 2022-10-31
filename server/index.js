const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const { userApiRoutes } = require("./routes/userApiRoutes");
const app = express();
const URL =
  "mongodb+srv://sudhanshu:sudhanshu@sudhanshucluster.zwhmm.mongodb.net/practicalDB?retryWrites=true&w=majority";
mongoose
  .connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });
const PORT = process.env.PORT || 4000;
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
userApiRoutes(app);

app.listen(PORT, () => {
  console.log(`Application is running on PORT: ${PORT}`);
});
