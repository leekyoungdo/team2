import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
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
  const { board_id, comment_id } = useParams(); // 게시판 id, 댓글 id
  const [userNickname, setUserNickname] = useState('');
  const formData = new FormData();

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
  const deleteComment = () => {
    axios
      .delete(
        `${process.env.REACT_APP_HOST}/comment/deletecomment/${comment_id}`
      )
      .then((res) => {
        if (res.data.result) {
          getComments(); // 댓글 목록을 새로고침
          console.log('댓글이 삭제되었습니다.');
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
                onClick={() => navigator(`/userprofile/${post.user_id}`)}
              >
                작성자 {userNickname}
              </span>

              <div className={styles.makeboard}>{post.makeboard}</div>

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
                    {comment.user_id}
                    {comment.comment_content}
                    <button onClick={() => editComment(comment.comments)}>
                      수정
                    </button>
                    <button onClick={() => deleteComment(comment.comments)}>
                      삭제
                    </button>
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
