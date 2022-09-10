let load
let showed = false

let guitar = document.querySelector('.guitar')

let chords = document.querySelector('.chords')
let options = document.querySelector('.options')
let scale = options.querySelector('.scale')
let alt = options.querySelector('.alt')
let flat = alt.querySelector('#flat')
let sharp = alt.querySelector('#sharp')
let maj = scale.querySelector('#maj')
let min = scale.querySelector('#min')

let currentNote = ''
let currentScale = 'maj'
let currentAlt = ''

chords.addEventListener('click', function(event) { // handle the click on chord
  let target = event.target
  let active = document.querySelector('.showed')

  if (target.tagName != 'BUTTON') return
  currentNote = target.innerHTML
  if (active) {
    active.classList.remove('showed')
    target.classList.toggle('showed')
  }
  if (active === target) {
    active.classList.remove('showed')
    currentNote = ''
  } else {
    target.classList.add('showed')
  }
  showChord()
})

function loadChord(letter) { // load and locate the chords
  let div = document.createElement('div')
  div.class = `chord${letter}`
  div.style.textAlign = 'center'
  div.innerHTML = `<img class='chord${letter}' src='chords/chord${letter}.png' style='max-width: 100%' width='1400px' id='chord${letter}'>`
              
  let guitar = document.querySelector('.guitar')
  let guitarCoords = guitar.getBoundingClientRect()
                                
  div.style.position = 'relative';
  div.style.top =  -guitarCoords.height + 'px'
  div.style.zIndex = '1'

  return div
}

function showChord() { // show the chord
  if (showed) {
    guitar.lastChild.remove()
    showed = false
  }

  for (let btn of alt.querySelectorAll('.btn')) {
    if (btn.hasAttribute('disabled')) {
      btn.removeAttribute('disabled')
    }
  }

  if (!currentNote) {
    clear()
    return
  }

  if (currentNote === 'H' || currentNote === 'E') {
    sharp.setAttribute('disabled', 'disabled')
    sharp.classList.remove('showed')
    if (currentAlt === 'sharp') {
      currentAlt = ''
    }
  } else if (currentNote === 'C' || currentNote === 'F') {
    flat.setAttribute('disabled', 'disabled')
    flat.classList.remove('showed')
    if (currentAlt === 'flat') {
      currentAlt = ''
    }
  }

  load = loadChord(currentNote + currentAlt + currentScale)
  document.body.style.overflow = 'hidden'
  guitar.append(load)
  showed = true

  showScale()
}

function clear() { // clear all selected chords and options
  let buttons = document.querySelector('.buttons')
  for (let btn of buttons.querySelectorAll('.btn')) {
    btn.classList.remove('showed')
  }
  currentAlt = ''
}

function showScale() {  // set and show default scale 'Maj'
  
  if (currentScale === 'maj' || !currentScale) {
    maj.classList.add('showed')
  } else {
    min.classList.add('showed')
  }
  return
 
}

scale.addEventListener('click', function(event) { // handle the click on Scale
  let target = event.target
  let active = scale.querySelector('.showed')

  if (target.tagName != 'BUTTON') return

  if (target === active) return

  if (!active) {
    target.classList.add('showed')
    currentScale = target.innerHTML.toLowerCase()
    return
  }

  active.classList.remove('showed')
  target.classList.add('showed')
  currentScale = target.innerHTML.toLowerCase()
  showChord()
  
})

alt.addEventListener('click', function(event) { // handle the click on Alt
  let target = event.target
  let active = alt.querySelector('.showed')

  if (target.tagName != 'BUTTON') return
  if (target === active) {
    target.classList.remove('showed')
    currentAlt = ''
    showChord()
    return
  }

  if (!active) {
    target.classList.add('showed')
    currentAlt = target.id
    showChord()
    return
  }

  active.classList.remove('showed')
  target.classList.add('showed')
  currentAlt = target.id
  showChord()
})

            