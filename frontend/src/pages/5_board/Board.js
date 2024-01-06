import styles from "./Board.module.scss";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

export default function Board() {
  const [allboardList, setAllBoardList] = useState([]);

  const getBoard = () => {
    axios
      .get(`${process.env.REACT_APP_HOST}/board/getallboard`, {
        withCredentials: true,
      })
      .then((res) => {
        setAllBoardList(res.data.posts);
      });
  };

  useEffect(() => {
    getBoard();
  }, []);

  const sampleData2 = [
    {
      board_id: 2,
      user_id: "flrudeh",
      category: "일상",
      title: "제목 수정중입니다.",
      content: "수정 됬나요 ?!",
      image: null,
      makeboard: "2023-12-28",
      viewcount: 0,
    },
    {
      board_id: 1,
      user_id: "flrudeh",
      category: "자유",
      title: "첫글",
      content: "안녕",
      image: null,
      makeboard: "2023-12-28",
      viewcount: 3,
    },
    {
      board_id: 1,
      user_id: "flrudeh",
      category: "질문",
      title: "첫글",
      content: "안녕",
      image: null,
      makeboard: "2023-12-28",
      viewcount: 3,
    },
    {
      board_id: 2,
      user_id: "flrudeh",
      category: "실종/포착",
      title: "제목 수정중입니다.",
      content: "수정 됬나요 ?!",
      image: null,
      makeboard: "2023-12-28",
      viewcount: 0,
    },
    {
      board_id: 2,
      user_id: "flrudeh",
      category: "일상",
      title: "제목 수정중입니다.",
      content: "수정 됬나요 ?!",
      image: null,
      makeboard: "2023-12-28",
      viewcount: 0,
    },
    {
      board_id: 1,
      user_id: "flrudeh",
      category: "자유",
      title: "첫글",
      content: "안녕",
      image: null,
      makeboard: "2023-12-28",
      viewcount: 3,
    },
  ];

  return (
    <>
      <div className={styles.bgHome}>
        <div className={styles.container}>
          <div className={styles.signinBtn}>로그인</div>
          <div className={styles.logo}>멍멍투게더</div>

          <div className={styles.category}>
            <div>
              <p>전체</p>
            </div>
            <div>
              <p>일상</p>
            </div>
            <div>
              <p>질문</p>
            </div>
            <div>
              <p>실종/포착</p>
            </div>
          </div>

          <div className={styles.contents}>
            <div className={styles.box}>
              {sampleData2.map((data, index) => (
                <div className={styles.bar} key={index}>
                  <p>{data.category}</p>
                  <p>작성자: {data.user_id}</p>
                  <p>제목: {data.title}</p>
                  <p>내용: {data.content}</p>
                  <p>{data.image}</p>
                  <p>{data.makeboard}</p>
                  <p>{data.viewcount}</p>
                </div>
              ))}
              {/* {allboardList.map((value) => (
                <div className={styles.bar} key={value.board_id}>
                  <p>{value.category}</p>
                  <p>작성자: {value.user_id}</p>
                  <p>제목: {value.title}</p>
                  <p>내용: {value.content}</p>
                  <p>{value.image}</p>
                  <p>{value.makeboard}</p>
                  <p>{value.viewcount}</p>
                </div>
              ))} */}
            </div>
          </div>

          <a href="/board/write">
            <div className={styles.writeButton}>글쓰기</div>
          </a>
        </div>
      </div>
    </>
  );
}
