import { IoPersonSharp } from 'react-icons/io5'
import { PiProjectorScreenChartFill } from 'react-icons/pi'
import { GiPathDistance } from 'react-icons/gi'
import '../../App.scss'
import '../../styles/sectionlinks.scss'

export default function SectionsLinks() {

  return (
    <div id='slinks_container'>
      <span className={`slinks_linkcontainer`}>
        <a 
          href='#aboutme_flag' 
          className='slinks_link'
          title='SOBRE MI'>
          <IoPersonSharp></IoPersonSharp>
        </a>
      </span>
      <span className={'slinks_linkcontainer'}>
        <a 
          href='' 
          className='slinks_link'
          title='PROYECTOS'>
          <PiProjectorScreenChartFill></PiProjectorScreenChartFill>
        </a>
      </span>
      <span className='slinks_linkcontainer'>
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