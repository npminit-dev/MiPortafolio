import { IoPersonSharp } from 'react-icons/io5'
import { PiProjectorScreenChartFill } from 'react-icons/pi'
import { GiPathDistance } from 'react-icons/gi'
import { useContext } from 'react'
import { globalContext } from '../GlobalContext'
import '../../App.css'
import '../../styles/sectionlinks.css'

export default function SectionsLinks() {

  const { theme } = useContext(globalContext)

  return (
    <div id='slinks_container' className={theme}>
      <span className={`slinks_linkcontainer ${theme}`}>
        <a 
          href='#aboutme_flag' 
          className='slinks_link'
          title='SOBRE MI'>
          <IoPersonSharp></IoPersonSharp>
        </a>
      </span>
      <span className={`slinks_linkcontainer ${theme}`}>
        <a 
          href='' 
          className='slinks_link'
          title='PROYECTOS'>
          <PiProjectorScreenChartFill></PiProjectorScreenChartFill>
        </a>
      </span>
      <span className={`slinks_linkcontainer ${theme}`}>
        <a 
          href='' 
          className='slinks_link'
          title='RUTA DE APRENDIZAJE'>
          <GiPathDistance></GiPathDistance>
        </a>
      </span>
    </div>
  )
}