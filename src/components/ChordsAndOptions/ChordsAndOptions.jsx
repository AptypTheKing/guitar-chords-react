import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import MyButton from '../button/MyButton'
import Guitar from '../guitar/Guitar'
import chordImgs from '../chordsList.js'
import cl from '../button/MyButton.module.css'
import createDiv from '../createDiv/createDiv'

const ChordsAndOption = () => {

  const [note, setNote] = useState('')
  const [scale, setScale] = useState('Maj')
  const [alt, setAlt] = useState('')
  const [chord, setChord] = useState('')
  const finalChord = useMemo(() => {
    if (
      chord === 'EsharpMaj' || 
      chord === 'EMinsharpMaj'||
      chord === 'EsharpMin' || 
      chord === 'EMinsharpMin'||
      chord === 'HMinsharpMaj' ||
      chord === 'HsharpMaj' ||
      chord === 'HMinsharpMin' ||
      chord === 'HsharpMin' ||
      chord === 'FflatMaj' || 
      chord === 'FMinflatMaj'||
      chord === 'FflatMin' || 
      chord === 'FMinflatMin'||
      chord === 'CMinflatMaj' ||
      chord === 'CflatMaj' ||
      chord === 'CMinflatMin' ||
      chord === 'CflatMin'
    ) {
      return note + scale
    }
    return note + alt + scale
  }, [chord])

  let guitar = document.querySelector('#guitarDiv')

  const activeChord = useRef()
  const activeNote = useRef()
  const activeAlt = useRef()

  const flat = document.querySelector('#flat')
  const sharp = document.querySelector('#sharp')
  const maj = document.querySelector('#maj')
  const min = document.querySelector('#min')

  const addNote = (e) => {
    let active = document.querySelector('.MyButton_showed__6mnOo')
    if (e.target.tagName !== 'BUTTON') return
    
    if (activeNote.current == e.target) {
      showNote(e)
      setNote('')
      activeNote.current = ''
      return
    }
    if (active) {
      showNote(e)
    }
    if (scale == 'Maj') {
      maj.classList.add(cl.showed)
    }
    showNote(e)
    activeNote.current = e.target
    setNote(e.target.innerHTML)
  }

  const addAlt = (e) => {
    if (e.target.tagName !== 'BUTTON') return
    if (activeAlt.current == e.target) {
      e.target.classList.remove(cl.showed)
      setAlt('')
      activeAlt.current = ''
      return
    }
    activeAlt.current = e.target
    setAlt(e.target.id)
  }

  const addScale = (e) => {
    if (e.target.tagName !== 'BUTTON') return
    setScale(e.target.innerHTML)
  }

  const createChord = () => {
    setChord(note + alt + scale)
  }

  const showNote = (e) => {
    let active = document.querySelector('.MyButton_showed__6mnOo')
    if (activeNote.current == e.target) {
      e.target.classList.remove(cl.showed)
    }
    if (active) {
      active.classList.remove(cl.showed)
    }
    e.target.classList.add(cl.showed)
  }

  const showScale = () => {
    if (scale == 'Maj') {
      maj.classList.add(cl.showed)
      min.classList.remove(cl.showed)
    } else {
      maj.classList.remove(cl.showed)
      min.classList.add(cl.showed)
    }
  }

  const showAlt = () => {
    if (alt == 'sharp') {
      sharp.classList.add(cl.showed)
      flat.classList.remove(cl.showed)
    }
    if (alt == 'flat') {
      flat.classList.add(cl.showed)
      sharp.classList.remove(cl.showed)
    }
    if (note === 'H' || note === 'E') {
      sharp.classList.remove(cl.showed)
    }
    if (note === 'C' || note === 'F') {
      flat.classList.remove(cl.showed)
    }
  }

  const loadDiv = () => {
    if (guitar.querySelector('.chordShowed')) {
      guitar.querySelector('.chordShowed').remove()
      guitar.append(createDiv(finalChord))
      activeChord.current = guitar.lastChild
    } else { 
      guitar.append(createDiv(finalChord))
      activeChord.current = guitar.lastChild
    }
  }
    
  const disableBtn = () => {
    if (sharp.hasAttribute('disabled')) {
      sharp.removeAttribute('disabled')
    }
    if (flat.hasAttribute('disabled')) {
      flat.removeAttribute('disabled')
    }
    if (note === 'H' || note === 'E') {
      sharp.setAttribute('disabled', 'disabled')
    }
    if (note === 'C' || note === 'F') {
      flat.setAttribute('disabled', 'disabled')
    }
  }

  const clearChord = () => {
    if (activeChord.current) {
      activeChord.current.remove()
      let showed = document.querySelectorAll('.MyButton_showed__6mnOo')
      for (let btn of showed) {
        btn.classList.remove(cl.showed)
      }
    }
  }

  useEffect(() => {
    createChord()
   }, [note, alt, scale])

  useEffect(() => {
    if (!note) {
      clearChord()
      return
    }
    disableBtn()
    loadDiv()
    document.body.style.overflow = 'hidden'
    showScale()
    showAlt()
  }, [finalChord])

  return (
    <div className="buttons">
      <div
        onClick={addNote}
        className="chords"
      >
        <MyButton >C</MyButton>
        <MyButton >D</MyButton>
        <MyButton >E</MyButton>
        <MyButton >F</MyButton>
        <MyButton >G</MyButton>
        <MyButton >A</MyButton>
        <MyButton >H</MyButton>
      </div>
      <div className="options">
        <div 
          onClick={addScale}
          className="scale"
        >
          <MyButton id="maj">Maj</MyButton>
          <MyButton id="min">Min</MyButton>
        </div>
        <div 
          onClick={addAlt}
          className="alt"
        >
          <MyButton
            id="sharp"
          >#</MyButton>
          <MyButton
            id="flat"
          >b</MyButton>
        </div>
      </div>
    </div>
  )
}

export default ChordsAndOption