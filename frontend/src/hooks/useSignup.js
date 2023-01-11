import { useState } from 'react'
import { useAuthContext } from './useAuthContext';

export  function useSignup() {
    const [error,setError] = useState(null);
    const [isloading,setIsloading] = useState(null);
    const {dispatch} = useAuthContext();
    const signup = async(fullName,email,password)=>{
        setIsloading(true);
        const response = await fetch('/api/user/signup',{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({fullName,email,password})
        });
        const json = await response.json();
        if(!response.ok){
            setIsloading(false);
            setError(json.error);
        }
        if(response.ok){
            setIsloading(false);
            setError(null);
            localStorage.setItem("user",JSON.stringify(json));
            dispatch({type:"LOGIN",payload:json});
        }
    }
  return {signup,isloading,error}
}
