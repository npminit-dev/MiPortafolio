import { BsSunFill, BsFillMoonStarsFill } from 'react-icons/bs'
import '../styles/themeswitcher.scss'
import '../App.scss'

export default function ThemeSwitcher() {

  return (
    <>
      <div id="ts_container">
        <div id='ts_turn'>
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