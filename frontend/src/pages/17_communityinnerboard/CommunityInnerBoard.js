import styles from "./CommunityInnerBoard.module.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function CommunityInnerBoard() {
  const navigator = useNavigate();
  const [page, setPage] = useState([]);
  const { community_id } = useParams();
  const [communityData, setCommunityData] = useState(null); // new state for community data

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_HOST}/community/getcommunity/${community_id}`
      )
      .then((response) => {
        if (response.data.result) {
          setCommunityData(response.data.data);
        } else {
          console.error("커뮤니티 데이터를 불러오는데 실패하였습니다.");
        }
      })
      .catch((error) => {
        console.error(
          "커뮤니티 데이터를 불러오는 API 호출에 실패하였습니다:",
          error
        );
      });
  }, [community_id]);

  const getApi = () => {
    axios
      .get(
        `${process.env.REACT_APP_HOST}/board/getboardcategory/모임_${community_id}_자유`
      )
      .then((res) => {
        if (res.data.posts.length > 0) {
          console.log("이게 자료임", res.data.posts);
          setPage(res.data.posts); // 모든 게시글을 설정
        } else {
          // 글이 없는 경우에 대한 처리
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getApi();
  }, []);

  const handlePostClick = (pageNumber) => {
    navigator(
      `/communityboard/community/${community_id}/communityinnerboard/communityPage/${pageNumber}`
    );
  };
  const writeClick = () => {
    navigator(
      `/communityboard/community/${community_id}/communityinnerboard/CommunityWrite`
    );
  };

  const BackClick = () => {
    navigator(`/communityboard/community/${community_id}`);
  };
  return (
    <>
      <div className={styles.box1}>
        <div className={`${styles.container} ${styles.one}`}>
          <h1>
            📬 {communityData ? communityData.community_name : "Loading..."}{" "}
            소모임 게시판
          </h1>

          <div className={`${styles.container} ${styles.two}`}>
            <table className={styles.boardTable}>
              <thead>
                <tr className={styles.thead}>
                  <th className={`${styles.th}`}>작성자</th>
                  <th className={`${styles.th}`}>유형</th>
                  <th className={`${styles.th}`}>글 제목</th>
                  <th className={`${styles.th}`}>댓글 수</th>
                  <th className={`${styles.th}`}>조회수</th>
                </tr>
              </thead>
              <tbody>
                <tr className={styles.tspace}></tr>
                {page.map((post, index) => (
                  <tr
                    className={styles.pagelist}
                    key={index}
                    onClick={() => handlePostClick(index + 1)}
                  >
                    <td className={`${styles.td} ${styles.cellWriter}`}>
                      {post.user_id}
                    </td>
                    <td className={`${styles.td} ${styles.cellWriter}`}>
                      {post.category}
                    </td>
                    <td className={`${styles.td} ${styles.cellTitle}`}>
                      {post.title}
                    </td>
                    <td className={`${styles.td} ${styles.cellComment}`}>
                      {post.commentNum}
                    </td>
                    <td className={`${styles.td} ${styles.cellViews}`}>
                      {post.viewcount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className={styles.flex}>
              <button onClick={() => writeClick()} className={styles.button}>
                작성하기
              </button>
              <button onClick={() => BackClick()} className={styles.button}>
                이전 페이지로
              </button>
            </div>
            <div className={styles.box2}></div>
          </div>
        </div>
      </div>
    </>
  );
}
