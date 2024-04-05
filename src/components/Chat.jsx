import { Avatar, List, Skeleton, Form, Input, Button, Card } from "antd";
import { socket } from "../socket";
import { useEffect, useRef, useState } from "react";
import { removeQuote } from "../utils/utils";

const Chat = ({ chats }) => {
  const [form] = Form.useForm();
  const [username, setUsername] = useState("dev");
  const messageRef = useRef();
  const chatRef = useRef();

  const onFinishChat = (e) => {
    form.resetFields();
    socket.emit("send_chat", {
      username: JSON.stringify(username),
      chat: JSON.stringify(e.chat),
    });
  };

  useEffect(() => {
    socket.emit("change_username", {
      username: JSON.stringify(username),
    });
  }, [username]);

  useEffect(() => {
    chatRef.current.focus();
  }, [chats]);

  useEffect(() => {
    messageRef.current.scrollTop = messageRef.current.scrollHeight;
  }, [chats]);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: 300,
        gap: 4,
      }}
    >
      <div>Chatting</div>
      <div
        ref={messageRef}
        style={{
          width: 300,
          height: 400,
          overflow: "auto",
          padding: "0 16px",
          border: "1px solid rgba(140, 140, 140, 0.35)",
        }}
      >
        {chats.map((chat, key) => {
          return (
            <Card
              size="small"
              style={{
                padding: 0,
                margin: 5,
              }}
              key={key}
              title={removeQuote(chat.username)}
            >
              {removeQuote(chat.chat)}
            </Card>
          );
        })}
      </div>
      <b>username</b>
      <Input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      ></Input>
      <Form form={form} onFinish={(e) => onFinishChat(e)}>
        {/* <Form.Item name="username" label="name">
          <Input></Input>
        </Form.Item> */}
        <b>Chat</b>
        <Form.Item name="chat">
          <Input ref={chatRef}></Input>
        </Form.Item>
        <Form.Item>
          <Button block htmlType="submit">
            전송
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Chat;
