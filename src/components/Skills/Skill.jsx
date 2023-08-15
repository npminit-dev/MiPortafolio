import { v4 as uuidv4 } from 'uuid'

export default function Skill({ skill }) {

  return (
    <li className='skills__list__list__item' style={{ listStyle: 'none' }}>
    {
      typeof skill === 'string' ?
      <div 
        className='skills__list__list__item__item'>
        { skill }
      </div> : 
      typeof skill === 'object' && skill !== null ?
      <div 
        className='skills__list__list__item__sublist'>
        <div className='skills__list__list__item__sublist__title'>
          { skill.header }
        </div>
        <div className='skills__list__list__item__sublist__list'>
        { skill.content.map(subskill => 
          <span 
            key={uuidv4()} 
            className='skills__list__list__item__sublist__item'>
            { subskill }</span>
          )
        }
        </div>  
      </div> 
      : <></>
    }
    </li>
  )
}