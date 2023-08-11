import { useState, useEffect, useRef, useContext } from "react";
import { themeContext } from '../ThemeContext'
import '../../App.scss'
import '../../styles/main.scss'

export default function Main() {

  const { theme, switchTheme } = useContext(themeContext)
  const [ hovered, sethovered ] = useState(false)
  const mainRef = useRef(null)

  useEffect(() => {
    
    const hoverHandler = () => {
      Promise.all(mainRef.current.getAnimations({subtree: true}))
        .then(anims => anims.every(anim => anim.playState === 'finished') && sethovered(true))
    }

    const unhoverHandler = () => sethovered(false)
    
    if(mainRef.current) {
      mainRef.current.addEventListener('mouseenter', hoverHandler) 
      mainRef.current.addEventListener('mouseleave', unhoverHandler)
  
      return () => {
        mainRef.current.removeEventListener('mouseenter', hoverHandler)
        mainRef.current.removeEventListener('mouseleave', unhoverHandler)
      }
    }
  }, [])


  return (
    <div id="main" ref={mainRef}>
      <span id="main__name" className={`${hovered ? 'main_name_out' : 'main_name_in'} ${theme}`}>
        <span>JORGE</span>
        <span>BALSAMO</span>
      </span>
      <div id="main__midline">
        <span className={`${hovered ? 'midline_out' : 'midline_in'} ${theme}`}></span>
      </div>
      <span id="main__role" className={`${hovered ? 'main_role_out' : 'main_role_in'} ${theme}`}>
        <span>FRONT</span>
        <span>END</span>
        <span>DEV</span>
      </span>
    </div>
  )
}