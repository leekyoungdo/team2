import styles from "./Community.module.scss";
import React, { useState, useEffect } from "react";
import axios from "axios"; // axios 라이브러리 import

import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Community() {
  const { community_id } = useParams();
  const [communityData, setCommunityData] = useState(null);
  const [memberList, setMemberList] = useState(null);
  const navigator = useNavigate();
  const [isJoined, setIsJoined] = useState(false);
  const { nickname } = useSelector((state) => state.user);
  const [boardList, setBoardList] = useState(null);

  const JoinCommunity = () => {
    if (!memberList.includes(nickname)) {
      setMemberList((memberList) => [...memberList, nickname]);
      setIsJoined(true);

      // 서버로 가입 요청 보내기
      axios

        .post(
          `${process.env.REACT_APP_HOST}/community/joincommunity/${community_id}`,
          {
            withCredentials: true,
          }
        )

        .then((response) => {
          console.log("가입 요청 성공:", response);
        })
        .catch((error) => {
          console.error("가입 요청 실패:", error);
        });
    } else console.log("이미 가입한 모임입니다");
  };

  const LeaveCommunity = () => {
    setMemberList((memberList) =>
      memberList.filter((member) => member !== nickname)
    );
    setIsJoined(false);

    // 서버로 탈퇴 요청 보내기
    axios
      .delete(
        `${process.env.REACT_APP_HOST}/community/leavecommunity/${community_id}`,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log("탈퇴 요청 성공:", response);
      })
      .catch((error) => {
        console.error("탈퇴 요청 실패:", error);
      });
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
  // const community_id = 2; // 실제로는 해당 커뮤니티를 조회하기 위한 고유 id값을 사용해야 합니다.

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

    axios
      .get(
        `${process.env.REACT_APP_HOST}/board/getboardcategory/모임_${community_id}_자유`
      )
      .then((res) => {
        if (res.data.posts.length > 0) {
          console.log(res.data.posts);
          setBoardList(res.data.posts);
        } else {
          // 글이 없는 경우에 대한 처리
        }
      })
      .catch((error) => {
        console.error(
          "게시판 데이터를 불러오는 API 호출에 실패하였습니다:",
          error
        );
      });
  }, [community_id]);

  if (!communityData || !memberList) return <div>Loading...</div>;

  // 커뮤니티 데이터가 로드되지 않았다면 로딩 중임을 표시
  if (!communityData) return <div>Loading...</div>;

  //////////////

  return (
    <>
      <div className={styles.bg}>
        <div className={styles.bg2}>
          {[communityData].map((group, index) => (
            <div key={index}>
              <div className={styles.head}>
                <h1 className={styles.c_main_groupName}>
                  👨‍👩‍👧‍👦 {group.community_local} {group.community_name}
                </h1>
                <div className={styles.buttonHold}>
                  {isJoined && (
                    <div className={styles.button_opentalk}>오픈톡방 입장</div>
                  )}
                </div>
              </div>
            </div>
          ))}

          <div className={styles.container}>
            {[communityData].map(
              (
                group,
                index // 변경된 부분
              ) => (
                <>
                  <div key={index}></div>

                  <div className={styles.headSection}>
                    <div className={styles.section}>
                      <h1 className={styles.caption}>소개</h1>
                      <div className={styles.detail}>{group.introduce}</div>
                    </div>

                    <div className={styles.section}>
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
                                <div>{member.nickname}</div>
                                <img src={member.image} alt={member.nickname} />
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
                          <div>{member.nickname}</div>
                          <img src={member.image} alt={member.nickname} />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={`${styles.section} ${styles.flex}`}>
                    <div className={`${styles.boardSection}`}>
                      <h1 className={styles.caption}>게시판</h1>
                      <div
                        className={styles.button_board}
                        onClick={() =>
                          navigator(
                            `/communityboard/community/${group.community_id}/communityinnerboard`
                          )
                        }
                      >
                        게시판 더보기
                      </div>
                    </div>

                    {boardList &&
                      boardList.slice(0, 4).map((post, index) => (
                        <div
                          key={index}
                          className={styles.board}
                          onClick={() =>
                            navigator(
                              `/communityboard/community/${
                                group.community_id
                              }/communityinnerboard/communityPage/${index + 1}`
                            )
                          }
                        >
                          <h4>{post.title}</h4>
                          <p>{post.user_id}</p>
                          <p>{post.content}</p>
                        </div>
                      ))}
                  </div>
                  <div className={styles.bottom}>
                    <div
                      className={styles.button_join}
                      onClick={isJoined ? LeaveCommunity : JoinCommunity}
                      style={{
                        color: isJoined ? "white" : "", // 가입 상태에 따라 글씨 색상 변경
                        border: "2px solid #000000",
                        height: "65px",
                        width: "calc(18%)",
                        borderRadius: "35px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "bold",
                        boxShadow: isJoined ? "" : "1.5px 2px 0px #000000",
                        backgroundColor: isJoined ? "grey" : "#f5ba3f",
                        fontSize: isJoined ? "20px" : "20px", // 가입 상태에 따라 글씨 크기 변경
                      }}
                    >
                      {isJoined ? "탈퇴하기" : "가입하기"}
                    </div>
                  </div>
                </>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
}
