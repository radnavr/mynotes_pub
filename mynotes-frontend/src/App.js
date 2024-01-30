import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import NewNoteForm from "./pages/NewNoteForm";
import Auth from "./pages/Auth";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />}></Route>
          <Route path="/login" element={<Auth />}></Route>
          <Route path="/create" element={<NewNoteForm />}></Route>
          <Route path="*" element={<Dashboard />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
