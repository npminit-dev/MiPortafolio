import Skill from "./Skill"
import { v4 as uuidv4 } from 'uuid'
import '../../styles/skills.scss'

export default function SkillList({ skillist }) {

  return (
    <div className="skills__list">
      <span className="skills__list__title">{ skillist.title }</span>
      <ul className="skills__list__list">
        {
          skillist.skills.map(skill => 
            <Skill 
              key={uuidv4()}
              skill={skill}
            ></Skill>  
          )
        }
      </ul>
    </div>
  )
}