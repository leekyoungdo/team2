import "./Board.scss";
import React, { useState, useRef, useEffect } from "react";
// import axios from 'axios';

export default function Board() {

  // const onValid = (data) => {
  //   console.log(data);
  //   axios
  //     .post('http://localhost:8000/board/getallboard', {
  //       board_id: data.board_id,
  //       user_id: data.user_id,
  //       category: data.category,
  //       title: data.title,
  //       content: data.content,
  //       image: data.image,
  //       makeboard: data.makeboard,
  //       viewcount: data.viewcount
  //     })
  // };

  const sampleData2 = [
    {
      board_id: 2,
      user_id: "flrudeh",
      category: "일상",
      title: "제목 수정중입니다.",
      content: "수정 됬나요 ?!",
      image: null,
      makeboard: "2023-12-28",
      viewcount: 0
    },
    {
      board_id: 1,
      user_id: "flrudeh",
      category: "자유",
      title: "첫글",
      content: "안녕",
      image: null,
      makeboard: "2023-12-28",
      viewcount: 3
    },
    {
      board_id: 1,
      user_id: "flrudeh",
      category: "질문",
      title: "첫글",
      content: "안녕",
      image: null,
      makeboard: "2023-12-28",
      viewcount: 3
    },
    {
      board_id: 2,
      user_id: "flrudeh",
      category: "실종/포착",
      title: "제목 수정중입니다.",
      content: "수정 됬나요 ?!",
      image: null,
      makeboard: "2023-12-28",
      viewcount: 0
    },
    {
      board_id: 2,
      user_id: "flrudeh",
      category: "일상",
      title: "제목 수정중입니다.",
      content: "수정 됬나요 ?!",
      image: null,
      makeboard: "2023-12-28",
      viewcount: 0
    },
    {
      board_id: 1,
      user_id: "flrudeh",
      category: "자유",
      title: "첫글",
      content: "안녕",
      image: null,
      makeboard: "2023-12-28",
      viewcount: 3
    }

  ];


    return(
        <>
        <div className="bgBoard">
          <div className="container">
            <div className="signinBtn">로그인</div>
            <div className="logo">멍멍투게더</div>

            <div className="nav">
                <div>
                  <h2>게시판</h2>
                </div>
                <div>
                  <h2>소모임</h2>
                </div>
                <div>
                  <h2>유기견 공고</h2>
                </div>
                <div>
                  <h2>앨범</h2>
                </div>
            </div>

            <div className="category">
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

            <div className="contents">
              <div className="box">
                {sampleData2.map((data, index) => (
                  <div className="bar" key={index}>
                    <p>{data.category}</p>
                    <p>작성자: {data.user_id}</p>
                    <p>제목: {data.title}</p>
                    <p>내용: {data.content}</p>
                    <p>{data.image}</p>
                    <p>{data.makeboard}</p>
                    <p>{data.viewcount}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="writeButton">글쓰기</div>
          </div>
        </div>
        </> 
    );
  }
  