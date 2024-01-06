import styles from "./Home.module.scss";
import dogpic from "./mdog.jpg";
import plus from "./플러스.png";
import polygon from "./Polygon 1.png";
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
          board: "자유",
          title: "남산 반려견 산책로 추천 모음",
        },
        {
          board: "자유",
          title: "참새뗴 발견!",
        },
        {
          board: "일상",
          title: "강아지 사료 뭐가 좋나요?",
        },
        {
          board: "일상",
          title: "강아지 훈련법 알려주세요!",
        },
        {
          board: "자유",
          title: "늙은 강아지랑 노는 법 공유합니다",
        },
        {
          board: "일상",
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
          title: "강아지와 함께하는 겨울",
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
        <div className={styles.bgHome} >

            <h2>가족을 찾아요</h2>
            <div className={styles.findDog}>
            <img src={polygon} className={styles.polygonPic1}/>  
                {sampleData2
                  .sort((a, b) => new Date(b.date) - new Date(a.date)) // 날짜를 기준으로 내림차순 정렬
                  .slice(0, 3) // 최신 데이터 4개 선택
                  .map((data, index) => (
                    <div className={styles.picBar} key={index}>
                      <img
                        className={styles.DogPic}
                        src={dogpic}
                        alt="강아지"
                        title="멋진 우리 강아지!"
                      />
                      <div className={styles.title}> {data.title}</div>
                      <div className={styles.author}> {data.author}</div>
                    </div>
                  ))}
            <img src={polygon} className={styles.polygonPic2}/>        
            </div>         




            <h2>최신글</h2>
            <div className={`${styles.Box} ${styles.hotTopic}`}>
              {sampleData1.slice(1, 6).map((data, index) => (
                <div className={styles.bar} key={index}>
                  {data.board}
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  {data.title}
                </div>
              ))}
            </div>

            <div className={styles.writeButton}> 
              <img src={plus} className={styles.plusPic}/>  
              글쓰기
            </div>

          </div>
        </> 
    );
  }
  