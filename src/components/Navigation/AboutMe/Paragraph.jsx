import { useState } from 'react'
import '../../../app.css'
import '../../../styles/presentation.css'


export default function Paragraph({ content, setParagraphStatus, index }) {

  const [ partial, setPartial ] = useState('')

  return (
    <div>
      <span>
        { partial }
      </span>
    </div>
  )
}