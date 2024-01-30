import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import notesService from "./notesService";

const initialState = {
  notes: [],
  isNotesError: false,
  isNotesSuccess: false,
  isNotesLoading: false,
  notesMessage: "",
  searchPhrase: "",
};

// CREATE NEW NOTE
export const createNote = createAsyncThunk(
  "notes/create",
  async (noteData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await notesService.createNote(noteData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// DELETE NOTE
export const deleteNote = createAsyncThunk(
  "notes/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await notesService.deleteNote(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// GET USER NOTES
export const getNotes = createAsyncThunk(
  "notes/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await notesService.getNotes(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    resetNotesState: (state) => initialState,
    searchFor: (state, action) => {
      state.searchPhrase = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNote.pending, (state) => {
        state.isNotesLoading = true;
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.isNotesLoading = false;
        state.isNotesSuccess = true;
        state.notes.push(action.payload);
      })
      .addCase(createNote.rejected, (state, action) => {
        state.isNotesLoading = false;
        state.isNotesError = true;
        state.notesMessage = action.payload;
      })
      .addCase(getNotes.pending, (state) => {
        state.isNotesLoading = true;
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        state.isNotesLoading = false;
        state.isNotesSuccess = true;
        state.notes = action.payload
          .reverse()
          .filter(
            (note) =>
              note.text
                .toLowerCase()
                .includes(state.searchPhrase.toLowerCase()) ||
              note.title
                .toLowerCase()
                .includes(state.searchPhrase.toLowerCase())
          );
      })
      .addCase(getNotes.rejected, (state, action) => {
        state.isNotesLoading = false;
        state.isNotesError = true;
        state.notesMessage = action.payload;
      })
      .addCase(deleteNote.pending, (state) => {
        state.isNotesLoading = true;
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.isNotesLoading = false;
        state.isNotesSuccess = true;
        state.notes = state.notes.filter(
          (note) => note._id !== action.payload.id
        );
      })
      .addCase(deleteNote.rejected, (state, action) => {
        state.isNotesLoading = false;
        state.isNotesError = true;
        state.notesMessage = action.payload;
      });
  },
});

export const { resetNotesState, searchFor } = notesSlice.actions;
export default notesSlice.reducer;
