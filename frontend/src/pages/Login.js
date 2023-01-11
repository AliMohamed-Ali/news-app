import React, { useState } from 'react'
import { useLogin } from '../hooks/useLogin';

export default function Login() {
    const [email,setEmail]=useState('');
    const [password,setPassword]= useState('');
    const {login,isloading,error} = useLogin()
    const handleSubmit= async(e)=>{
        e.preventDefault();
        await login(email,password)        
    }
  return (
    <form className="login" onSubmit={handleSubmit}>
        <h2>log in</h2>
        <label>Email:</label>
        <input 
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className={error?"error":""}
        />
        <label>Password:</label>
        <input 
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className={error?"error":""}

        />
        <button disabled={isloading} >login</button>
        {error&&<div className='error'>
            {error}
        </div>}
    </form>
  )
}
