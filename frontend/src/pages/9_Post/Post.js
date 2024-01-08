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

  const formData = new FormData();

  // 게시글 조회
  const getBoard = () => {
    axios
      .get(`${process.env.REACT_APP_HOST}/board/getboardid/${board_id}`)
      .then((res) => {
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
      .get(`${process.env.REACT_APP_HOST}/comment/getComment/${board_id}`)
      .then((res) => {
        setComments(Object.values(res.data.comment)); // 배열로 변환해서 받아 옴
        console.log('res.data.comment : ', res.data.comment);
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

              <div
                className={styles.user}
                onClick={() => navigator('/userprofile')}
              >
                작성자 {post.user_id}
              </div>

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

              {/* 댓글 창 */}
              <div className={styles.commentContent}>
                댓글창
                {comments.map((comment) => (
                  <div key={comment.comment_id} className={styles.comment}>
                    <div className={styles.nickname}>
                      {/* User 객체가 존재하는지 먼저 확인 */}
                      {comment.User && comment.User.nickname}
                      {comment.comment_id}
                    </div>
                    <div className={styles.content}>
                      {comment.comment_content}
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmit(onValid)}>
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
            </div>
          </div>
        </div>
      }
    </>
  );
}
