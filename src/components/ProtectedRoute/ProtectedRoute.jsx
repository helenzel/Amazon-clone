import React,{useContext,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { DataContext } from '../DataProvider/DataProvider'
const ProtectedRoute=({children,msg,redirect})=>{
    const navigate =useNavigate();
    const {state,dispatch}=useContext(DataContext)
    const user=state.user;
    useEffect(()=>{
    if(!user){
        navigate("/auth", {
          state: { msg, redirect, from: location.pathname },
        });
    }
    },[user,msg,redirect,navigate])
    return children ;
        
    
       

}
export default ProtectedRoute

