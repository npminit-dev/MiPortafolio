import './App.scss'
import AboutMe from './components/Main/AboutMe'
import React, { useContext } from 'react'
import ThemeSwitcher from './components/ThemeSwitcher'
import Projects from './components/Projects/Projects'
import { themeContext } from './components/ThemeContext'
import SectionDivider from './components/SectionDivider'
import Skills from './components/Skills/Skills'
import DrawSVG from './components/Decorations/DrawSVG'
import { DrawContextProvider } from './components/DrawContext'
import { OlogN, gears, globe, paperPlane, rocketShip } from './data/svgData'
import NetWorks from './components/Info&Contact/Networks'
import Solar from './components/Skills/Solar'

function App() {

  const { theme } = useContext(themeContext)

  return (       
    <main id='App' className={`${theme}`}>
      <DrawContextProvider>
        <DrawSVG {...paperPlane}></DrawSVG>
        <DrawSVG {...rocketShip} ></DrawSVG>
        {/* <DrawSVG {...OlogN}></DrawSVG> */}
        <DrawSVG {...globe}></DrawSVG>
        <DrawSVG {...gears}></DrawSVG>

        <ThemeSwitcher></ThemeSwitcher>

        <AboutMe></AboutMe>

        <SectionDivider tag={ 'PROYECTOS' }></SectionDivider>
        <Projects></Projects>
        
        <SectionDivider tag={ 'HABILIDADES' }></SectionDivider>
        <Skills></Skills>

        <SectionDivider tag={ 'INFORMACIÓN Y CONTACTO' }></SectionDivider>
        <NetWorks></NetWorks>
        <Solar></Solar>
      </DrawContextProvider>
    </main>     
    
  )
}

export default App
