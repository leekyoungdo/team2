import { useState, useEffect } from 'react';
import './post.module.scss';

export default function Post() {
  const [post, setPost] = useState([]);

  const dummyData = [
    {
      result: true,
      board: {
        board_id: 1,
        user_id: 'flrudeh',
        category: '자유',
        title: '우리 강아지 보고 가세요~',
        content: '안녕',
        image: null,
        makeboard: '2023-12-28',
        viewcount: 3,
      },
    },
  ];

  useEffect(() => {
    setPost(dummyData);
  }, []);

  return (
    <>
      {/* 기능 구현하면 아래 주석처리된 코드 삭제하기 */}
      {/* {post.map((item) => (
        <div key={item.board.board_id} className="post">
          <p>{item.board.category}게시판</p>
          <p>{item.board.title}</p>
          <p>작성자: {item.board.user_id}</p>
          <p>작성 날짜: {item.board.makeboard}</p>
          <p>조회수: {item.board.viewcount}</p>
          <p>{item.board.image}</p>
          <p>{item.board.content}</p>
        </div>
      ))} */}

      {post.map((item) => (
        <>
          <div className="category">{item.board.category}게시판</div>
          <div className="title">{item.board.title}</div>
          <div className="user">{item.board.user_id}</div>
          <div className="makeboard">{item.board.makeboard}</div>

          <div className="division-line"></div>

          <div className="image">{item.board.image}</div>
          <div className="content">{item.board.content}</div>
        </>
      ))}
    </>
  );
}
