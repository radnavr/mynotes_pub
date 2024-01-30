import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import interfaceReducer from "../features/interface/interfaceSlice";
import notesReducer from "../features/notes/notesSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    interface: interfaceReducer,
    notes: notesReducer,
  },
});
