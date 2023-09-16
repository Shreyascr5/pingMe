import { useRef, useState } from "react";
import "./App.css";
import Auth from "./components/Auth";
import Cookies from "universal-cookie";
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
        <div>Chat</div>
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
