import { useState, useEffect } from "react";
import styles from "./CommunityPage.module.scss";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import { useNavigate, useParams } from "react-router-dom";

export default function CommunityPage() {
  //가짜 api
  // axios 인스턴스 생성
  const axios_fake = axios.create();
  // axios-mock-adapter 인스턴스 생성
  const mock = new AxiosMockAdapter(axios_fake);
  // /user/signin 요청을 가로채서 가짜 응답을 반환
  mock.onPost("/user/signin").reply(200, {
    user_id: "testUser",
    // ... 기타 필요한 필드들
  });

  const { pageNum } = useParams();
  const [currentPageNum, setCurrentPageNum] = useState(Number(pageNum));
  const [loggedInUserId, setLoggedInUserId] = useState("");
  const [page, setPage] = useState([]);

  useEffect(() => {
    setCurrentPageNum(Number(pageNum));
  }, [pageNum]);

  useEffect(() => {
    // 로그인 상태
    axios_fake
      .post("/user/signin")
      .then((response) => {
        setLoggedInUserId(response.data.user_id);
        console.log("현재 로그인 된 아이디:", response.data.user_id);
      })
      .catch((error) => console.error("로그인 에러:", error));
  }, []);

  // 페이지 조회 및 띄우기
  const [postsPerPage, setPostsPerPage] = useState(0);
  const getApi = () => {
    const params = { pageNum: currentPageNum - 1 };

    axios
      .get(`${process.env.REACT_APP_HOST}/board/getboardcategory/모임_자유`, {
        params: params,
      })
      .then((response) => {
        console.log("현재 페이지 번호:", currentPageNum);
        console.log("조회한 페이지 :", response.data.posts[currentPageNum - 1]);

        if (response.data.posts.length > 0) {
          console.log("들어온 자료값:", response.data.posts);
          console.log("params 값:", params);
          setPage(response.data.posts);
          setPostsPerPage(response.data.posts.length); // 페이지당 게시글 수를 저장합니다.
        } else {
          console.log("posts 배열이 비어있거나 없음");
        }
      })
      .catch((err) => console.error("API 요청 및 페이지 조회 오류", err));
  };

  useEffect(() => {
    getApi();
  }, [currentPageNum]);
  // [currentPageNum]이 바뀔때마다 새로 일어나라는 뜻

  const [newComment, setNewComment] = useState({
    writer: loggedInUserId,
    content: "",
  });

  const handleInputChange = (e) => {
    if (e.target.name === "content") {
      setNewComment({
        ...newComment,
        [e.target.name]: e.target.value,
      });
    }
  };

  const [comments, setComments] = useState([
    {
      id: 1,
      writer: "강아지행복",
      content:
        "산책은 강아지에게 정말 중요해요. 좋은 경험을 공유해주셔서 감사합니다!",
    },
    {
      id: 2,
      writer: "멍멍이친구",
      content: "산책 첫날이 어떤지 궁금했는데, 잘 읽었습니다. 감사해요!",
    },
  ]);
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setComments([
      ...comments,
      {
        id: comments.length + 1,
        writer: loggedInUserId, // writer 값을 loggedInUserId로 설정합니다.
        content: newComment.content,
      },
    ]);
    // 페이지의 댓글 수 업데이트
    setPage((prevPage) =>
      prevPage.map((post) => {
        if (post.pageNum === 1) {
          // 현재 페이지 번호가 1인 경우만 처리
          return {
            ...post,
            commentNum: post.commentNum + 1,
          };
        }
        return post;
      })
    );
    setNewComment({ writer: "", content: "" });
  };

  const handleDeleteComment = (id) => {
    setComments(comments.filter((comment) => comment.id !== id));

    // 페이지의 댓글 수 업데이트
    setPage((prevPage) =>
      prevPage.map((post) => {
        if (post.pageNum === 1) {
          // 현재 페이지 번호가 1인 경우만 처리
          return {
            ...post,
            commentNum: post.commentNum - 1,
          };
        }
        return post;
      })
    );
  };

  const navigator = useNavigate();

  const handleNextPage = () => {
    const nextPageNum = currentPageNum + 1;
    if (nextPageNum > page.length) {
      console.log("마지막 글입니다. 현재 게시물 인덱스: ", currentPageNum); // 마지막 페이지 도달 시 현재 인덱스 출력
    } else {
      console.log("현재 게시물 인덱스", nextPageNum);
      setCurrentPageNum(nextPageNum);

      // 주소창에 페이지 번호를 반영합니다.
      navigator(
        `/communityboard/community/communityinnerboard/CommunityPage/${nextPageNum}`
      );
    }
  };

  const handlePrevPage = () => {
    const prevPageNum = currentPageNum - 1;
    if (prevPageNum < 1) {
      console.log("첫번째 글입니다. 현재 게시물 인덱스: ", currentPageNum); // 첫 페이지 도달 시 현재 인덱스 출력
    } else {
      console.log("현재 게시물 인덱스", prevPageNum);
      setCurrentPageNum(prevPageNum);

      // 주소창에 페이지 번호를 반영합니다.
      navigator(
        `/communityboard/community/communityinnerboard/CommunityPage/${prevPageNum}`
      );
    }
  };

  return (
    <>
      <div className={styles.bg}>
        <div className={styles.media}>
          <div className={`${styles.container} ${styles.main}`}>
            {page.map(
              (post, index) =>
                index === currentPageNum - 1 && (
                  <div key={index}>
                    <div
                      className={`${styles.container} ${styles.page} ${styles.one}`}
                      key={post.pageNum}
                    >
                      <div className={styles.detail}>
                        <div className={styles.Writer}>
                          작성자 : {post.user_id}
                        </div>
                        <div className={styles.Comment}>
                          댓글 : {post.commentNum}
                        </div>
                        <div className={styles.Views}>
                          조회수 : {post.viewcount}
                        </div>
                      </div>
                      <div className={styles.Title}>{post.title}</div>
                    </div>

                    <div
                      className={`${styles.container} ${styles.page} ${styles.two}`}
                    >
                      <div className={styles.Content}>{post.content}</div>
                      <div className={`${styles.container} ${styles.comment}`}>
                        <table className={styles.commentsTable}>
                          <tbody>
                            {comments.map((post, index) => (
                              <tr key={index}>
                                <td className={styles.cWriter}>
                                  {post.writer}
                                </td>
                                <td className={styles.cContent}>
                                  {post.content}
                                </td>
                                {/* 로그인한 사용자와 댓글 작성자가 동일한 경우에만 삭제 버튼을 보여줌 */}
                                {post.writer === loggedInUserId && (
                                  <td>
                                    <button
                                      className={styles["button delete"]}
                                      onClick={() =>
                                        handleDeleteComment(post.id)
                                      }
                                    >
                                      삭제
                                    </button>
                                  </td>
                                )}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div
                        className={`${styles.container} ${styles.commentwrite}`}
                      >
                        <form onSubmit={handleFormSubmit}>
                          <label>
                            {/* 로그인한 사용자의 아이디를 보여주고, 수정할 수 없게 합니다 */}
                            <input
                              type="text"
                              style={{
                                border: "none",
                                background: "transparent",
                                width: "100px",

                                textAlign: "right",
                                marginRight: "20px",
                                fontWeight: "900",
                              }}
                              name="writer"
                              value={loggedInUserId}
                              readOnly
                            />
                          </label>
                          <br />
                          <label>
                            <input
                              className={styles.cSection}
                              placeholder="댓글을 입력해주세요"
                              type="text"
                              style={{
                                border: "none",
                                background: "transparent",
                                width: "100%",
                                height: "100%",
                              }}
                              name="content"
                              value={newComment.content}
                              onChange={handleInputChange}
                            />
                          </label>
                          <button
                            className={`${styles.button} ${styles.submit}`}
                            type="submit"
                          >
                            댓글 작성
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                )
            )}

            <div className={styles.tab}>
              <button
                className={`${styles.button} ${styles.prev}`}
                onClick={handlePrevPage}
              >
                이전 페이지
              </button>
              <button
                className={`${styles.button} ${styles.next}`}
                onClick={handleNextPage}
              >
                다음 페이지
              </button>
              <button className={`${styles.button} ${styles.back}`}>
                목록으로
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
