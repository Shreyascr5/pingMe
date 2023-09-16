import React from 'react'
import {auth, provider} from "../firebase-config"
import { signInWithPopup } from 'firebase/auth';
import Cookies from 'universal-cookie';
import "../styles/Auth.css";

const cookies=new Cookies();



function Auth(props) {
    const {setIsAuth}=props;
    const signInWithGoogle=async()=>{
        try{
      const result=  await signInWithPopup(auth, provider);
         console.log(result);
         cookies.set("auth-token",result.user.refreshToken);
         setIsAuth(true);
        }
        catch(err){
            console.log(err);
            setIsAuth(false);
        }

    };
  return (
    <div className='auth'>
        <p>Sign In with Google to continue!</p>
        <button onClick={signInWithGoogle}>Sign In with Google</button>
    </div>
  )
}

export default Auth