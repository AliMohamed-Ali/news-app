import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import {  toast } from 'react-toastify';
export default function Sources() {
  const [sources,setSources] = useState([]);
  const { user } = useAuthContext();
  useEffect(()=>{
    const fetchAllSources =async()=>{
      const response = await fetch('/api/news/sources',{
        method:"GET",
        headers:{"Authorization":`Bearer ${user.token}`}
      });
      const json = await response.json();
      if(!response.ok){
        console.log(json.error)
      }
      setSources(json.sources)
    }
    fetchAllSources();
  },[user.token]);
  const handleSubscribe = async (id)=>{
    const response = await fetch(`/api/news/sources/${id}/subscribe`,{
      method:"PATCH",
      headers:{"Authorization":`Bearer ${user.token}`}
    });
    const json = await response.json();
    if(!response.ok){
      toast.error(`Some thing wrong happen`,{theme:'colored'})
    }
    console.log("subscribe",json)
  };
  const handleUnSubscribe = async (id)=>{
    const response = await fetch(`/api/news/sources/${id}/unsubscribe`,{
      method:"PATCH",
      headers:{"Authorization":`Bearer ${user.token}`}
    });
    const json = await response.json();
    if(!response.ok){
      console.log(json.error)
    }
    console.log("unsubscribe",json)
  };
  const notifySub = (id) => toast.success(`You Subscribe ${id}`,{theme:'colored'});
  const notifyUnSub = (id) => toast.info(`You Unsubscribe ${id}`,{theme:'colored'});

  const handleClick = async(id,isSubscribed)=>{
    if(!isSubscribed){
      handleSubscribe(id);
      notifySub(id)
    }else{
      handleUnSubscribe(id)
      notifyUnSub(id);
    }
    const newSource = sources.map(src=>{
      if(src.id === id ){
        return {...src , isSubscribed: !isSubscribed }
      }
      return src
    })
    setSources(newSource);
  }
  return (
    <>  
    <div className='container container-margin'>  
      {
      sources.length?
        sources.map(({id,name,isSubscribed,description})=>(
          <div className="card w-75 mb-3" key={id}>
              <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <p className="card-text">{description}</p>
                <button 
                  className={isSubscribed?"btn btn-primary":"btn btn-danger"}
                  onClick = {()=>handleClick(id,isSubscribed)}
                >
                  {isSubscribed ? "Unsubscribe":"Subscribe"}
                </button>
              </div>
          </div>
          )):
          <Skeleton count={5} /> 
    }
    </div>
  </>

  )
}
