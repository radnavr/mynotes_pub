import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { IoMdSearch } from "react-icons/io";
import { MdAdd, MdLogout } from "react-icons/md";
import { logout } from "../features/auth/authSlice";
import {
  getNotes,
  resetNotesState,
  searchFor,
} from "../features/notes/notesSlice";
import { resetInterfaceState } from "../features/interface/interfaceSlice";
import Button from "../components/Button";
import Input from "../components/Input";
import Loader from "../components/Loader";
import Logo from "../components/Logo";
import NoteList from "../components/NoteList";

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { notes, isNotesError, isNotesLoading, notesMessage, searchPhrase } =
    useSelector((state) => state.notes);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (isNotesError) {
      console.log(notesMessage);
      return;
    }

    dispatch(getNotes());
  }, [user, isNotesError, notesMessage, searchPhrase, navigate, dispatch]); // Q: why eslint wants notesMessage, navigate & dispatch in DA?

  const handleLogout = () => {
    dispatch(logout());
    dispatch(resetNotesState());
    dispatch(resetInterfaceState());
    navigate("/");
  };

  const getPlaceholderStyle = (state) => {
    if (state) return "placeholder-hidden";
    return "input-placeholder input-placeholder--aligned";
  };

  return (
    <main className="centered-column-flex-view">
      <section className="top-container">
        <Logo />
        <Button
          componentStyle="btn  btn--right btn--small"
          icon={<MdLogout className="icon icon--right" />}
          onClick={handleLogout}
          lableStyle="btn-orientation-right"
          title="LOGOUT"
          type="button"
        />
      </section>

      <section className="content-container content-container--l-size">
        {isNotesLoading ? <Loader /> : <NoteList notes={notes} />}
      </section>

      <section className="bottom-container bottom-container--s-size ">
        <Input
          componentStyle="input-component input-component--small input-component--left"
          icon={<IoMdSearch className="icon icon--left" />}
          onChange={(e) => {
            dispatch(searchFor(e.target.value));
          }}
          placeholderStyle={getPlaceholderStyle(searchPhrase)}
          placeholderText="SEARCH"
          type="text"
        />
        <Button
          componentStyle="btn btn--right btn--small"
          icon={<MdAdd className="icon icon--right" />}
          onClick={() => navigate("/create")}
          lableStyle="btn-orientation-right"
          title="CREATE"
          type="button"
        />
      </section>
    </main>
  );
}

export default Dashboard;
