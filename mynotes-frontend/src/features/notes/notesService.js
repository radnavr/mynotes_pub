import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/api/notes`;

// CREATE NEW NOTE
const createNote = async (noteData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, noteData, config);

  return response.data;
};

// GET USER NOTES
const getNotes = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

// DELETE NOTE
const deleteNote = async (noteId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(`${API_URL}/${noteId}`, config);
  return response.data;
};

const goalService = {
  createNote,
  getNotes,
  deleteNote,
};

export default goalService;
