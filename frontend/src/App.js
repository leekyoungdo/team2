import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Shelter from './pages/shelter/Shelter';
import SignUp from './pages/6_signup/SignUp';
import SignIn from './pages/7_signin/SignIn';
import Home from './pages/home/Home';
import Board from './components/pages/board/Board';

import NotFound from './pages/20_notfound/NotFound';

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

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
