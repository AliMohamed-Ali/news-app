import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import SourcesDetails from '../components/SourcesDetails';
import {  HandleSubscribe,HandleUnSubscribe } from '../API/SourcesHandle';
import { useLogout } from '../hooks/useLogout';
import axiosInstance from '../API/axiosInstance';
import { toast } from 'react-toastify';
export default function Sources() {
  const [sources,setSources] = useState([]);
  const [popular ,setPopular] =useState([]);
  const [isload,setIsload] = useState(true);
  const { user } = useAuthContext();
  const {logout} = useLogout();
  useEffect(()=>{
    const fetchAllSources =async()=>{
      try{ 
        const response = await axiosInstance.get('/api/news/sources',{
          headers : {
            "Authorization":`Bearer ${user.token}`
          }
        });
         setSources(response.data.sources)
      }catch(err){
        console.error(err.response.error)
        if(err.response.status === 401){
          logout()
        }
      }
    }
    fetchAllSources();
    setIsload(false);
  },[]);
 useEffect(()=>{
  const fetchPopularSources =async()=>{
    try{
     const response = await axiosInstance.get('/api/news/sources/popular-sources',{
      headers : {
        "Authorization":`Bearer ${user.token}`
      }
    });
      const popularSources =response.data.popularSources;
      const topPopular = sources.filter(src=>(popularSources.includes(src.id)));
      setPopular (topPopular) ;
   }catch(err){
      toast.error(err.error)
   }
  }
  fetchPopularSources()
 },[sources])

  const handleClick = async(id,isSubscribed)=>{
    let response
    if(!isSubscribed){
      response = await HandleSubscribe(id,user.token);
    }else{
      response =await HandleUnSubscribe(id,user.token)
    }
    const newSource = sources.map(src=>{
      if(src.id === id ){
        return {...src , isSubscribed: !isSubscribed }
      }
      return src
    });
    const newPopular = popular.map(src=>{
      if(src.id === id ){
        return {...src , isSubscribed: !isSubscribed }
      }
      return src
    });
    if(response?.status === 200){
      setSources(newSource);
      setPopular(newPopular);
    }
    
  }
  return (
    <>  
      {isload?<Skeleton count={5} />:
      sources.length?(
        <div className='container container-margin'>
        {popular.length?(<>
        <h2>Popular Sources</h2>
        {popular.map(src=>(
          <SourcesDetails 
            key={src.id} 
            handleClick={handleClick}
            source = {src}
          />))
        } 
          </>):null}

          <h2>All Sources</h2>
        {
        sources.map(src=>(
          <SourcesDetails 
            key={src.id} 
            handleClick={handleClick}
            source = {src}
          />))
        }
         </div>
          ):"there is no Sources"
          
    }
  </>

  )
}
