import { useContext, useState } from 'react'
import { themeContext } from '../ThemeContext'
import { projectsdata, tecs } from '../../data/projectsdata'
import Project from './Project'
import { v4 as uuidv4 } from 'uuid'
import '../../styles/projects.scss'

export default function Projects() {

  const getTecsData = (tecsarr) => {
    return tecsarr.map(tec => tecs.find(tecdata => tecdata.name == tec))
  }

  const { theme } = useContext(themeContext)
  const [projects, setProjects] = useState(projectsdata)

  return (
    <section className={`projects ${theme}`}>
      <div className={` projects__box ${theme}`}>
      {
      projects.map(elem =>         
        <Project
          name={elem.name}
          info={elem.info}
          cover={elem.cover}
          tecs={getTecsData(elem.tecs)}
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