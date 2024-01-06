import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { Provider } from 'react-redux';
// import { configureStore } from '@reduxjs/toolkit';
// import { composeWithDevTools } from 'redux-devtools-extension';
// import rootReducer from './redux/reducer';

import Home from "./pages/1_home/Home";
import MyPage from "./pages/3_mypage/MyPage";
import UserProfile from "./pages/4_userprofile/UserProfile";
import Board from "./pages/5_board/Board";
import Nav from "./pages/Nav/Nav";

import SignUp from "./pages/6_signup/SignUp";
import SignIn from "./pages/7_signin/SignIn";
import Write from "./pages/8_write/Write";
import Post from "./pages/9_Post/Post";
import DmPage from "./pages/10_dmpage/DmPage";
import Dm from "./pages/11_dm/dm";

import ShelterBoard from "./pages/12_shelterboard/ShelterBoard";
import CommunityBoard from "./pages/14_communityboard/CommunityBoard";
import MakeCommunity from "./pages/15_makecommunity/MakeCommunity";
import Community from "./pages/16_community/Community";
import CommunityInnerBoard from "./pages/17_communityinnerboard/CommunityInnerBoard";
import CommunityPage from "./pages/17.1_communitypage/CommunityPage";
import CommunityTalk from "./pages/19_communitytalk/CommunityTalk";
import NotFound from "./pages/20_notfound/NotFound";

// const store = configureStore({ reducer: rootReducer }, composeWithDevTools());
function App() {
  return (
    // <Provider store={store}>
    <BrowserRouter>
      <div style={{ display: "flex", maxHeight: "100vh" }}>
        <Nav />
        <main style={{ flexGrow: 1, overflowY: "auto" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/userprofile" element={<UserProfile />} />
            <Route path="/board" element={<Board />} />
            <Route path="/user/signup" element={<SignUp />} />
            <Route path="/user/signin" element={<SignIn />} />
            <Route path="/board/write" element={<Write />} />
            <Route path="/board/:id" element={<Post />} />
            <Route path="/dmpage" element={<DmPage />} />
            <Route path="/dm" element={<Dm />} />
            <Route path="/shelterboard" element={<ShelterBoard />} />
            <Route path="/communityboard" element={<CommunityBoard />} />
            <Route
              path="/communityboard/makecommunity"
              element={<MakeCommunity />}
            />
            <Route path="/communityboard/community" element={<Community />} />
            <Route
              path="/communityboard/community/communityinnerboard"
              element={<CommunityInnerBoard />}
            />
            <Route
              path="/communityboard/community/communityinnerboard/communitypage/:pageNum"
              element={<CommunityPage />}
            />
            <Route
              path="/communityboard/community/CommunityTalk"
              element={<CommunityTalk />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
    // </Provider>
  );
}

export default App;
