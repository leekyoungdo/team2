import "./Home.scss";
import dogpic from "./mdog.jpg";
import React, { useState, useRef, useEffect } from "react";

export default function Home() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const bannerDogsRef = useRef(null);


    const dog = [
        {
          breed: "골든 리트리버",
          gender: "수컷",
          discoveryDate: "2023-12-25",
          location: "서울특별시 강남구",
          description: "친절한 골든 리트리버입니다.",
        },
        {
          breed: "골든 리트리버",
          gender: "수컷",
          discoveryDate: "2023-12-25",
          location: "서울특별시 강남구",
          description: "친절한 골든 리트리버입니다.",
        },
        {
          breed: "골든 리트리버",
          gender: "수컷",
          discoveryDate: "2023-12-25",
          location: "서울특별시 강남구",
          description: "친절한 골든 리트리버입니다.",
        },
      ];

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
      const sampleData2 = [
        {
          author: "콩국수마니아",
          title: "함께한 산책 기록",
          content: "오늘 날이 너무 추워서 패딩 입혀봤어요.",
        },
        {
          author: "멍멍이집사",
          title: "찰떡이는 훈련 중",
          content: "강아지 훈련에 성공한 비법을 알려드립니다.",
        },
        {
          author: "루돌프",
          title: "강아지와 함께하는 겨울 액티비티",
          content: "겨울에 강아지와 함께하는 재미있는 액티비티를 소개합니다.",
        },
        {
          author: "댕댕이사랑",
          title: "강아지 생식 냠냠!",
          content: "너무 잘먹어서 뿌듯해요.",
        },
      ];


    return(
        <>
        <div className="bgHome">

          <div className="nav-main"> 
            <h1 className="logo">멍멍투게더</h1>
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
          </div>


            <div className="bannerShowDogs" ref={bannerDogsRef}>
                <div className="bannerDoglist">
                    <div className="bannerDog">
                      <img
                        className="DogPic"
                        src={dogpic}
                        alt="강아지"
                        title="주인을 기다리고 있어요"
                      />
                      <div className="Profile">
                        견종: {dog.breed}
                        <br /> 성별: {dog.gender}
                        <br /> 발견일: {dog.discoveryDate}
                        <br /> 구조지역: {dog.location}
                        <br />
                        설명: {dog.description}
                      </div>
                    </div>
                </div>
                <button
                  className="button-left"
                //   onClick={() => handleButtonClick("left")}
                >
                  이전
                </button>
                <button
                  className="button-right"
                //   onClick={() => handleButtonClick("right")}
                >
                  다음
                </button>
            </div>

            <h1>인기글</h1>
            <div className="Box hotTopic">
              {sampleData1.slice(0, 3).map((data, index) => (
                <div className="bar" key={index}>
                  작성자: {data.author} 제목: {data.title}
                </div>
              ))}
            </div>

            <h1>최신글</h1>
            <div className="Box newTopic">
              {sampleData1.slice(3, 6).map((data, index) => (
                <div className="bar" key={index}>
                  작성자: {data.author} 제목: {data.title}
                </div>
              ))}
            </div>

            <h1>우리 강아지</h1>
            <div className="Box ourDogs">
              {sampleData2
                .sort((a, b) => new Date(b.date) - new Date(a.date)) // 날짜를 기준으로 내림차순 정렬
                .slice(0, 4) // 최신 데이터 4개 선택
                .map((data, index) => (
                  <div className="picBar" key={index}>
                    <img
                      className="DogPic"
                      src={dogpic}
                      alt="강아지"
                      title="멋진 우리 강아지!"
                    />
                    <div className="title">제목: {data.title}</div>
                    <div className="string">내용: {data.content}</div>
                  </div>
                ))}
            </div>


            <div className="writeButton">글쓰기</div>
        </div>
        </> 
    );
  }
  