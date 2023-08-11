import '../../App.scss'
import '../../styles/presentation.scss'
import { useEffect, useRef } from 'react'

export default function Lens({ containerRef }) {

  const lensRef = useRef();

  useEffect(() => {

    const mouseEnterHandler = () => lensRef.current.classList = ' lens lens_in'
    const mouseLeaveHandler = () => lensRef.current.classList = ' lens lens_out'
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
    <div ref={lensRef} className='lens lens_invisible'>
      <span id='lanter_handler'>
      </span>
    </div>
  )
}