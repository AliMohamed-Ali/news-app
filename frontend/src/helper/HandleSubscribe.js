import {  toast } from 'react-toastify';
import { notifySub } from './Notify';

export const HandleSubscribe = async (id,token)=>{
    const response = await fetch(`/api/news/sources/${id}/subscribe`,{
      method:"PATCH",
      headers:{"Authorization":`Bearer ${token}`}
    });
    // const json = await response.json();
    if(!response.ok){
      toast.error(`Some thing wrong happen`,{theme:'colored'})
    }
    notifySub(id)
  };
