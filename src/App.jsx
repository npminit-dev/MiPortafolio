import './App.scss'
import AboutMe from './components/Main/AboutMe'
import React, { useContext } from 'react'
import ThemeSwitcher from './components/ThemeSwitcher'
import Projects from './components/Projects/Projects'
import { themeContext } from './components/ThemeContext'

function App() {

  const { theme } = useContext(themeContext)

  return (
    <React.StrictMode>       
      <main id='App' className={`${theme}`}>
        <ThemeSwitcher></ThemeSwitcher>
        <AboutMe></AboutMe>
        <Projects></Projects>
      </main>     
    </React.StrictMode>
  )
}

export default App
