import { BsSunFill, BsMoonStarsFill } from 'react-icons/bs'
import { useContext } from 'react'
import { themeContext } from './ThemeContext'
import '../styles/themeswitcher.scss'

export default function ThemeSwitcher() {

  const { theme, switchTheme } = useContext(themeContext)

  return (
    <div id='theme_s' onClick={switchTheme}>
    { 
      theme === 'light' ? 
      <BsSunFill id='theme_s__icon-light'/> : 
      <BsMoonStarsFill id='theme_s__icon-dark'/>
    }
    </div>
  )
}