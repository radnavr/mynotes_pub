const asyncHandler = require("express-async-handler");
const Note = require("../models/Note");
const User = require("../models/User");

// READ
const getNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find({ user: req.user.id });
  res.status(200).json(notes);
});

// CREATE
const createNote = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("text missing");
  }

  const newNote = await Note.create({
    user: req.user.id,
    text: req.body.text,
    title: req.body.title,
    date: Date.now(),
  });

  res.status(201).json(newNote);
});

// UPDATE
/*const updateNote = asyncHandler(async (req, res) => {
  const targetNote = await Note.findById(req.params.id);

  if (!targetNote) {
    res.status(400);
    throw new Error("note not foud");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("can't authorize, user not found");
  }

  if (targetNote.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("user not authorized");
  }

  const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(201).json(updatedNote);
});*/

// DELETE
const deleteNote = asyncHandler(async (req, res) => {
  const targetNote = await Note.findById(req.params.id);

  if (!targetNote) {
    res.status(400);
    throw new Error("note not foud");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("can't authorize, user not found");
  }

  if (targetNote.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("user not authorized");
  }

  await Note.findByIdAndDelete(req.params.id);

  res.status(200).json({ id: req.params.id });
});

module.exports = { getNotes, createNote, /*updateNote,*/ deleteNote };
