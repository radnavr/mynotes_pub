const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const colors = require("colors");
const errorHandler = require("./middleware/errorHandler");
const mongoose = require("mongoose");
const conectDB = require("./config/mongoConection");
const PORT = process.env.PORT || 5000;

conectDB();

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors(corsOptions));
app.use("/api/notes", require("./routes/notesRoutes"));
app.use("/api/users", require("./routes/usersRoutes"));
app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("connected to MongoDB".cyan);
  app.listen(PORT, () => console.log(`server running on port ${PORT}`.cyan));
});
