import { useState, useEffect, useCallback } from 'react';
import { Provider } from 'react-redux';
import styles from './dm.module.scss';
import io from 'socket.io-client';
import Chat from './Chat';
import Notice from './Notice';

const socket = io.connect('http://localhost:8000/', { autoConnect: false });

export default function Dm() {
  const [msgInput, setMsgInput] = useState('');
  const [userIdInput, setUserIdInput] = useState('');
  const [chatList, setChatList] = useState([
    {
      chatId: '파이리',
      msg_content: '하위하위',
      send_time: '2024-01-02T08:39:56.000Z',
    },
    {
      chatId: '피카츄',
      msg_content: '잘지내??',
      send_time: '2024-01-02T09:29:08.000Z',
    },
    {
      chatId: '꼬부기',
      msg_content: '뭐하는중이야',
      send_time: '2024-01-02T09:29:19.000Z',
    },
    {
      type: 'notice', // 공지사항
      content: '~~~님이 입장하였습니다',
    },
  ]);
  const [chatId, setChatId] = useState(null);
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
    // socket.on('entrySuccess', (res) => {
    //   setUserId(res.userId);
    // });
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

  const sendMsg = () => {
    if (msgInput !== '') {
      socket.emit('sendMsg', { msg: msgInput });
      setMsgInput('');
    }
  };

  useEffect(() => {
    if (chatId) {
      entryChat();
    }
  }, [chatId]);

  const chatEnter = (e) => {
    setChatId(e.target.innerText);
  };

  const entryChat = () => {
    initSocketConnect();
    socket.emit('entry', {
      chat_name: chatId,
      chat_category: 'dm',
      nickname: 'abc',
    });
  };

  const addChatList = useCallback(
    (res) => {
      // 서버에서 송신한 userId와 내 userId가 같다면 type의 값은 my, 다르면 other
      const type = res.nickname === 'abc' ? 'my' : 'other';

      const newChatList = [...chatList, { type: type, content: res.msg }];
      setChatList(newChatList);
    },
    // chatId와 chatList가 변경될 때마다 함수를 다시 선언
    [chatId, chatList]
  );

  useEffect(() => {
    socket.on('chat', addChatList);
    return () => socket.off('chat', addChatList);
  }, [addChatList]);

  return (
    <>
      <h2>채팅창</h2>
      {chatId ? (
        <>
          <div className={styles['chat-container']}>
            {chatList.map((chat, i) => {
              <div>{chatList.chatId}님 환영합니다</div>;
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
      ) : (
        <>
          <div>
            {chatList.map((chat, i) => {
              return (
                <>
                  <div key={i} value={chatId} onClick={chatEnter}>
                    <div>{chat.chatId}</div>
                    <div>{chat.msg_content}</div>
                    <div>{chat.send_time}</div>
                  </div>
                </>
              );
            })}
          </div>
        </>
      )}
    </>
  );
}
