import { BsSunFill, BsFillMoonStarsFill } from 'react-icons/bs'
import '../styles/themeswitcher.css'
import '../App.css'
import { globalContext } from './GlobalContext'
import { useContext, useEffect } from 'react'

export default function ThemeSwitcher() {

  const { theme, switchTheme } = useContext(globalContext)

  useEffect(() => {
    console.log(theme)
  }, [theme])

  return (
    <>
      <div id="ts_container" 
        onClick={switchTheme}>
        <div id='ts_turn' className={`${theme}_switch`}>
          <div id='ts_light'>
            <BsSunFill id='ts_sun_icon'></BsSunFill>
          </div>
          <div id='ts_dark'>
            <BsFillMoonStarsFill id='ts_moon_icon'></BsFillMoonStarsFill>
          </div>
        </div>
      </div>
    </>
  )
}