import { createSlice, nanoid } from "@reduxjs/toolkit";
import mockNotes from "../../mockNotes.json";

const initialState = {
  infoNotes: [...mockNotes],
  registrationNeeded: false,
};

const getErrorNote = (errorMessage) => {
  return { _id: `infoNote_${nanoid()}`, title: "ERROR", text: errorMessage };
};

export const interfaceSlice = createSlice({
  name: "interface",
  initialState,
  reducers: {
    addInfoNote: (state, action) => {
      state.infoNotes.push(getErrorNote(action.payload));
    },
    deleteInfoNote: (state, action) => {
      state.infoNotes = state.infoNotes.filter(
        (infoNote) => infoNote._id !== action.payload
      );
    },
    resetInterfaceState: (state) => initialState,
    setAuthProcedure: (state) => {
      state.registrationNeeded = !state.registrationNeeded;
    },
  },
});

export const {
  addInfoNote,
  deleteInfoNote,
  resetInterfaceState,
  setAuthProcedure,
} = interfaceSlice.actions;

export default interfaceSlice.reducer;
