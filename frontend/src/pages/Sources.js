import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import SourcesDetails from '../components/SourcesDetails';
import { HandleSubscribe } from '../helper/HandleSubscribe';
import { HandleUnSubscribe } from '../helper/HandleUnSubscribe';
export default function Sources() {
  const [sources,setSources] = useState([]);
  const [popular ,setPopular] =useState([]);
  const [isload,setIsload] = useState(true);
  const { user } = useAuthContext();
  useEffect(()=>{
    const fetchAllSources =async()=>{
      setIsload(true);
      const response = await fetch('/api/news/sources',{
        method:"GET",
        headers:{"Authorization":`Bearer ${user.token}`}
      });
      const json = await response.json();
      if(!response.ok){
        console.log(json.error)
      }
      setSources(json.sources)
      setIsload(false)
    }
    fetchAllSources();
  },[]);
 useEffect(()=>{
  const fetchPopularSources =async()=>{
    // setIsload(true);
    const response = await fetch('/api/news/sources/popular-sources',{
      method:"GET",
      headers:{"Authorization":`Bearer ${user.token}`}
    });
    const json = await response.json();
    if(!response.ok){
      console.log(json.error)
      // setIsload(false)
    }else{
      const popularSources =json.popularSources;
      const topPopular = sources.filter(src=>(popularSources.includes(src.id)))
      setPopular(topPopular)
      // setIsload(false)
    }
    
  }
  fetchPopularSources();
 },[sources])

  const handleClick = async(id,isSubscribed)=>{
    if(!isSubscribed){
      HandleSubscribe(id,user.token);
    }else{
      HandleUnSubscribe(id,user.token)
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
    setSources(newSource);
    setPopular(newPopular)
  }
  return (
    <>  
      {isload?<Skeleton count={5} />:
      sources.length?(
        <div className='container container-margin'>
        {popular.length?<h2>Popular Sources</h2>:null}
        {popular.map(src=>(
          <SourcesDetails 
            key={src.id} 
            handleClick={handleClick}
            source = {src}
          />))
        } 
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
