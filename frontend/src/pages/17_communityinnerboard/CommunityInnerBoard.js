import styles from "./CommunityInnerBoard.module.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function CommunityInnerBoard() {
  const navigator = useNavigate();
  const [page, setPage] = useState([]);
  const { community_id } = useParams();

  const getApi = () => {
    axios
      .get(
        `${process.env.REACT_APP_HOST}/board/getboardcategory/모임_${community_id}_자유`
      )
      .then((res) => {
        if (res.data.posts.length > 0) {
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
  return (
    <>
      <div className={styles.box1}>
        <div className={`${styles.container} ${styles.one}`}>
          <h1>📬 소모임 게시판</h1>

          <div className={`${styles.container} ${styles.two}`}>
            <table className={styles.boardTable}>
              <thead>
                <tr className={styles.thead}>
                  <th className={`${styles.th}`}>작성자</th>
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
            <button onClick={() => writeClick()} className={styles.button}>
              작성하기
            </button>
            <div className={styles.box2}></div>
          </div>
        </div>
      </div>
    </>
  );
}
