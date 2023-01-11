import { useState } from 'react'
import { useAuthContext } from './useAuthContext';

export  function useLogin() {
    const [error,setError] = useState(null);
    const [isloading,setIsloading] = useState(null);
    const {dispatch} = useAuthContext();
    const login = async(email,password)=>{
        setIsloading(true);
        const response = await fetch('/api/user/login',{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({email,password})
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
  return {login,isloading,error}
}
