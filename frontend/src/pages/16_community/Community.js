import "./Community.scss";
import React, { useState } from 'react';

export default function Community() {
  const exampleDogGroups = [
    {
      region: "부산 해운대구",
      groupName: "부산 플레이데이트",
      groupIntro:
        "푸들 사랑하는 해운대구의 강아지 친구들을 모아요. 우리 같이 놀아봐요!",
      groupNum: 57,
    },
  ];

  // 멤버 아이디 넣어줘
  const memberlist = ['강아지사랑', '뽀삐엄마', '부산허스키', '통기타애견인', '과일인간', '우리모두친구'];

  const boardlist = [ 
   {title: "테스트게시글1", writer: "강아지사랑"},
   {title: "테스트게시글2", writer: "강아지사랑"}, 
   {title: "테스트게시글3", writer: "강아지사랑"},  
   {title: "테스트게시글4", writer: "강아지사랑"},  
   {title: "테스트게시글5", writer: "강아지사랑"},
  ]  

  const [isMemberModalOpen, setMemberModalOpen] = useState(false);
  const [isBoardModalOpen, setBoardModalOpen] = useState(false);

  return <>
      {exampleDogGroups.map((group, index) => (
        <div key={index}>
          <h3>{group.region}</h3>
          <div className="c_main_img">모임 메인 이미지</div>
          <h1>👨‍👩‍👧‍👦 {group.groupName}</h1>
          <div className="button opentalk">오픈톡 버튼</div>

          <h1 className="caption">소개</h1>
          <div className="detail">{group.groupIntro}</div>

          <h1 className="caption">멤버 목록</h1>
          <div className="button member" onClick={() => setMemberModalOpen(true)}>멤버목록 더보기</div>
          {isMemberModalOpen && 
            <div className="modal">
              <h2>멤버 목록</h2>
              {memberlist.map((member, index) => (
                <div key={index} className="member">{member}</div>
              ))}
              <button onClick={() => setMemberModalOpen(false)}>닫기</button>
            </div>}





          {memberlist.slice(0, 3).map((member, index) => (
            <div key={index} className="member">{member}</div>
          ))}

          <h1 className="caption">게시판</h1>

          <div className="button board" onClick={() => setBoardModalOpen(true)}>게시판 더보기</div>
          {isBoardModalOpen && 
            <div className="modal">
              <h2>게시판</h2>
              {boardlist.map((board, index) => (
                <div key={index} className="board">
                    <h3>{board.title}</h3>
                    <p>{board.writer}</p>
                </div>
              ))}
              <button onClick={() => setBoardModalOpen(false)}>닫기</button>
            </div>
          }
          
          {boardlist.slice(0, 3).map((board, index) => (
            <div key={index} className="board">
                <h4>{board.title}</h4>
                <p>{board.writer}</p>
            </div>
          ))}

          <div className="button join">모임가입 버튼</div>
        </div>
      ))}
  </>;
}
