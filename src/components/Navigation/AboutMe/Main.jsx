import { useContext, useState, useEffect, useRef } from "react";
import { globalContext } from "../../GlobalContext";
import '../../../App.css'
import '../../../styles/main.css'

export default function Main() {

  const { theme } = useContext(globalContext);
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
    <div id="main_container" ref={mainRef} className={`${theme}`}>
      <span id="main_name" className={`${theme} ${hovered ? 'main_name_out' : 'main_name_in'}`}>
        <span>JORGE</span>
        <span>BALSAMO</span>
      </span>
      <div id="midline" className={`${theme}`}>
        <span className={`${hovered ? 'midline_out' : 'midline_in'}`}></span>
      </div>
      <span id="main_role" className={`${theme} ${hovered ? 'main_role_out' : 'main_role_in'}`}>
        <span>FRONT</span>
        <span>END</span>
        <span>DEV</span>
      </span>
    </div>
  )
}