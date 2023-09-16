import React, { useEffect, useState } from "react";
import {addDoc,collection,serverTimestamp,onSnapshot,query,where} from "firebase/firestore"
import { db,auth } from "../firebase-config";
import "../styles/Chat.css";

function Chat({room}) {
  const [newMessage, setNewMessage] = useState("");
  const messagesRef=collection(db,"messages");


  useEffect(()=>{
   const queryMessages=query(messagesRef,where("room","==",room));
    onSnapshot(queryMessages,(snapshot)=>{
        console.log("New messages");
    })
  })

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(newMessage===" ") return;
    await addDoc(messagesRef,{
        text:newMessage,
        createdAt:serverTimestamp(),
        user:auth.currentUser.displayName,
        room:room,
    });
    setNewMessage(" ");
  };
  return (
    <div className="chat-app">
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
