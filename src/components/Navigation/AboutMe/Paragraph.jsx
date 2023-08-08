import { useState, useEffect, useCallback } from 'react'
import '../../../app.css'
import '../../../styles/presentation.css'
import { v4 as uuidv4 } from 'uuid';

export default function Paragraph({ content, i, status, setStatus, start }) {

  const [partial, setPartial] = useState('')
  const [timer, setTimer] = useState()
  const [index, setindex] = useState(0)

  const letterDelay = useCallback(() => {
    return new Promise(res => {
      const timer = setTimeout(() => res(''), 20)
      setTimer(timer)
    })
  }, [])

  const printLetter = () => {
    return new Promise(async (res) => {
      await letterDelay()
      setPartial(partial => partial += content[index])
      setindex(index + 1)
      res('')
    })
  }

  useEffect(() => {
    const exe = async () => {
      if(index < content.length) {
        await printLetter(index.current)  
      } else clearTimeout(timer)    
    }
     
    if(start === 'pending') exe()

    if(index >= content.length) setTimeout(() => {
      setStatus(status => {
        return status.map((ord, ord_i) => {
          if(ord_i === i) return 'done'
          if(ord_i === i + 1) return 'pending'
          return ord
        })
      })
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [partial])

  return (
    <div className='paragraph_container'>
      <span>
        { [...content].map((element, i) => {
          if(start === 'inactive') {
            return <span 
            key={uuidv4()} 
            className='paragraph_letter-hide'>
            { element }
          </span>
          }
          if(start === 'pending') {
            if(partial[i]) return ( 
              <span 
                key={uuidv4()} 
                className='paragraph_letter-shown'>
                { element }
              </span>)
            else return <span 
              key={uuidv4()} 
              className='paragraph_letter-hide'>
              { element }
            </span>
          }
          if(start === 'done') {
            return <span 
            key={uuidv4()} 
            className='paragraph_letter-shown'>
            { element }
          </span>
          }
         
        })
        }
      </span>
    </div>
  )
}