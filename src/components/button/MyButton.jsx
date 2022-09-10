import React, { useState } from 'react'
import cl from './MyButton.module.css'

const MyButton = ({children, ...props}) => {

  return (
  <button
    id={props.id}
    className={cl.btn}
    // onClick={(e) => {
    //   e.target.classList.toggle(cl.showed)
    // }}
  >
    {children}
  </button>
  )
}


export default MyButton