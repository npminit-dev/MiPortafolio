import { useState, useEffect, useRef, useContext } from 'react'
import { globalContext } from '../../GlobalContext'
import '../../../App.css'
import '../../../styles/presentation.css'
import Lens from './Lens'
import { paragraphs } from '../../../data/presentation'
import Paragraph from './Paragraph'
import { v4 as uuidv4 } from 'uuid';

export default function Presentation() {

  const { theme } = useContext(globalContext)
  const containerRef = useRef(null)
  const [paragraphStatus, setParagraphStatus] = useState([false, false, false, false])

  useEffect(() => {

  }, [])

  return (
    <div
      id='presentation_container'
      className={` ${theme}`}
      ref={containerRef}
    >
      {
        paragraphs.map((elem, i) => {
          return (
            <Paragraph
              content={elem}
              setParagraphStatus={setParagraphStatus}
              index={i}
              key={uuidv4()}
            ></Paragraph>
          )
        })
      }
      <Lens containerRef={containerRef}></Lens>
    </div>
  )
}