import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext';
import {Link} from 'react-router-dom';

export default function Home() {
  const [news,setNews]=useState([]);
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
      }
    }
    fetchData()
  },[user.token])
  return (
    <>
      <div className='container  container-margin' >
        <div className="row text-center">
        {news.length?
          news.map((val,indx)=>{
              return (
                  <div className='col my-3' key={val.source.id+indx}>
                    <div className="card" style={{width: "18rem"}}>
                      <img src={val.urlToImage} className="card-img-top" alt="..."/>
                      <div className="card-body">
                        <h5 className="card-title">{val.title}</h5>
                        <p className="card-text">{val.description}</p>
                      </div>
                    </div>
                  </div>
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
