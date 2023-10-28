import { useState, useEffect, useRef } from 'react'
import '../../App.scss'
import '../../styles/presentation.scss'
import { paragraphs } from '../../data/presentation'
import Paragraph from './Paragraph'
import { v4 as uuidv4 } from 'uuid';


export default function Presentation() {

  const [ flag, setflag ] = useState(false)
  const [status, setStatus] = useState(['pending', 'inactive', 'inactive', 'inactive', 'inactive'])
  const containerRef = useRef(null)

  useEffect(() => {
    setTimeout(() => setflag(true), 300)
  }, [])

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
    </div>
  )
}