import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetAuthState } from "../features/auth/authSlice";
import { addInfoNote } from "../features/interface/interfaceSlice";
import Loader from "../components/Loader";
import LoginForm from "../components/LoginForm";
import Logo from "../components/Logo";
import NoteList from "../components/NoteList";
import RegistrationForm from "../components/RegistrationForm";

function Auth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isAuthLoading, isAuthError, isAuthSuccess, authMessage } =
    useSelector((state) => state.auth);

  const { infoNotes, registrationNeeded } = useSelector(
    (state) => state.interface
  );

  useEffect(() => {
    if (isAuthError) {
      dispatch(addInfoNote(authMessage));
    }

    if (isAuthSuccess || user) {
      navigate("/");
    }

    dispatch(resetAuthState());
  }, [authMessage, isAuthError, isAuthSuccess, user, dispatch, navigate]); //Q: why eslint wants notesMessage, navigate & dispatch in DA?

  const getAuthContentContainerStyle = () => {
    if (registrationNeeded && isAuthLoading)
      return "content-container content-container--s-size content-container--centering";

    if (registrationNeeded)
      return "content-container content-container--s-size";

    if (isAuthLoading)
      return "content-container content-container--m-size content-container--centering";

    return "content-container content-container--m-size";
  };

  return (
    <main className="centered-column-flex-view">
      <section className="top-container">
        <Logo />
      </section>

      <section className={getAuthContentContainerStyle()}>
        {isAuthLoading || user ? ( //Q: is navigate() "too slow"?
          <Loader />
        ) : (
          <NoteList notes={infoNotes} />
        )}
      </section>

      <section
        className={
          registrationNeeded
            ? "bottom-container bottom-container--l-size"
            : "bottom-container bottom-container--m-size"
        }
      >
        {registrationNeeded ? <RegistrationForm /> : <LoginForm />}
      </section>
    </main>
  );
}

export default Auth;
