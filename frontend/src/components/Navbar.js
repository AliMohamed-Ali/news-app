import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import { useLogout } from '../hooks/useLogout';

export default function Navbar() {
  const {user} = useAuthContext();
  const {logout} = useLogout()
    const handleClick = ()=>{
        logout()
    }
  return (
    <header>
    <div className="container">
      <Link to="/">
        <h1>Home</h1>
      </Link>
      <Link to="/sources">
        <h1>Sources</h1>
      </Link>
      <nav>
        {user&&(
          <div>
            <span>{user.fullName}</span>
            <button onClick={handleClick}>Logout</button>
          </div>
        )} 
        {!user&&(
          <div>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </div>
        )} 
      </nav>
    </div>
  </header>
  )
}
