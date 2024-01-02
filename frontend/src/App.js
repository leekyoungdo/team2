import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ShelterBoard from "./pages/12_shelterboard/ShelterBoard";
import SignUp from "./pages/6_signup/SignUp";
import SignIn from "./pages/7_signin/SignIn";
import Home from "./pages/home/Home";
import CommunityBoard from "./pages/14_communityboard/CommunityBoard";
import MakeCommunity from "./pages/15_makecommunity/MakeCommunity";
import Community from "./pages/16_community/Community";
import CommunityInnerBoard from "./pages/17_communityinnerboard/CommunityInnerBoard";
import CommunityPage from "./pages/17.1_communitypage/CommunityPage";
import CommunityTalk from "./pages/19_communitytalk/CommunityTalk";

import NotFound from "./pages/20_notfound/NotFound";

function App() {
  const getData = async () => {
    // npm start 명령어로 실행 시
    console.log("HOST:", process.env.REACT_APP_HOST); // http://localhost:8000
    console.log("TEST:", process.env.REACT_APP_ENV_TEST); // develop
    // # npm run build > # serve -s build 명령어로 실행 시 아래와 같이 출력됨.
    // http://000.000.000.000:8000
    // prod

    // [API 요청 예시에 적용]
    // const response = await fetch(`${process.env.REACT_APP_HOST}/api/get`)
    // const data = await response.json()
  };
  // useEffect(() => {
  //   getData();
  // }, []);

  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/signup" element={<SignUp />} />
          <Route path="/user/signin" element={<SignIn />} />
          {/* <Route path="/board/boardsubmit" element={<Write />} />
          <Route path="/board/getboardId/board_id" element={<Page />} />
          <Route path="/dmpage" element={<DmPage />} />
          <Route path="/dm" element={<Dm />} /> */}
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
            path="/communityboard/community/communityinnerboard/communitypage"
            element={<CommunityPage />}
          />
          <Route
            path="/communityboard/community/CommunityTalk"
            element={<CommunityTalk />}
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
