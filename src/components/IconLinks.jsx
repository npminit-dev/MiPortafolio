import { AiFillGithub } from 'react-icons/ai'
import { BsStackOverflow } from 'react-icons/bs'

export default function IconLinks() {
  return (
    <div id='iconlinks_container'>
      <a 
        href='https://github.com/npminit-dev' 
        className='iconslinks_link'>
        <span className='iconlinks_iconcontainer'>
          <AiFillGithub className='iconlinks_icon'></AiFillGithub>
        </span>
      </a>
      <a 
        href='https://es.stackoverflow.com/users/224775/infinit3loop' 
        className='iconslinks_link'>
        <span className='iconlinks_iconcontainer'>
          <BsStackOverflow className='iconlinks_icon'></BsStackOverflow>
        </span>
      </a>
    </div>
  )
}