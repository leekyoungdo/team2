import styles from "./MyPage.module.scss";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function MyPage() {
  const [showWriteTable, setShowWriteTable] = useState(true);
  const [userInfo, setUserInfo] = useState({});
  const [userBoard, setUserBoard] = useState({});
  const [userChat, setUserChat] = useState({});
  const { nickname } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const getUserProfile = () => {
    axios
      .get(`${process.env.REACT_APP_HOST}/user/userprofile/${nickname}`)
      .then((res) => {
        setUserInfo(res.data);
      });
  };

  const getUserBoard = () => {
    axios
      .get(`${process.env.REACT_APP_HOST}/board/userboardlist`, {
        withCredentials: true,
      })
      .then((res) => {
        setUserBoard(res.data);
      });
  };

  const getUserChat = () => {
    axios
      .get(`${process.env.REACT_APP_HOST}/chat/getchatroom`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("chat", res.data);

        // chat_name은 그대로 두고, chat_title을 추가하여 상태를 업데이트합니다.
        const modifiedChats = res.data.map((chat) => {
          const chat_title = chat.chat_name.split("&")[1];
          return {
            chat_id: chat.chat_id,
            chat_name: chat.chat_name,
            chat_title: chat_title,
            chat_time: chat.chat_time,
            chat_category: chat.chat_category,
          };
        });

        setUserChat(modifiedChats);
      });
  };

  useEffect(() => {
    getUserProfile();
    getUserBoard();
    getUserChat();
  }, []);

  return (
    <>
      <div className={styles.mypageContainer}>
        <p className={styles.header}>마이페이지</p>
        <div className={styles.divisionLine}></div>

        <div className={styles.topBox}>
          <div className={styles.infoBox}>
            <div className={styles.picture}>
              <img
                src={`${process.env.REACT_APP_HOST}${
                  userInfo && userInfo.image
                }`}
                alt="프로필 사진"
              />
            </div>

            <div className={styles.info}>
              <p className={styles.nickname}>{userInfo && userInfo.nickname}</p>
              <p className={styles.introduction}>
                {userInfo && userInfo.dog_name}
              </p>
              <p className={styles.introduction}>
                {userInfo && userInfo.dog_intro}
              </p>
              <button className={styles.editButton}>정보수정</button>
            </div>
          </div>

          <div className={styles.comContainer}>
            <p className={styles.comP}>참여소모임</p>
            <table className={styles.comlistTable}>
              <tbody>
                <tr>
                  <td>
                    <div className={styles.comPicture}>
                      <img src="모임 URL" alt="모임 사진" />
                    </div>
                  </td>
                  <td>부산 플레이데이트</td>
                </tr>
                <tr>
                  <td>
                    <div className={styles.comPicture}>
                      <img src="모임 URL" alt="모임 사진" />
                    </div>
                  </td>
                  <td>포실포실 대전</td>
                </tr>
                <tr>
                  <td>
                    <div className={styles.comPicture}>
                      <img src="모임 URL" alt="모임 사진" />
                    </div>
                  </td>
                  <td>스파니얼 러버스</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <br />

        <div className={styles.boardTableContainer}>
          <button
            className={styles.tableTab}
            onClick={() => setShowWriteTable(true)}
          >
            작성 글
          </button>
          <button
            className={styles.tableTab}
            onClick={() => setShowWriteTable(false)}
          >
            작성 댓글
          </button>

          {showWriteTable ? (
            <table className={styles.boardTable}>
              <thead>
                <tr>
                  <th>게시판</th>
                  <th>제목</th>
                  <th>조회수</th>
                  <th>날짜</th>
                </tr>
              </thead>

              <tbody>
                {userBoard.length > 0 &&
                  userBoard.map((value) => (
                    <tr
                      key={value.board_id}
                      onClick={() => navigate(`/board/${value.board_id}`)}
                    >
                      <td>{value.category}</td>
                      <td>{value.title}</td>
                      <td>{value.viewcount}</td>
                      <td>{value.makeboard}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          ) : (
            <table className={styles.commentTable}>
              <thead>
                <tr>
                  <th>게시판</th>
                  <th>제목</th>
                  <th>댓글</th>
                  <th>날짜</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>일상</td>
                  <td>행복한 저녁 시간~</td>
                  <td>맛있겠다~~</td>
                  <td>2024-01-05</td>
                </tr>
                <tr>
                  <td>자유</td>
                  <td>이럴 때는 어쩌죠?</td>
                  <td>저도 그런 경험이....</td>
                  <td>2024-01-05</td>
                </tr>
                <tr>
                  <td>일상</td>
                  <td>꼬까옷 입고 폴짝!</td>
                  <td>너무 이뻐요~~</td>
                  <td>2024-01-05</td>
                </tr>
              </tbody>
            </table>
          )}
        </div>

        <br />

        <div className={styles.dmListContainer}>
          <p className={styles.dmP}>쪽지함</p>
          <table className={styles.dmlistTable}>
            <tbody>
              {userChat.length > 0 &&
                userChat.map((value) => (
                  <tr
                    key={value.chat_id}
                    onClick={() => navigate(`/dm/${value.chat_name}`)}
                  >
                    {/* <td>
                      <div className={styles.dmPicture}>
                        <img src="프로필 사진 URL" alt="프로필 사진" />
                      </div>
                    </td> */}
                    <td>✉️</td>
                    <td>{value.chat_title}</td>
                    <td></td>
                    <td>{value.chat_time}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <br />
      </div>
    </>
  );
}
