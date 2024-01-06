import styles from "./Community.module.scss";
import React, { useState, useEffect } from "react";
import axios from "axios"; // axios 라이브러리 import
import commupic from "./commupic.png";
import AxiosMockAdapter from "axios-mock-adapter";

export default function Community() {
  const [communityData, setCommunityData] = useState(null);
  const [memberList, setMemberList] = useState(null);

  //가짜 api
  // axios 인스턴스 생성
  const axios_fake = axios.create();

  // axios-mock-adapter 인스턴스 생성
  const mock = new AxiosMockAdapter(axios_fake);

  // /user/signin 요청을 가로채서 가짜 응답을 반환
  mock.onPost("/user/signin").reply(200, {
    user_id: "로그인한 유저testUser",
    // ... 기타 필요한 필드들
  });

  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const [isJoined, setIsJoined] = useState(false);

  const exampleDogGroups = [
    {
      region: "부산 해운대구",
      groupName: "부산 플레이데이트",
      groupIntro:
        "푸들 사랑하는 해운대구의 강아지 친구들을 모아요. 우리 같이 놀아봐요!",
      groupNum: 57,
    },
  ];

  const JoinCommunity = () => {
    // 엑스오스 테스트 (_fake)
    axios_fake
      .post("/user/signin")
      .then((response) => {
        // 수정: 로그인한 유저의 아이디를 저장
        setLoggedInUserId(response.data.user_id);

        if (!memberList.includes(response.data.user_id)) {
          setMemberList((memberList) => [...memberList, response.data.user_id]); // 수정된 부분
          setIsJoined(true);
        } else console.log("이미 가입한 모임입니다");
      })
      .catch((error) => {
        console.error("로그인 API 호출 실패:", error);
      });
  };

  const LeaveCommunity = () => {
    setMemberList(
      (memberList) => memberList.filter((member) => member !== loggedInUserId) // 수정: 로그인한 유저를 제외한 멤버만 남김
    );
    setIsJoined(false);
  };

  useEffect(() => {
    console.log({ memberList });
  }, [memberList]);

  const boardlist = [
    { title: "테스트게시글1", writer: "강아지사랑" },
    { title: "테스트게시글2", writer: "강아지사랑" },
    { title: "테스트게시글3", writer: "강아지사랑" },
    { title: "테스트게시글4", writer: "강아지사랑" },
    { title: "테스트게시글5", writer: "강아지사랑" },
  ];

  const [isMemberModalOpen, setMemberModalOpen] = useState(false);
  const [isBoardModalOpen, setBoardModalOpen] = useState(false);
  const community_id = 2; // 실제로는 해당 커뮤니티를 조회하기 위한 고유 id값을 사용해야 합니다.

  useEffect(() => {
    // 커뮤니티 데이터 조회
    axios
      .get(
        `${process.env.REACT_APP_HOST}/community/getcommunity/${community_id}`
      )
      .then((response) => {
        if (response.data.result) {
          setCommunityData(response.data.data);
        } else {
          console.error("커뮤니티 데이터를 불러오는데 실패하였습니다.");
        }
      })
      .catch((error) => {
        console.error(
          "커뮤니티 데이터를 불러오는 API 호출에 실패하였습니다:",
          error
        );
      });

    axios
      .get(
        `${process.env.REACT_APP_HOST}/community/getcommunitymembers/${community_id}`
      )
      .then((response) => {
        if (response.data.result) {
          setMemberList(response.data.data);
        } else {
          console.error("커뮤니티 멤버 데이터를 불러오는데 실패하였습니다.");
        }
      })
      .catch((error) => {
        console.error(
          "커뮤니티 멤버 데이터를 불러오는 API 호출에 실패하였습니다:",
          error
        );
      });
  }, []);

  if (!communityData || !memberList) return <div>Loading...</div>;

  // 커뮤니티 데이터가 로드되지 않았다면 로딩 중임을 표시
  if (!communityData) return <div>Loading...</div>;

  //////////////

  return (
    <>
      <div className={styles.container}>
        {[communityData].map(
          (
            group,
            index // 변경된 부분
          ) => (
            <div key={index}>
              <div className={styles.c_main_img}>
                <h3 className={styles.c_main_region}>
                  {group.community_local}
                </h3>
                <img
                  className={styles.CommuPic}
                  src={commupic}
                  alt="모임사진"
                  title="모임 프로필"
                />
                <h1 className={styles.c_main_groupName}>
                  👨‍👩‍👧‍👦 {group.community_name}
                </h1>
              </div>

              {isJoined && (
                <div className={styles.button_opentalk}>오픈톡 버튼</div>
              )}

              <h1 className={styles.caption}>소개</h1>
              <div className={styles.detail}>{group.introduce}</div>

              <h1 className={styles.caption}>멤버 목록</h1>
              <div
                className={styles.button_member}
                onClick={() => setMemberModalOpen(true)}
              >
                멤버목록 더보기
              </div>
              {isMemberModalOpen && (
                <div className={styles.modal}>
                  <div className={styles.modal_content}>
                    <h2>멤버 목록</h2>
                    {memberList.map((member, index) => (
                      <div key={index} className={styles.member}>
                        {member}
                      </div>
                    ))}
                    <button
                      className={styles.close}
                      onClick={() => setMemberModalOpen(false)}
                    >
                      닫기
                    </button>
                  </div>
                </div>
              )}

              {memberList.slice(0, 3).map((member, index) => (
                <div key={index} className={styles.member}>
                  {member}
                </div>
              ))}

              <h1 className={styles.caption}>게시판</h1>

              <div
                className={styles.button_board}
                onClick={() => setBoardModalOpen(true)}
              >
                게시판 더보기
              </div>
              {isBoardModalOpen && (
                <div className={styles.modal}>
                  <div className={styles.modal_content}>
                    <h2>게시판</h2>
                    {boardlist.map((board, index) => (
                      <div key={index} className={styles.board}>
                        <h3>{board.title}</h3>
                        <p>{board.writer}</p>
                      </div>
                    ))}
                    <button
                      className={styles.close}
                      onClick={() => setBoardModalOpen(false)}
                    >
                      닫기
                    </button>
                  </div>
                </div>
              )}

              {boardlist.slice(0, 3).map((board, index) => (
                <div key={index} className={styles.board}>
                  <h4>{board.title}</h4>
                  <p>{board.writer}</p>
                </div>
              ))}

              <div
                className={styles.button_join}
                onClick={isJoined ? LeaveCommunity : JoinCommunity}
                style={{
                  color: isJoined ? "red" : "", // 가입 상태에 따라 글씨 색상 변경
                  fontSize: isJoined ? "10px" : "10px", // 가입 상태에 따라 글씨 크기 변경
                }}
              >
                {isJoined ? "모임탈퇴 버튼" : "모임가입 버튼"}
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
}
