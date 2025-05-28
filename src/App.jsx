import React, { useContext, useEffect } from "react"
// import Header from "./components/Header/Header"
// import CarouselEffect from "./components/Carousel/CarouselEffect"
// import Category from "./components/Category/Category"
// import Product from "./components/Product/Product"
import Routing from "../Router"
import { DataContext } from "./components/DataProvider/DataProvider"
import { Type } from "./Utilty/action.type"
import {auth } from "./Utilty/firebase.js"
function App() {
  const {state,dispatch}=useContext(DataContext)
  const { user } = state;
  useEffect(()=>{
auth.onAuthStateChanged((authUser)=>{
  if(authUser){
    dispatch({
      type:Type.SET_USER,
      user:authUser
    })
  }else{
    dispatch({
      type: Type.SET_USER,
      user: null,
    });
  }
})
  },[]);

  return (
    <>
      <Routing/>
    </>
  )
}


export default App
