import './App.scss'
import AboutMe from './components/Main/AboutMe'
import React, { useContext } from 'react'
import ThemeSwitcher from './components/ThemeSwitcher'
import Projects from './components/Projects/Projects'
import { themeContext } from './components/ThemeContext'
import SectionDivider from './components/SectionDivider'
import Skills from './components/Skills/Skills'
import Dec1 from './components/Decorations/Dec1'
import { DrawContextProvider } from './components/DrawContext'

function App() {

  const { theme } = useContext(themeContext)

  return (       
    <main id='App' className={`${theme}`}>
      <DrawContextProvider>
        <Dec1 
          top={300}
          left={0}
          height={800} 
          width={200}
          zoomX={100}
          zoomY={400}
          color={'#bbb'}
          strokeWidth={2}
        ></Dec1>
      </DrawContextProvider>
      <ThemeSwitcher></ThemeSwitcher>
      <AboutMe></AboutMe>
      <SectionDivider tag={ 'PROYECTOS' }></SectionDivider>
      <Projects></Projects>
      <SectionDivider tag={ 'HABILIDADES' }></SectionDivider>
      <Skills></Skills>
      <br></br>
      <br></br>
    </main>     
  )
}

export default App
