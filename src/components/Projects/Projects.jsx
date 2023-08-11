import { useContext, useState } from 'react'
import { themeContext } from '../ThemeContext'
import { projectsdata } from '../../data/projectsdata'
import Project from './Project'
import { v4 as uuidv4 } from 'uuid'
import { BsChevronCompactDown } from 'react-icons/bs'
import '../../styles/projects.scss'

export default function Projects() {

  const { theme } = useContext(themeContext)
  const [projects, setProjects] = useState(projectsdata)

  return (
    <section className={`projects ${theme}`}>
      <div className='projects__titlebox'>
        <span className='projects__titlebox__title'>
          PROYECTOS
        </span>
        <span className='projects__titlebox__iconbox'>
          <BsChevronCompactDown className='projects__titlebox__iconbox__icon'/>
        </span>
      </div>
      <div className={` projects__box ${theme}`}>
      {
      projects.map(elem =>         
        <Project
          name={elem.name}
          info={elem.info}
          cover={elem.cover}
          link={elem.link}
          repo={elem.repo}
          key={uuidv4()}
        ></Project>
      )
      }
      </div>
    </section>
  )
}