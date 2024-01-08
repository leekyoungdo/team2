import styles from "./UserProfile.module.scss";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

export default function UserProfile() {
  const [userInfo, setUserInfo] = useState({});
  const { nickname } = useParams();
  const navigator = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.user);

  const getUserProfile = () => {
    axios
      .get(`${process.env.REACT_APP_HOST}/user/userprofile/${nickname}`)
      .then((res) => {
        setUserInfo(res.data);
      });
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  const handleDmClick = () => {
    if (isLoggedIn) navigator(`/dm/${nickname}`);
    else {
      alert("로그인이 필요한 서비스입니다.");
      navigator("/user/signin");
    }
  };

  return (
    <>
      <div className={styles.profileContainer}>
        <h2 className={styles.header}>프로필</h2>

        <div className={styles.picture}>
          <img
            src={`${process.env.REACT_APP_HOST}${userInfo && userInfo.image}`}
            alt="프로필 사진"
          />
        </div>

        <div className={styles.info}>
          <p className={styles.nickname}>{userInfo && userInfo.nickname}</p>
          <p className={styles.introduction}>{userInfo && userInfo.dog_name}</p>
          <p className={styles.introduction}>
            {userInfo && userInfo.dog_intro}
          </p>
          <button className={styles.messageButton} onClick={handleDmClick}>
            쪽지 보내기
          </button>
        </div>

        <table className={styles.boardTable}>
          <thead>
            <tr>
              <th>게시판</th>
              <th>제목</th>
              <th>날짜</th>
              <th>조회수</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>일상</td>
              <td>행복한 저녁 시간~</td>
              <td>2024-01-05</td>
              <td>100</td>
            </tr>
            <tr>
              <td>자유</td>
              <td>이럴 때는 어쩌죠?</td>
              <td>2024-01-05</td>
              <td>100</td>
            </tr>
            <tr>
              <td>일상</td>
              <td>꼬까옷 입고 폴짝!</td>
              <td>2024-01-05</td>
              <td>100</td>
            </tr>
          </tbody>
        </table>

        <br />

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
      </div>
    </>
  );
}
