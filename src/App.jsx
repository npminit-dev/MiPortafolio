import './App.scss'
import AboutMe from './components/Main/AboutMe'
import React, { useContext } from 'react'
import Projects from './components/Projects/Projects'
import SectionDivider from './components/SectionDivider'
import Skills from './components/Skills/Skills'
import DrawSVG from './components/Decorations/DrawSVG'
import { DrawContextProvider } from './components/DrawContext'
import { gears, globe, paperPlane, rocketShip } from './data/svgData'
import NetWorks from './components/Info&Contact/Networks'
import SolarSystemCanvas from './components/SolarSystem/SolarSysyCanvas'

function App() {

  return (       
    <main id='App'>
      <DrawContextProvider>
        <DrawSVG {...paperPlane}></DrawSVG>
        <DrawSVG {...rocketShip} ></DrawSVG>
        <DrawSVG {...globe}></DrawSVG>
        <DrawSVG {...gears}></DrawSVG>

        <AboutMe></AboutMe>

        <SectionDivider tag={ 'PROYECTOS' }></SectionDivider>
        <Projects></Projects>
        
        <SectionDivider tag={ 'HABILIDADES' }></SectionDivider>
        <Skills></Skills>

        <SectionDivider tag={ 'INFORMACIÓN Y CONTACTO' }></SectionDivider>
        <NetWorks></NetWorks>
        
      </DrawContextProvider>
      <SolarSystemCanvas></SolarSystemCanvas>
    </main>     
    
  )
}

export default App
