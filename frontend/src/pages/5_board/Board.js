import styles from "./Board.module.scss";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Board() {
  const [allboardList, setAllBoardList] = useState([]);
  const [filteredBoardList, setFilteredBoardList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const navigate = useNavigate();

  const getBoard = () => {
    axios
      .get(`${process.env.REACT_APP_HOST}/board/getallboard`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        setAllBoardList(res.data.posts);
        setFilteredBoardList(res.data.posts); // 처음에는 모든 게시물을 보여줌
      });
  };

  useEffect(() => {
    getBoard();
  }, []);

  const handleCategoryClick = (category) => {
    // 카테고리를 클릭했을 때 호출되는 함수
    setSelectedCategory(category);

    if (category === "전체") {
      setFilteredBoardList(allboardList); // '전체' 카테고리 선택 시 전체 게시물 표시
    } else {
      // 선택된 카테고리에 해당하는 게시물만 필터링
      const filteredList = allboardList.filter(
        (item) => item.category === category
      );
      setFilteredBoardList(filteredList);
    }
  };

  return (
    <>
      <div className={styles.bg}>
        <div className={styles.container}>
          <div className={styles.category}>
            <div onClick={() => handleCategoryClick("전체")}>
              <p>전체</p>
            </div>
            <div onClick={() => handleCategoryClick("일상")}>
              <p>일상</p>
            </div>
            <div onClick={() => handleCategoryClick("질문")}>
              <p>질문</p>
            </div>
            <div onClick={() => handleCategoryClick("실종/포착")}>
              <p>실종/포착</p>
            </div>
          </div>

          <div className={styles.contents}>
            {filteredBoardList.length > 0 &&
              filteredBoardList.map((value) => (
                <div
                  className={styles.box}
                  key={value.board_id}
                  onClick={() => navigate(`/board/${value.board_id}`)}
                >
                  <div className={styles.bar}>
                    <p className={styles.category_contents}>{value.category}</p>
                    <p className={styles.title}>{value.title}</p>
                    <p className={styles.content}>{value.content}</p>
                    <p className={styles.user_id}>{value.user_id}</p>
                    <p className={styles.image}>
                      {value.image && (
                        <img
                          src={`${process.env.REACT_APP_HOST}${value.image}`}
                          alt="게시물 사진"
                        />
                      )}
                    </p>
                    <p className={styles.makeboard}>{value.makeboard}</p>
                    <p className={styles.viewcount}>{value.viewcount}</p>
                  </div>
                </div>
              ))}
          </div>

          <div
            className={styles.writeButton}
            onClick={() => navigate(`/board/write`)}
          >
            글쓰기
          </div>
        </div>
      </div>
    </>
  );
}
