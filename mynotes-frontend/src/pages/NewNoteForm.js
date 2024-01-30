import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createNote } from "../features/notes/notesSlice";
import { IoMdCheckmark } from "react-icons/io";
import { MdArrowBackIos, MdOutlineCreate } from "react-icons/md";
import Button from "../components/Button";
import Input from "../components/Input";
import TextArea from "../components/TextArea";

function NewNoteForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const handleTitleChange = (e) => setTitle(e.target.value);

  const [text, setText] = useState("");
  const handleTextChange = (e) => setText(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();

    if (text) {
      const noteData = {
        title: title,
        text: text,
      };

      dispatch(createNote(noteData));
      setTitle("");
      setText("");
      navigate("/");
    }
  };

  return (
    <form className="centered-column-flex-view" onSubmit={onSubmit}>
      <section className="top-container">
        <Input
          componentStyle="input-component input-component--full-size"
          icon={<MdOutlineCreate className="icon icon--left" />}
          onChange={handleTitleChange}
          placeholderStyle={
            title
              ? "placeholder-hidden"
              : "input-placeholder input-placeholder--aligned"
          }
          placeholderText="TITLE"
        />
      </section>

      <section className="content-container content-container--l-size">
        <TextArea
          componentStyle="textarea-component"
          icon={<MdOutlineCreate className="icon icon--left" />}
          onChange={handleTextChange}
          placegolderStyle={
            text
              ? "placeholder-hidden"
              : "input-placeholder input-placeholder--aligned"
          }
          placeholderText="TEXT*"
        />
      </section>

      <section className="bottom-container bottom-container--s-size">
        <Button
          componentStyle="btn btn--left btn--small"
          icon={<MdArrowBackIos className="icon" />}
          onClick={() => navigate("/")}
          lableStyle="btn-orientation-left"
          title="GO BACK"
          type="button"
        />
        <Button
          componentStyle="btn btn--right btn--small"
          icon={<IoMdCheckmark className="icon icon--right" />}
          lableStyle="btn-orientation-right"
          title="PUBLISH"
          type="submit"
        />
      </section>
    </form>
  );
}

export default NewNoteForm;
