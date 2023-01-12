import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext';
import {Link} from 'react-router-dom';
import NewsDetails from '../components/NewsDetails';
import Skeleton from 'react-loading-skeleton';

export default function Home() {
  const [news,setNews]=useState([]);
  const [isload,setIsload] = useState(true)
  const { user } = useAuthContext();
  useEffect(()=>{
    const fetchData = async()=>{
      const response = await fetch('/api/news',{
        method:"GET",
        headers:{"Authorization":`Bearer ${user.token}`}
      });
      const json = await response.json();
      if(response.ok){
        setNews(json.news.articles);
        setIsload(false)
      }
      setIsload(false)
    }
    fetchData()
  },[user.token])
  return (
    <>
      <div className='container  container-margin' >
        <div className="row text-center">
        {isload?<Skeleton count={5}/>:news.length?
          news.map((val,indx)=>{
              return (
                  <NewsDetails key={indx} news={val}/>
                )
              }):
          (<div className='container-margin'>
            <h2>There is no subscribed sources</h2>
            <Link to="/sources" className="btn btn-primary">Click Here To Subscribe</Link>
          </div>)}
        </div>
      
      </div>
    </>
  )
}
