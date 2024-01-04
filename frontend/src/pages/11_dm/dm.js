import { useState, useEffect } from "react";
import "./dm.module.scss";
import io from "socket.io-client";

const socket = io.connect("http://localhost:8000/", { autoConnect: false });

export default function Dm() {
  const initSocketConnect = () => {
    if (!socket.connected) socket.connect(); // 연결이 안 되어 있을 때만 연결을 하겠다
  };

  const [chat, setChat] = useState([]);

  const dummyData = [
    {
      user_id: "sohee1234",
      msg_content: "안녕 안녕",
      send_time: "2024-01-02T08:39:56.000Z",
    },
    {
      user_id: "sohee123",
      msg_content: "안녕123",
      send_time: "2024-01-02T09:29:08.000Z",
    },
    {
      user_id: "sohee123",
      msg_content: "뭐하는중이야",
      send_time: "2024-01-02T09:29:19.000Z",
    },
  ];

  useEffect(() => {
    // mount 될 때 실행
    setChat(dummyData);
  }, []);

  return (
    <>
      <h2>채팅창</h2>
      {chat.map((dm) => (
        <div>{dm.user_id}</div>
      ))}
    </>
  );
}
