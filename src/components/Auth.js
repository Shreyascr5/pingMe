import React from 'react'
import {auth, provider} from "../firebase-config"
import { signInWithPopup } from 'firebase/auth';
import Cookies from 'universal-cookie';
const cookies=new Cookies();


function Auth() {
    const signInWithGoogle=async()=>{
        try{
      const result=  await signInWithPopup(auth, provider);
         console.log(result);
         cookies.set("auth-token",result.user.refreshToken);
        }
        catch(err){
            console.log(err);
        }

    };
  return (
    <div className='auth'>
        <p>Sign In with Google to continue!</p>
        <button onClick={signInWithGoogle}>SignIn with Google</button>
    </div>
  )
}

export default Auth