import { useState, useEffect } from 'react';
import styles from './dm.module.scss'; // CSS 모듈 import
import io from 'socket.io-client';
import Chat from './Chat';
import Notice from './Notice';

const socket = io.connect('http://localhost:8000/', { autoConnect: false });

export default function Dm() {
  const [msgInput, setMsgInput] = useState('');
  const [userIdInput, setUserIdInput] = useState('');
  const [chatList, setChatList] = useState([
    {
      user_id: 'sohee1234',
      msg_content: '안녕 안녕',
      send_time: '2024-01-02T08:39:56.000Z',
    },
    {
      user_id: 'sohee123',
      msg_content: '안녕123',
      send_time: '2024-01-02T09:29:08.000Z',
    },
    {
      user_id: 'sohee123',
      msg_content: '뭐하는중이야',
      send_time: '2024-01-02T09:29:19.000Z',
    },
    {
      type: 'notice', // 공지사항
      content: '~~~님이 입장하였습니다',
    },
  ]);
  const [userId, setUserId] = useState(null);
  const initSocketConnect = () => {
    console.log('connected', socket.connected);
    if (!socket.connected) socket.connect(); // 연결이 안 되어 있을 때만 연결을 하겠다
  };

  // 이름 중복 방지
  useEffect(() => {
    // initSocketConnect();

    socket.on('error', (res) => {
      alert(res.msg);
    });

    // 유저 입장 (mount 시점에)
    socket.on('entrySuccess', (res) => {
      setUserId(res.userId);
    });
  }, []);

  // mount 시
  useEffect(() => {
    // mount 될 때 실행
    const notice = (res) => {
      console.log('notice');
      // 공지사항을 추가하고, 메시지를 받아온다
      const newChatList = [...chatList, { type: 'notice', content: res.msg }];

      setChatList(newChatList);
    };

    socket.on('notice', notice);
    return () => socket.off('notice', notice);
    // 중복처리되므로 이벤트를 제거했다가 다시 켠다
  }, [chatList]);

  const sendMsg = () => {};

  const entryChat = () => {
    initSocketConnect();
    socket.emit('entry', { userId: userIdInput });
  };

  return (
    <>
      <h2>채팅창</h2>
      {/* {userId ? ( */}
      <>
        <div className={styles['chat-container']}>
          {chatList.map((chat, i) => {
            <div>{chatList.user_id}님 환영합니다</div>;
            if (chat.type === 'notice') return <Notice key={i} chat={chat} />;
            else return <Chat key={i} chat={chat} />;
          })}
        </div>
        <div className={styles['input-container']}>
          <input
            type="text"
            value={msgInput}
            onChange={(e) => setMsgInput(e.target.value)}
          />
          <button onClick={sendMsg}>전송</button>
        </div>
      </>
      {/* ) : (
      <>
        <div className={styles['input-container']}>
          <input
            type="text"
            value={userIdInput}
            onChange={(e) => setUserIdInput(e.target.value)}
          />
          <button onClick={entryChat}>입장</button>
        </div>
      </>
      )} */}
    </>
  );
}
