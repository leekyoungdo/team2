import styles from "./Home.module.scss";
import plus from "./플러스.png";
import polygon from "./Polygon 1.png";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Home() {
  const [dogs, setDogs] = useState([]);
  const [newBoard, setNewBoard] = useState([]);
  const [hotBoard, setHotBoard] = useState([]);
  


  const getApi = () => {
    axios
      .get(`${process.env.REACT_APP_HOST}/dog/getapi`)
      .then((res) => {
        console.log(res.data);
        setDogs(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getBoard = () => {
    axios.get(`${process.env.REACT_APP_HOST}/board/getallboard`).then((res) => {
      console.log("getboard", res);
      setNewBoard(res.data.posts.slice(0, 5));
      const sortedPosts = res.data.posts.sort(
        (a, b) => b.viewcount - a.viewcount
      );
      setHotBoard(sortedPosts.slice(0, 5));
    });
  };

  useEffect(() => {
    getApi();
    getBoard();
  }, []);

  return (
    <>

      <div className={styles.bgHome}>
        <p>가족을 찾아요</p>
        <div className={styles.findDog}>
          <img src={polygon} className={styles.polygonPic1} />
          {dogs.slice(0, 3).map((data, index) => (
            <div className={styles.picBar} key={index}>
              <img
                className={styles.DogPic}
                src={data.popfile}
                alt="강아지"
                title="멋진 우리 강아지!"
              />
              <div className={styles.finddogInfo}>
                <div className={styles.title}> {data.kindCd}</div>
                <div className={styles.author}> {data.careNm}</div>
              </div>
            </div>
          ))}
          <img src={polygon} className={styles.polygonPic2} />
        </div>

        <p>최신글</p>
        <div className={`${styles.Box} ${styles.hotTopic}`}>
          {newBoard.length > 0 &&
            newBoard.map((value) => (
              <Link
                to={`/board/${value.board_id}`}
                key={value.board_id}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <div className={styles.bar} key={value.board_id}>
                  <div className={styles.boardCategory}>{value.category}
                  </div>
                  <div className={styles.boardTitle}>{value.title}
                    {value.title.length > 5
                      ? `${value.title.substring(0, 5)}...`
                      : value.title}
                  </div>
                </div>
              </Link>
            ))}
        </div>

        <br />

        <p>인기글</p>
        <div className={`${styles.Box} ${styles.hotTopic}`}>
          {hotBoard.length > 0 &&
            hotBoard.map((value) => (
              <Link
                to={`/board/${value.board_id}`}
                key={value.board_id}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <div className={styles.bar} key={value.board_id}>
                  <div className={styles.boardCategory}>{value.category}</div>
                  <div className={styles.boardTitle}>{value.title}
                    {value.title.length > 5
                      ? `${value.title.substring(0, 5)}...`
                      : value.title}
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </>
  );
}
