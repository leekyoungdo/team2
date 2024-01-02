import { useState, useEffect } from "react";
import "./CommunityPage.scss";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

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

  mock.onGet("/post/view").reply((config) => {
    // 요청 파라미터에서 페이지 번호를 받아옵니다.
    const { pageNum } = config.params;

    // 페이지 조회 요청이 들어오면 해당 페이지의 조회수를 증가시킵니다.
    let updatedPage = { ...page[pageNum - 1] };
    updatedPage.views++;

    // 조회수가 증가한 페이지 정보를 반환합니다.
    return [200, updatedPage];
  });

  const [currentPageNum, setCurrentPageNum] = useState(1);

  const [loggedInUserId, setLoggedInUserId] = useState("");
  useEffect(() => {
    // 페이지가 로드되었을 때 로그인 API를 호출합니다.
    axios_fake
      .post("/user/signin")
      .then((response) => {
        // 응답에서 로그인한 사용자의 아이디를 가져와 state를 업데이트합니다.
        setLoggedInUserId(response.data.user_id);
      })
      .catch((error) => {
        console.error("로그인 에러:", error);
      });

    axios_fake
      .get("/post/view", {
        params: {
          pageNum: currentPageNum, // 현재 페이지 번호를 요청 파라미터로 보냅니다.
        },
      })
      .then((response) => {
        // 응답에서 페이지 정보를 가져와 state를 업데이트합니다.
        setPage([response.data]); // setPage 대신 setViewedPage를 사용합니다.
      })
      .catch((error) => {
        console.error("페이지 조회 에러:", error);
      });
  }, [currentPageNum]);

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
    {
      id: 3,
      writer: "퍼피마스터",
      content:
        "저도 처음에는 어려웠는데, 이제는 산책이 하루의 일상이 되었어요. 공감가는 내용이네요!",
    },
    {
      id: 4,
      writer: "행복한강아지",
      content:
        "산책 경험 공유 감사드려요. 저도 내일 아침에는 강아지와 산책을 해야겠어요!",
    },
    {
      id: 5,
      writer: "강아지보호자",
      content:
        "산책이 강아지에게 정말 중요하죠. 강아지와의 산책, 더 즐기시길 바랍니다!",
    },
    {
      id: 6,
      writer: "강아지사랑",
      content: "댓글 감사드려요! 저희 강아지도 산책을 정말 좋아해요.",
    },
    {
      id: 7,
      writer: "멍멍이친구",
      content:
        "산책이 강아지의 건강에도 좋아요. 함께 산책하며 즐거운 시간 보내세요!",
    },
  ]);

  const [page, setPage] = useState([
    {
      pageNum: 1,
      title: "내 강아지의 첫 산책",
      writer: "강아지사랑",
      commentNum: comments.length,
      views: 37,
      content:
        "오늘 처음으로 강아지를 산책시켰어요. 처음엔 어려웠지만, 강아지가 너무 즐거워하는 모습을 보니 행복했습니다. 다른 분들도 강아지와의 산책 경험을 공유해주세요!",
    },
  ]);

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

  const handleNextPage = () => {
    setCurrentPageNum(currentPageNum + 1);
  };

  const handlePrevPage = () => {
    if (currentPageNum > 1) {
      // 페이지 번호가 1보다 클 때만 이전 페이지로 이동
      setCurrentPageNum(currentPageNum - 1);
    } else console.log("첫번째 글입니다.");
  };

  return (
    <>
      <div>목록으로</div>

      {page.map((post) => (
        <div key={post.pageNum}>
          <div className="Writer">작성자 : {post.writer}</div>
          <div className="Title">제목 : {post.title}</div>
          <div className="Comment">댓글: {post.commentNum}</div>
          <div className="Views">조회수: {post.views}</div>
          <div className="Content">{post.content}</div>
        </div>
      ))}

      <table className="commentsTable">
        <thead>
          <tr>
            <th>작성자</th>
            <th>댓글 내용</th>
          </tr>
        </thead>
        <tbody>
          {comments.map((post, index) => (
            <tr>
              <td className="Writer">{post.writer}</td>
              <td className="Content">{post.content}</td>
              {/* 로그인한 사용자와 댓글 작성자가 동일한 경우에만 삭제 버튼을 보여줌 */}
              {post.writer === loggedInUserId && (
                <td>
                  <button onClick={() => handleDeleteComment(post.id)}>
                    댓글 삭제
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={handlePrevPage}>이전 페이지</button>
      <button onClick={handleNextPage}>다음 페이지</button>

      <form onSubmit={handleFormSubmit}>
        <label>
          작성자:
          {/* 로그인한 사용자의 아이디를 보여주고, 수정할 수 없게 합니다 */}
          <input type="text" name="writer" value={loggedInUserId} readOnly />
        </label>
        <label>
          내용:
          <input
            type="text"
            name="content"
            value={newComment.content}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">댓글 작성</button>
      </form>
    </>
  );
}
