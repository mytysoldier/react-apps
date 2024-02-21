import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Chatroom from "./pages/chatroom/Chatroom";
import Home from "./pages/home/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chatroom" element={<Chatroom />} />
      </Routes>
    </Router>
  );
}

export default App;
