import SectionsLinks from "./SectionsLinks";
import { useContext, useEffect, useRef, useState } from "react";
import { themeContext } from "../GlobalContext";
import '../../App.css'
import '../../styles/navigation.css'

const DELAY = 2500

const useTimer = (setVisible) => {
  const timer = useRef(null);
  const resetTimer = () => {
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setVisible(false), DELAY)
  }
  const clearTimer = () => clearTimeout(timer)
  return [resetTimer, clearTimer]
}

export default function Navigation() {
  const { theme, switchTheme } = useContext(themeContext);
  const [visible, setVisible] = useState(true);
  const [resetTimer, clearTimer] = useTimer(setVisible);

  const thresholdRef = useRef(null);
  const navRef = useRef(null);

  useEffect(() => {
    const handleMouseEnter = () => {
      if (!visible) setVisible(true);
      resetTimer();
    };

    const handleMouseMove = () => resetTimer();
    const handleMouseLeave = () => clearTimer();
    
    const handleScroll = () => {
      if (!visible) setVisible(true);
      resetTimer();
    };

    thresholdRef.current?.addEventListener('mouseenter', handleMouseEnter);
    navRef.current?.addEventListener('mousemove', handleMouseMove);
    navRef.current?.addEventListener('mouseleave', handleMouseLeave);
    globalThis.addEventListener('scroll', handleScroll);

    return () => {
      thresholdRef.current?.removeEventListener('mouseenter', handleMouseEnter);
      navRef.current?.removeEventListener('mousemove', handleMouseMove);
      navRef.current?.removeEventListener('mouseleave', handleMouseLeave);
      globalThis.removeEventListener('scroll', handleScroll);
    };
  }, [visible, resetTimer, clearTimer]);

  return (
    <>
      <nav id={'navigation'} 
        ref={navRef}
        className={`${theme} ${visible ? 'navappear' : 'navdisappear'}`} >
        <span 
          id={'navigation_title'} 
          className={theme}>Mi portafolio</span>
        <SectionsLinks></SectionsLinks>
      </nav>
      <div 
        id='navigation_background'
        className={`${visible ? 'navappear' : 'navdisappear'}`}
      ></div>
      <div 
        ref={thresholdRef}
        id='navigation_visible_threshold'
        
      ></div>
      <main>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
      </main>
    </>
  )
}