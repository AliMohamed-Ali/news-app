import React, { useState } from 'react'
import { useSignup } from '../hooks/useSignup';

export default function Signup() {
    const [fullName,setFullName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]= useState('');
    const {signup,isloading,error} = useSignup();
    const handleSubmit= async(e)=>{
        e.preventDefault();
        await signup(fullName,email,password)        
    }
  return (
    <form className="signup" onSubmit={handleSubmit}>
        <h2>Sign up</h2>
        <label>FullName:</label>
        <input 
            type="text"
            value={fullName}
            onChange={(e)=>setFullName(e.target.value)}
            className = {error?"error":""}
        />
        <label>Email:</label>
        <input 
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className = {error?"error":""}

        />
        <label>Password:</label>
        <input 
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className = {error?"error":""}

        />
        <button disabled={isloading}>signup</button>
        {error&&<div className='error'>{error}</div>}
    </form>
  )
}
