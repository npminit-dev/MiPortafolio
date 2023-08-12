import './App.scss'
import AboutMe from './components/Main/AboutMe'
import React, { useContext } from 'react'
import ThemeSwitcher from './components/ThemeSwitcher'
import Projects from './components/Projects/Projects'
import { themeContext } from './components/ThemeContext'
import SectionDivider from './components/SectionDivider'

function App() {

  const { theme } = useContext(themeContext)

  return (       
    <main id='App' className={`${theme}`}>
      <ThemeSwitcher></ThemeSwitcher>
      <AboutMe></AboutMe>
      <SectionDivider tag={ 'PROYECTOS' }></SectionDivider>
      <Projects></Projects>
      <SectionDivider tag={ 'HABILIDADES' }></SectionDivider>
    </main>     
  )
}

export default App
