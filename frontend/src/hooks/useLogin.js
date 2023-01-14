import { useState } from 'react'
import axiosInstance from '../API/axiosInstance';
import { useAuthContext } from './useAuthContext';

export  function useLogin() {
    const [error,setError] = useState(null);
    const [isloading,setIsloading] = useState(null);
    const {dispatch} = useAuthContext();
    const login = async(email,password)=>{
        try{
            setIsloading(true);
            const response = await axiosInstance.post('/api/user/login',{
                email,password
            });
            if(response.status === 200){
                setIsloading(false);
                setError(null);
                localStorage.setItem("user",JSON.stringify(response.data));
                dispatch({type:"LOGIN",payload:response.data});
            }
        }catch(err){
            setIsloading(false);
            setError(err.response.data.error);
        }
    }
  return {login,isloading,error}
}
