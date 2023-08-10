import { useRef, useState, useEffect } from 'react'
import '../../../App.scss'
import '../../../styles/myphoto.scss'

export default function MyPhoto() {

  const [ centeredImg, setCenteredImg ] = useState(true)
  const imgRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {

    const containerWidth = containerRef.current.offsetWidth
    const containerHeight = containerRef.current.offsetHeight

    const mouseMoveHandler = (e) => {
      if(centeredImg) setCenteredImg(false)
      const leftDistance = containerRef.current.getBoundingClientRect().left + window.scrollX
      const topDistance = containerRef.current.getBoundingClientRect().top + window.scrollY
      const X = (e.clientX - leftDistance - containerHeight / 2) * -0.15
      const Y = (e.clientY - topDistance - containerWidth / 2) * -0.15
      imgRef.current.style.transform = `translate(${X}px,${Y}px)`
    }

    const mouseLeaveHandler = () => setCenteredImg(true)

    imgRef.current.addEventListener('mousemove', mouseMoveHandler)
    imgRef.current.addEventListener('mouseleave', mouseLeaveHandler)

    return () => {
      containerRef.current.removeEventListener('mousemove', mouseMoveHandler)
      containerRef.current.removeEventListener('mouseleave', mouseLeaveHandler)
    }
  }, [])

  return (
    <div id='myphoto_container' ref={containerRef}>
      <span id='photo_container'>
        <img ref={imgRef} 
          src='https://i.ibb.co/NKZcnpZ/veridity-lasombradelenga-o.webp'
          className={`${centeredImg ? 'img_normalized' : ''}`}
        ></img>
      </span>
      <span id='first' className='myphoto_circle_container'>
        <div className='myphoto_circle'></div>
      </span>
      <span id='second' className='myphoto_circle_container'>
        <div className='myphoto_circle'></div>
      </span>
      <span id='third' className='myphoto_circle_container'>
        <div className='myphoto_circle'></div>
      </span>
      <span id='fourth' className='myphoto_circle_container'>
        <div className='myphoto_circle'></div>
      </span>
    </div>
  )
}