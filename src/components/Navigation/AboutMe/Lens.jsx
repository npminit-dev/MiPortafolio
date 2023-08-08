import '../../../App.css'
import '../../../styles/presentation.css'
import { useState, useEffect, useContext, useRef } from 'react'
import { globalContext } from '../../GlobalContext';

export default function Lens({ containerRef }) {

  const { theme } = useContext(globalContext)
  const lensRef = useRef();

  useEffect(() => {

    const mouseEnterHandler = () => lensRef.current.classList = theme + ' lens lens_in'
    const mouseLeaveHandler = () => lensRef.current.classList = theme + ' lens lens_out'
    const mouseMoveHandler = (e) => {
      const leftDistance = containerRef.current.getBoundingClientRect().left + window.scrollX
      const topDistance = containerRef.current.getBoundingClientRect().top + window.scrollY
      const X = Math.round((e.clientX + globalThis.scrollX) - leftDistance - (lensRef.current.offsetWidth / 2))
      const Y = Math.round((e.clientY + globalThis.scrollY) - topDistance - (lensRef.current.offsetHeight / 2))
      lensRef.current.style.transform = `translate(${X - 10}px,${Y - 18}px)`
    }

    containerRef.current.addEventListener('mouseenter', mouseEnterHandler)
    containerRef.current.addEventListener('mouseleave', mouseLeaveHandler)
    containerRef.current.addEventListener('mousemove', mouseMoveHandler)

    return () => {
      containerRef.current.removeEventListener('mouseenter', mouseEnterHandler)
      containerRef.current.removeEventListener('mouseleave', mouseLeaveHandler)
      containerRef.current.removeEventListener('mousemove', mouseMoveHandler)
    }

  }, [])

  return (
    <div ref={lensRef} className={`${theme} lens lens_invisible`}>
      <span id='lanter_handler'>
      </span>
    </div>
  )
}