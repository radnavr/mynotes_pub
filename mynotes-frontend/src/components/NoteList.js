import React from "react";
import { useMediaQuery } from "react-responsive";
import Note from "./Note";

function NoteList({ notes }) {
  const oneColumn = useMediaQuery({ maxWidth: 599 });
  const twoColumns = useMediaQuery({ minWidth: 600, maxWidth: 960 });
  const threeColumns = useMediaQuery({ minWidth: 961, maxWidth: 1440 });
  const fourColumns = useMediaQuery({ minWidth: 1441, maxWidth: 1920 });
  const fiveColumns = useMediaQuery({ minWidth: 1921 });

  const getAppropriateIndexes = (totalColumns, startingIndex) => {
    let listOfIndexes = [];
    for (let i = startingIndex; i < notes.length; i += totalColumns) {
      listOfIndexes.push(i);
    }
    return listOfIndexes;
  };

  const populateColumn = (totalColumns, startingIndex) => {
    return notes
      ?.filter((note) =>
        getAppropriateIndexes(totalColumns, startingIndex).includes(
          notes.indexOf(note)
        )
      )
      ?.map((note) => <Note key={note._id} note={note} />);
  };

  return (
    <div className="note-list-container">
      {oneColumn && (
        <div className="note-list-column note-list-column--width-1">
          {populateColumn(1, 0)}
        </div>
      )}
      {twoColumns && (
        <>
          <div className="note-list-column note-list-column--width-2">
            {populateColumn(2, 0)}
          </div>
          <div className="note-list-column note-list-column--width-2">
            {populateColumn(2, 1)}
          </div>
        </>
      )}
      {threeColumns && (
        <>
          <div className="note-list-column note-list-column--width-3">
            {populateColumn(3, 0)}
          </div>
          <div className="note-list-column note-list-column--width-3">
            {populateColumn(3, 1)}
          </div>
          <div className="note-list-column note-list-column--width-3">
            {populateColumn(3, 2)}
          </div>
        </>
      )}
      {fourColumns && (
        <>
          <div className="note-list-column note-list-column--width-4">
            {populateColumn(4, 0)}
          </div>
          <div className="note-list-column note-list-column--width-4">
            {populateColumn(4, 1)}
          </div>
          <div className="note-list-column note-list-column--width-4">
            {populateColumn(4, 2)}
          </div>
          <div className="note-list-column note-list-column--width-4">
            {populateColumn(4, 3)}
          </div>
        </>
      )}
      {fiveColumns && (
        <>
          <div className="note-list-column note-list-column--width-5">
            {populateColumn(5, 0)}
          </div>
          <div className="note-list-column note-list-column--width-5">
            {populateColumn(5, 1)}
          </div>
          <div className="note-list-column note-list-column--width-5">
            {populateColumn(5, 2)}
          </div>
          <div className="note-list-column note-list-column--width-5">
            {populateColumn(5, 3)}
          </div>
          <div className="note-list-column note-list-column--width-5">
            {populateColumn(5, 4)}
          </div>
        </>
      )}
    </div>
  );
}

export default NoteList;
