import styles from "./CommunityInnerBoard.module.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const boardlist = [
  {
    title: "내 강아지의 첫 산책",
    writer: "강아지사랑",
    commentNum: "7",
    views: "34",
    content:
      "오늘 처음으로 강아지를 산책시켰어요. 처음엔 어려웠지만, 강아지가 너무 즐거워하는 모습을 보니 행복했습니다. 다른 분들도 강아지와의 산책 경험을 공유해주세요!",
  },
  {
    title: "강아지와 함께하는 여행 추천",
    writer: "멍멍이친구",
    commentNum: "3",
    views: "45",
    content:
      "강아지와 함께하는 여행지를 추천해주세요. 가급적이면 강아지가 마음껏 뛰어놀 수 있는 곳이었으면 좋겠습니다. 감사합니다!",
  },
  {
    title: "강아지 훈련 팁 공유합니다",
    writer: "퍼피마스터",
    commentNum: "12",
    views: "67",
    content:
      "강아지 훈련에 어려움을 겪고 계신 분들을 위해 몇 가지 팁을 공유하고자 합니다. 함께 토론하며 다양한 의견을 나눠봅시다.",
  },
  {
    title: "강아지가 좋아하는 장난감 추천",
    writer: "행복한강아지",
    commentNum: "5",
    views: "23",
    content:
      "우리 강아지가 좋아하는 장난감이 있어 추천하고 싶어요. 다른 분들의 추천도 기다리고 있습니다.",
  },
  {
    title: "차가운 겨울, 강아지 보호 방법",
    writer: "강아지보호자",
    commentNum: "8",
    views: "52",
    content:
      "겨울이 찾아오면서 강아지 보호에 대해 더욱 신경쓰게 되었습니다. 강아지를 겨울에 보호하는 좋은 방법을 알고 계시다면 공유해주세요!",
  },
];

export default function CommunityInnerBoard() {
  const navigator = useNavigate();
  const [page, setPage] = useState([]);

  const getApi = () => {
    axios
      .get(`${process.env.REACT_APP_HOST}/board/getboardcategory/모임_자유`)
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
      `/communityboard/community/communityinnerboard/communityPage/${pageNumber}`
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
            <button className={styles.button}>작성하기</button>
            <div className={styles.box2}></div>
          </div>
        </div>
      </div>
    </>
  );
}
