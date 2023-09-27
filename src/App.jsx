import './App.scss'
import AboutMe from './components/Main/AboutMe'
import React, { useContext } from 'react'
import ThemeSwitcher from './components/ThemeSwitcher'
import Projects from './components/Projects/Projects'
import { themeContext } from './components/ThemeContext'
import SectionDivider from './components/SectionDivider'
import Skills from './components/Skills/Skills'

function App() {

  const { theme } = useContext(themeContext)

  return (       
    <main id='App' className={`${theme}`}>
      <ThemeSwitcher></ThemeSwitcher>
      <AboutMe></AboutMe>
      <SectionDivider tag={ 'PROYECTOS' }></SectionDivider>
      <Projects></Projects>
      <SectionDivider tag={ 'HABILIDADES' }></SectionDivider>
      <Skills></Skills>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </main>     
  )
}

export default App
