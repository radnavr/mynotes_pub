const express = require("express");
const router = express.Router();
const {
  getNotes,
  createNote,
  //updateNote,
  deleteNote,
} = require("../controllers/notesController");
const authHandler = require("../middleware/authHandler");

router.route("/").get(authHandler, getNotes).post(authHandler, createNote);
router
  .route("/:id")
  //.put(authHandler, updateNote)
  .delete(authHandler, deleteNote);

module.exports = router;
