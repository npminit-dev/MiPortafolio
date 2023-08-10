import SectionsLinks from "./SectionsLinks";
import { useEffect, useRef, useState } from "react";
import '../../App.scss'
import '../../styles/navigation.scss'
import ThemeSwitcher from "../ThemeSwitcher";

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
    
    const handleScroll = () => {
      if (!visible) setVisible(true);
      resetTimer();
    };

    thresholdRef.current?.addEventListener('mouseenter', handleMouseEnter);
    navRef.current?.addEventListener('mousemove', handleMouseMove);
    globalThis.addEventListener('scroll', handleScroll);

    return () => {
      thresholdRef.current?.removeEventListener('mouseenter', handleMouseEnter);
      navRef.current?.removeEventListener('mousemove', handleMouseMove);
      globalThis.removeEventListener('scroll', handleScroll);
    };
  }, [visible, resetTimer, clearTimer]);

  return (
    <>
      <nav id={'navigation'} 
        ref={navRef}
        className={`${visible ? 'navappear' : 'navdisappear'}`} >
        <span id={'navigation_title'}>MI PORTAFOLIO</span>
        <SectionsLinks></SectionsLinks>
        <ThemeSwitcher></ThemeSwitcher>
      </nav>
      
      <div 
        ref={thresholdRef}
        id='navigation_visible_threshold'
      ></div>
    
    </>
  )
}