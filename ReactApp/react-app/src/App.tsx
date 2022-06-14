import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import FormControll from './formcontrol/FormControll';
import './App.css'
function App() {
    const[data,setData]=useState();
    useEffect(()=>{
        const getData=async()=>{
            const res=await fetch("http://localhost:8080/api/usr")
            const json=await res.json()
            console.log(json)
        }
        // getData()
    },[])
    
  return (
    <div>
        <FormControll/>
    </div>
  )
}

App.propTypes = {}

export default App
