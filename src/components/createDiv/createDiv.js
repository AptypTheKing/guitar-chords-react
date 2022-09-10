import chordImgs from "../chordsList"


const createDiv = (chord) => {
  let guitar = document.querySelector('#guitarDiv')
  let src = {}
  let div = document.createElement('div')

  src = chordImgs.find(el => el.name === chord)
  console.log(src)
  div.innerHTML = `<img src=${src.link} style='max-width: 100%' width='1400px'>`

  let guitarCoords = guitar.getBoundingClientRect()

  div.className = 'chordShowed'
  div.style.textAlign = 'center'
  div.style.position = 'relative';
  div.style.top = -guitarCoords.height + 'px'
  div.style.zIndex = '1'
  
  return div
}

export default createDiv