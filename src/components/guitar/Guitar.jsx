import React from 'react'
import guitarImg from '../images/guitar.png'
import cl from './Guitar.module.css'

const Guitar = () => {
  return (
    <div className={cl.guitar} id="guitarDiv">
      <img className={cl.guitar__img} src={guitarImg} alt='guitar.png'/>
    </div>
  )
}

export default Guitar