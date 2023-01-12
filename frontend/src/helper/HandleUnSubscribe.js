import { toast } from "react-toastify";
import { notifyUnSub } from "./Notify";

export const HandleUnSubscribe = async (id,token)=>{
    const response = await fetch(`/api/news/sources/${id}/unsubscribe`,{
      method:"PATCH",
      headers:{"Authorization":`Bearer ${token}`}
    });
    // const json = await response.json();
    if(!response.ok){
      toast.error(`Some thing wrong happen`,{theme:'colored'})
    }
    notifyUnSub(id);
  };