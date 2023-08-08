import './App.css'
import Navigation from './components/Navigation/Navigation'
import AboutMe from './components/Navigation/AboutMe/AboutMe'
import React from 'react'

function App() {

  return (
    <div>
      <React.StrictMode>
        <Navigation></Navigation>
        <main>
          <div id="aboutme_flag"></div>
          <AboutMe></AboutMe>
          <br></br>
          <br></br>
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
      </React.StrictMode>
    </div>
  )
}

export default App
