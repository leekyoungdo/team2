import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shelter from "./pages/shelter/Shelter";
import SignUp from "./pages/signup/SignUp";
import SignIn from "./pages/signin/SignIn";
import Home from "./pages/home/Home";
import Board from "./pages/board/Board";

function App() {
  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/signup" element={<SignUp />} />
          <Route path="/user/signin" element={<SignIn />} />
          <Route path="/shelter" element={<Shelter />} />
          <Route path="/board" element={<Board />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
