import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./post.module.scss";
import axios from "axios";

export default function Post() {
  const [post, setPost] = useState({});
  const { board_id } = useParams();

  const getBoard = () => {
    axios
      .get(`${process.env.REACT_APP_HOST}/board/getboardid/${board_id}`)
      .then((res) => {
        setPost(res.data.board);
      });
  };

  useEffect(() => {
    getBoard();
  }, []);

  return (
    <>
      {post && (
        <>
          <div className="category">{post.category}게시판</div>
          <div className="title">{post.title}</div>
          <div className="user">{post.user_id}</div>
          <div className="makeboard">{post.makeboard}</div>

          <div className="division-line"></div>

          <div className="image">
            {post.image && (
              <img
                src={`${process.env.REACT_APP_HOST}${post.image}`}
                alt="게시물 사진"
              />
            )}
          </div>
          <div className="content">{post.content}</div>
        </>
      )}
    </>
  );
}
