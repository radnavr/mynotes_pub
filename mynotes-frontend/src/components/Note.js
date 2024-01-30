import React from "react";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { deleteNote } from "../features/notes/notesSlice";
import {
  deleteInfoNote,
  setAuthProcedure,
} from "../features/interface/interfaceSlice";
import Link from "./Link";

function Note({ note }) {
  const dispatch = useDispatch();
  const { registrationNeeded } = useSelector((state) => state.interface);

  const getTimeStamp = (jSTime) => {
    const date = new Date(jSTime).getDate();
    const month = new Date(jSTime).getMonth();
    const year = new Date(jSTime).getFullYear();
    const hour = new Date(jSTime).getHours();
    let minutes = String(new Date(jSTime).getMinutes());

    if (minutes.length === 1) minutes = `0${minutes}`;

    return `${date}.${month + 1}.${year} ${hour}:${minutes}`;
  };

  const getInfoNoteText = (noteData) => {
    if (registrationNeeded && noteData.textAlt) return noteData.textAlt;
    if (registrationNeeded && !noteData.textAlt) return noteData.text;
    if (!registrationNeeded && !noteData.link) return noteData.text;

    return (
      <>
        <>{noteData.text}</>
        <Link
          text={noteData.link}
          onClick={() => dispatch(setAuthProcedure())}
        />
        <>.</>
      </>
    );
  };

  const isInfoNote = (id) => {
    return id.includes("infoNote_");
  };

  return (
    <article className="note" id={note._id}>
      <div className="note-header">
        {note.title || "\0"}
        <MdClose
          className="icon icon--clicking"
          onClick={
            isInfoNote(note._id)
              ? () => dispatch(deleteInfoNote(note._id))
              : () => dispatch(deleteNote(note._id))
          }
        />
      </div>
      <div className="note-content">
        <p>{isInfoNote(note._id) ? getInfoNoteText(note) : note.text}</p>
      </div>
      <div className="note-footer">
        <span className="time-stamp">
          {getTimeStamp(note.date || Date.now())}
        </span>
      </div>
    </article>
  );
}

export default Note;
