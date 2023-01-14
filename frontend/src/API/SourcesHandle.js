import {  toast } from 'react-toastify';
import axiosInstance from './axiosInstance';
import { notifySub, notifyUnSub } from './Notify';

export const HandleSubscribe = async (id,token)=>{
  try{
    
    const response = await axiosInstance.patch(`/api/news/sources/${id}/subscribe`,{
      body:"subscribe"
    },{headers:{"Authorization":`Bearer ${token}`}});
    notifySub(id);
    return response
  }catch(err){
    toast.error(`Some thing wrong happen`,{theme:'colored'})
  }
  };

  export const HandleUnSubscribe = async (id,token)=>{
    try{
      const response = await axiosInstance.patch(`/api/news/sources/${id}/unsubscribe`,{
        body:"unsubscribe"
      },{headers:{"Authorization":`Bearer ${token}`}});
    notifyUnSub(id);
    return response
    }catch(err){
      toast.error(`Some thing wrong happen`,{theme:'colored'})
    }
  };
