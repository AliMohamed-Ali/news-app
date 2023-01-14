import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext';
import {Link} from 'react-router-dom';
import NewsDetails from '../components/NewsDetails';
import Skeleton from 'react-loading-skeleton';
import { useLogout } from '../hooks/useLogout';
import axiosInstance from '../API/axiosInstance';

export default function Home() {
  const [news,setNews]=useState([]);
  const [isload,setIsload] = useState(true)
  const { user } = useAuthContext();
  const {logout} = useLogout()
  useEffect(()=>{
    const fetchData = async()=>{
      try{
        const response = await axiosInstance.get('/api/news',{
          headers : {
            "Authorization":`Bearer ${user.token}`
          }
        });
        setIsload(false)
        setNews(response.data.news.articles);
      }catch(err){
        if(err.response.status === 401){
          logout()
        }
      }
    }
    fetchData()
  },[])
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
