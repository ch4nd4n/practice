import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function Index() {
  const [messages, setMessages] = useState();
  useEffect(() => {
    const socket = io();
    socket.on("serverMsg", function (msg) {
      setMessages(msg);
    });
  }, []);
  return (
    <div>
      <h1>Remix Socket Example</h1>
      {messages && <div>{messages}</div>}
    </div>
  );
}
