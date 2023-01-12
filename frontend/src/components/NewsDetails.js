import React from 'react'

function NewsDetails({news}) {
  return (
    <div className='col my-3' >
        <div className="card" style={{width: "18rem"}}>
            <img src={news.urlToImage} className="card-img-top" alt="..."/>
            <div className="card-body">
            <h5 className="card-title">{news.title}</h5>
            <p className="card-text">{news.description}</p>
        </div>
        </div>
    </div>
  )
}

export default NewsDetails