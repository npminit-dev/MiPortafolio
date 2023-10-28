import './App.scss'
import AboutMe from './components/Main/AboutMe'
import Projects from './components/Projects/Projects'
import SectionDivider from './components/SectionDivider'
import Skills from './components/Skills/Skills'
import DrawSVG from './components/Decorations/DrawSVG'
import { DrawContextProvider } from './components/DrawContext'
import { gears, globe, paperPlane, rocketShip, hand_ideas, coffee, mouse, working, thinking, community, computer, snowstar, bird } from './data/svgData'
import NetWorks from './components/Info&Contact/Networks'
import SolarSystemCanvas from './components/SolarSystem/SolarSysyCanvas'
import { useFont } from '@react-three/drei'

function App() {

  return (       
    <main id='App'>
      <DrawContextProvider>
        <DrawSVG {...paperPlane}></DrawSVG>
        <DrawSVG {...rocketShip} ></DrawSVG>
        <DrawSVG {...globe}></DrawSVG>
        <DrawSVG {...gears}></DrawSVG>

        <AboutMe></AboutMe>

        <SectionDivider 
          tag={ 'PROYECTOS' } 
          children={
            <>
              <DrawSVG {...computer}></DrawSVG>
              <DrawSVG {...coffee}></DrawSVG>
            </>
        }></SectionDivider>
        <Projects></Projects>
        
        <SectionDivider 
          tag={ 'HABILIDADES' }
          children={
            <>
              <DrawSVG {...working}></DrawSVG>
              <DrawSVG {...thinking}></DrawSVG>
            </>
        }></SectionDivider>
        <Skills></Skills>

        <SectionDivider tag={ 'CONTACTO' }></SectionDivider>
        <NetWorks></NetWorks>
        <DrawSVG {...community}></DrawSVG>
        <DrawSVG {...bird}></DrawSVG>
        
      </DrawContextProvider>
      <SolarSystemCanvas></SolarSystemCanvas>
      <div id='background__pattern'></div>
    </main>     
    
  )
}

export default App
