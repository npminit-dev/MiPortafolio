import { useState, useEffect, useRef } from 'react'
import '../../styles/personalinfo.scss'

const getCoords = (element) => {
  let rect = element.target.getBoundingClientRect()
  let width = rect.width
  let height = rect.height
  let x = ((element.clientX - rect.x) / width - 0.5) .toFixed(2)
  let y = ((element.clientY - rect.y) / height - 0.5) .toFixed(2)
  return [x, y]
}

export default function PersonalInfo() {

  const boxHoverRef = useRef(null)
  const boxRef = useRef(null)

  useEffect(() => {
    boxHoverRef.current && boxHoverRef.current.addEventListener('mousemove', (e) => {
      let [x, y] = getCoords(e)
      boxRef.current.style.transform =  `rotate3d(${x}, ${y}, 0, -15deg)`
      console.log(boxRef.current.getAnimations())
    })

    boxHoverRef && boxHoverRef.current.addEventListener('mouseleave', () => {
      boxRef.current.animate({
        transform: `rotate3d(0, 0, 0, 0)`
      }, {
        duration: 800,
        fill: 'forwards'
      })
    })

    boxHoverRef && boxHoverRef.current.addEventListener('mouseenter', () => {
      boxRef && boxRef.current.getAnimations().forEach(elem => elem.cancel())
    })
  }, [])

  return (
    <>
      <div id='p_info_hover_box'
        ref={boxHoverRef}
      >
        <div 
          ref={boxRef}
          id='p_info_box' 
        >
          <h1>hola mundo</h1>
          <h1>hola mundo</h1>
          <h1>hola mundo</h1>
          <h1>hola mundo</h1>
        </div>
      </div>
    </>
    
   
  )
}
