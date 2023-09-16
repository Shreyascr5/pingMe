import React, { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db, auth } from "../firebase-config";
import "../styles/Chat.css";

function Chat({ room }) {
  const [newMessage, setNewMessage] = useState("");
  const messagesRef = collection(db, "messages");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    //firebase query
    const queryMessages = query(messagesRef, where("room", "==", room),
    orderBy("createdAt"));
    const unsubscribe=onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });
    

    //cleanup
    return ()=>unsubscribe();

  }, [messagesRef,room]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage === " ") return;
    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room: room,
    });
    setNewMessage(" ");
  };


  return (
    <div className="chat-app">
    <div className="header"><h1>Welcome to: {room.toUpperCase()}</h1></div>
      <div className="messages">
        {messages.map((message) => (
          <div className="message" key={message.id}>
          <span className="user">{message.user}</span>
          {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="new-message-form">
        <input
          type="text"
          onChange={(e) => setNewMessage(e.target.value)}
          className="new-message-input"
          placeholder="Type your message here"
          value={newMessage}
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  );
}

export default Chat;
