import styles from "./Board.module.scss";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Board() {
  const [allboardList, setAllBoardList] = useState([]);

  // const getBoard = () => {
  //   axios
  //     .get(`${process.env.REACT_APP_HOST}/board/getallboard`, {
  //       withCredentials: true,
  //     })
  //     .then((res) => {
  //       setAllBoardList(res.data.posts);
  //     });
  // };

  // useEffect(() => {
  //   getBoard();
  // }, []);

  const detailBoard = () => {};

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
      <div className={styles.bg}>
        <div className={styles.container}>

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
            {sampleData2.map((data, index) => (
            <div className={styles.box}>
              <div className={styles.bar} key={index}>
                <p className={styles.category_contents} >{data.category}</p>
                <p className={styles.title} >{data.title}</p>
                <p className={styles.content} >{data.content}</p>
                <p className={styles.user_id} >{data.user_id}</p>
                <p className={styles.image} >{data.image}</p>
                <p className={styles.makeboard} >{data.makeboard}</p>
                <p className={styles.viewcount} >{data.viewcount}</p>
              </div>
            </div>
            ))}

            {/* {allboardList.map((value) => (
              <Link to={`/board/${value.board_id}`}>
                <div className={styles.box}>
                  <div className={styles.bar} key={value.board_id}>
                    <p>{value.category}</p>
                    <p>작성자: {value.user_id}</p>
                    <p>제목: {value.title}</p>
                    <p>내용: {value.content}</p>
                    <p>{value.image}</p>
                    <p>{value.makeboard}</p>
                    <p>{value.viewcount}</p>
                  </div>
                </div>
              </Link>
            ))} */}
          </div>

          <Link to={`/board/write`}>
            <div className={styles.writeButton}>글쓰기</div>
          </Link>
          
        </div>
      </div>

    </>
  );
}
