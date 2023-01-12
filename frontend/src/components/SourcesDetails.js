import React from 'react'

function SourcesDetails({source ,handleClick}) {
  return (
    <div className="card w-75 mb-3">
        <div className="card-body">
        <h5 className="card-title">{source.name}</h5>
        <p className="card-text">{source.description}</p>
        <button 
            className={source.isSubscribed?"btn btn-primary":"btn btn-danger"}
            onClick = {()=>handleClick(source.id,source.isSubscribed)}
        >
            {source.isSubscribed ? "Unsubscribe":"Subscribe"}
        </button>
        </div>
    </div>
  )
}

export default SourcesDetails