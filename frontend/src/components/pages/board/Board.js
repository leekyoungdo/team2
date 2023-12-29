import "./Board.scss";
import React, { useState, useRef, useEffect } from "react";

export default function Board() {
      const sampleData1 = [
        {
          author: "건강하게살자",
          title: "남산 반려견 산책로 추천 모음",
        },
        {
          author: "시바다시바",
          title: "참새뗴 발견!",
        },
        {
          author: "lovmadog",
          title: "강아지 사료 뭐가 좋나요?",
        },
        {
          author: "happydog",
          title: "강아지 훈련법 알려주세요!",
        },
        {
          author: "올드독",
          title: "늙은 강아지랑 노는 법 공유합니다",
        },
        {
          author: "petworld",
          title: "반려견과 함께하는 일상",
        },
      ];


    return(
        <>
        <div className="bgBoard">
            <h1>멍멍투게더</h1>
            <div className="signinBtn">로그인</div>

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

            <div className="Box hotTopic">
              {sampleData1.slice(0, 3).map((data, index) => (
                <div className="bar" key={index}>
                  작성자: {data.author} 제목: {data.title}
                </div>
              ))}
            </div>

            <div className="writeButton">글쓰기</div>
        </div>
        </> 
    );
  }
  