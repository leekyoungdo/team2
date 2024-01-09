import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './post.module.scss';
import axios from 'axios';

export default function Post() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigator = useNavigate();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const { board_id } = useParams(); // 게시판 id
  const [userNickname, setUserNickname] = useState('');
  const { nickname } = useSelector((state) => state.user);
  const formData = new FormData();

  const [editing, setEditing] = useState(false); // 수정 상태를 관리하기 위한 상태
  const [editingId, setEditingId] = useState(null); // 현재 수정 중인 댓글의 ID를 저장하는 상태
  const [editedContent, setEditedContent] = useState(''); // 수정된 내용을 관리하기 위한 상태

  // 게시글 조회
  const getBoard = () => {
    axios
      .get(`${process.env.REACT_APP_HOST}/board/getboardid/${board_id}`)
      .then((res) => {
        setUserNickname(res.data.nickname);
        let modifiedPost = res.data.board; // 날짜 형식 변경
        let date = new Date(modifiedPost.makeboard);
        modifiedPost.makeboard = date
          .toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          })
          .replace(/. /g, '.');

        setPost(modifiedPost);
      });
  };

  // 게시글 수정
  const boardUpdate = async () => {
    await axios.patch(`/board/update/${board_id}`).then((res) => {
      console.log('수정되었습니다.');
      // alert('수정되었습니다.');
      navigator('/board');
    });
  };

  // 게시글 삭제
  const boardDelete = () => {
    console.log('board_id', board_id);
    axios
      .delete(`${process.env.REACT_APP_HOST}/board/boarddelete/${board_id}`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.result) {
          // 게시글 삭제 성공
          console.log('게시글을 삭제했습니다.');
          alert('게시글을 삭제했습니다.');
          navigator('/board');
        } else {
          // 게시글 삭제 실패
          console.log('게시글 삭제 실패');
        }
      })
      .catch((err) => {
        // 네트워크 요청 실패 또는 백엔드에서 처리 과정에서 에러 발생
        console.error('게시글 삭제 요청 또는 처리 과정에서 에러 발생:', err);
      });
  };

  // 댓글 작성(등록)
  const onValid = (data) => {
    console.log('data : ', data);
    console.log('formData : ', formData);
    console.log('댓글 : ', data.comment_content);

    axios
      .post(
        `${process.env.REACT_APP_HOST}/comment/postcomment/${board_id}`,
        {
          comment_content: data.comment_content, // 댓글 데이터
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.data.result) {
          getComments();
          console.log('res.data : ', res.data);
          console.log('data.comment_content : ', data.comment_content);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 댓글 조회
  const getComments = () => {
    axios
      .get(`${process.env.REACT_APP_HOST}/comment/getallcomment/${board_id}`)
      .then((res) => {
        if (res.data.comments) {
          // res.data.comments가 있을 때만 받아 옴
          // setComments(Object.entries(res.data.comments)); // 배열로 변환해서 받아 옴
          setComments(res.data.comments);
        }
        console.log('res.data.comments : ', res.data.comments);
      });
  };

  // 댓글 수정
  const editComment = () => {};

  // 댓글 삭제
  const deleteComment = (comment_id) => {
    console.log('comment_id', comment_id);
    axios
      .delete(
        `${process.env.REACT_APP_HOST}/comment/deletecomment/${comment_id}`,
        { withCredentials: true } // 세션 정보 포함 옵션 추가
      )
      .then((res) => {
        if (res.data.result) {
          alert('댓글을 삭제했습니다.');
          console.log('댓글을 삭제했습니다.');
        } else {
          console.log('res.data.result', res.data.result); // false
          console.log('정보를 벡엔드에 전달했으나 실패(리스폰옴)');
        }
      })
      .catch((err) =>
        console.error('댓글 삭제 정보 전달이 되지 않았음(리스폰스 안옴):', err)
      );
  };

  useEffect(() => {
    getBoard();
    getComments();
  }, []);

  return (
    <>
      {
        <div className={styles.bg}>
          <div className={styles.container}>
            <h2>게시글</h2>
            <div className={styles.category}>{post.category}게시판</div>

            <div className={styles.innerContainer}>
              <div className={styles.title}>{post.title}</div>

              <span
                className={styles.user}
                onClick={() => navigator(`/userprofile/${userNickname}`)}
              >
                작성자 {userNickname}
              </span>

              <div className={styles.makeboard}>{post.makeboard}</div>

              {userNickname === nickname && (
                <div>
                  <button onClick={() => boardUpdate()}>글수정</button>
                  <button onClick={() => boardDelete()}>글삭제</button>
                </div>
              )}

              <div className={styles.divisionLine}></div>

              <div className={styles.imgContainer}>
                {post.image && (
                  <img
                    src={`${process.env.REACT_APP_HOST}${post.image}`}
                    alt="게시물 사진"
                    className={styles.img}
                  />
                )}
              </div>
              <div className={styles.content}>{post.content}</div>

              <div className={styles.divisionLine}></div>

              {/* 댓글 입력 */}
              <form
                onSubmit={handleSubmit(onValid)}
                className={styles.commentsForm}
              >
                <div className={styles.comments}>
                  <textarea
                    className={styles.commentsText}
                    placeholder="댓글을 입력해주세요"
                    {...register('comment_content')}
                  ></textarea>
                </div>

                <button type="submit" className={`${styles.btn}`}>
                  등록
                </button>
              </form>

              {/* 댓글 창 */}
              <div className={styles.commentContent}>
                댓글창
                {comments.map((comment, index) => (
                  <div key={index}>
                    {userNickname} {comment.comment_content}
                    {/* 로그인한 사용자와 댓글 작성자가 동일한 경우에만 수정 / 삭제 버튼을 보여줌 */}
                    {userNickname === nickname && (
                      <div>
                        <button onClick={() => editComment(comment.comment_id)}>
                          수정
                        </button>
                        <button
                          onClick={() => deleteComment(comment.comment_id)}
                        >
                          삭제
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
}
