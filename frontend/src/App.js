import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ShelterBoard from "./pages/12_shelterboard/ShelterBoard";
import SignUp from './pages/6_signup/SignUp';
import SignIn from './pages/7_signin/SignIn';
import Home from './pages/home/Home';
import CommunityBoard from "./pages/14_communityboard/CommunityBoard";

import NotFound from './pages/20_notfound/NotFound';


function App() {
  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/signup" element={<SignUp />} />
          <Route path="/user/signin" element={<SignIn />} />
          <Route path="/shelterboard" element={<ShelterBoard />} />
          <Route path="/communityboard" element={<CommunityBoard />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
