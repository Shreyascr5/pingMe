import { useRef, useState } from "react";
import "./App.css";
import Auth from "./components/Auth";
import Cookies from "universal-cookie";
import Chat from "./components/Chat";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
const cookies = new Cookies();

function App() {
  const [isAuth, setIsAUth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);
  const roomInputRef=useRef();

  const signUserOut=async()=>{
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAUth(false);
    setRoom(null);
  }

  if (!isAuth) {
    return (
      <div>
        <Auth setIsAUth={setIsAUth}/>
      </div>
    );
  }
  return (
    <>
      {room ? (
        <Chat room ={room}/>
      ) : (
        <div className="room">
          <label>Enter Room name:</label>
          <p>Please, Enter the room name to join the same chat</p>
          <input ref={roomInputRef} type="text" />
          <button  onClick={()=>setRoom(roomInputRef.current.value)}>Enter Chat</button>
        </div>
      )}
      <div className="sign-out">
        <button onClick={signUserOut}>Sign Out</button>
        <br/>
        <p>Please, Refresh your tab if the chat page doesn't appear automatically !</p>
      </div>
    </>
  );
}

export default App;
