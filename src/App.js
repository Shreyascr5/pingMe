import { useRef, useState } from "react";
import "./App.css";
import Auth from "./components/Auth";
import Cookies from "universal-cookie";
import Chat from "./components/Chat";
const cookies = new Cookies();

function App() {
  const [isAuth, setIsAUth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);
  const roomInputRef=useRef();
  if (!isAuth) {
    return (
      <div>
        <Auth setIsAUth={setIsAUth}/>
      </div>
    );
  }
  return (
    <div>
      {room ? (
        <Chat room ={room}/>
      ) : (
        <div className="room">
          <label>Enter Room name:</label>
          <input ref={roomInputRef} type="text" />
          <button onClick={()=>setRoom(roomInputRef.current.value)}>Enter Chat</button>
        </div>
      )}
    </div>
  );
}

export default App;
