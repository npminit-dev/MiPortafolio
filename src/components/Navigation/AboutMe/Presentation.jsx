import { useState, useEffect, useRef } from 'react'
import '../../../App.css'
import '../../../styles/presentation.css'
import Lens from './Lens'
import { paragraphs } from '../../../data/presentation'
import Paragraph from './Paragraph'
import { v4 as uuidv4 } from 'uuid';


export default function Presentation() {

  const [ flag, setflag ] = useState(false)
  const [status, setStatus] = useState(['pending', 'inactive', 'inactive', 'inactive', 'inactive'])
  const containerRef = useRef(null)

  useEffect(() => {
    setTimeout(() => setflag(true), 700)
  }, [])

  useEffect(() => {
    console.log(status)
  }, [status])

  return (
    <div
      id='presentation_container'
      ref={containerRef}
    >
      {
        flag && status.map((elem, i) => {
          return <Paragraph
            content={paragraphs[i]}
            i={i}
            status={status}
            setStatus={setStatus}
            start={elem}
            key={uuidv4()}
          ></Paragraph>
        })
      }
      <Lens containerRef={containerRef}></Lens>
    </div>
  )
}