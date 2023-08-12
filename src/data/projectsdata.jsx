import { BiLogoCss3, BiLogoNodejs, BiLogoJavascript, BiLogoTypescript, BiLogoReact, BiLogoHtml5 } from 'react-icons/bi'
import { FaBootstrap } from 'react-icons/fa'
import { AiOutlineAntDesign } from 'react-icons/ai'
import { SiJest } from 'react-icons/si'

export const projectsdata = [
  {
    name: 'BookNexus',
    info: 'Web de libros con React/TS/Ant-Design (prueba tecnica de @midudev)',
    cover: 'https://i.ibb.co/G0jzf8s/Book-Nexus.gif',
    link: 'https://dreamy-vacherin-eba168.netlify.app/',
    tecs: ['HTML5', 'CSS3', 'NodeJS', 'React', 'JavaScript', 'TypeScript', 'Ant-Design', 'Jest'],
    repo: 'https://github.com/npminit-dev/npminit-dev.git'
  },
  {
    name: 'Landing Page',
    info: 'Landing page con Bootstrap5',
    cover: 'https://i.ibb.co/6R5SHL2/Landing-Page.gif',
    link: 'https://capable-kringle-1fe2b3.netlify.app/',
    tecs: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap5'],
    repo: 'https://github.com/npminit-dev/BSLandingPage.git'
  },
  {
    name: 'Football teams CRUD',
    info: 'CRUD de equipos de fútbol con React y Bootstrap5',
    cover: 'https://i.ibb.co/gRCyMbL/Football-Teams-CRUD.gif',
    link: 'https://melodious-licorice-c983f3.netlify.app/',
    tecs: ['HTML5', 'CSS3', 'NodeJS', 'JavaScript', 'React', 'Bootstrap5'],
    repo: 'https://github.com/npminit-dev/BS5-React-CRUD.git'
  },
  { 
    name: 'IndexedDB CRUD',
    info: 'CRUD con VainillaJS y IndexedDB',
    cover: 'https://i.ibb.co/gP1HKjF/Indexed-DBCRUD.gif',
    link: 'https://fluffy-snickerdoodle-8f13a1.netlify.app/',
    tecs: ['HTML5', 'CSS3', 'JavaScript'],
    repo: 'https://github.com/npminit-dev/Vainilla-CRUD.git'
  },
  {  
    name: 'RealTime Chat',
    info: 'Chat en tiempo real entre 2 pestañas con Vainilla y Service Workers',
    cover: 'https://i.ibb.co/WFrPB0R/Real-Time-CHAT.gif',
    link: 'https://kaleidoscopic-muffin-fe5fc9.netlify.app/',
    tecs: ['HTML5', 'CSS3', 'JavaScript'],
    repo: 'https://github.com/npminit-dev/RealTimeChat.git'
  }
]

export const tecs = [
  {
    name: 'HTML5',
    color: '#f64a1d',
    icon: <BiLogoHtml5 className='project_tecs__tecbox__icon'/>
  },
  {
    name: 'CSS3',
    color: '#254bdc',
    icon: <BiLogoCss3 className='project_tecs__tecbox__icon'/>
  },
  {
    name: 'NodeJS',
    color: '#87cf30',
    icon: <BiLogoNodejs className='project_tecs__tecbox__icon'/>
  },
  {
    name: 'JavaScript',
    color: '#e6a42d',
    icon: <BiLogoJavascript className='project_tecs__tecbox__icon'/>
  },
  {
    name: 'TypeScript',
    color: '#377cc8',
    icon: <BiLogoTypescript className='project_tecs__tecbox__icon'/>
  },
  {
    name: 'React',
    color: '#1ba1cc',
    icon: <BiLogoReact className='project_tecs__tecbox__icon rotatable'/>,
  },
  {
    name: 'Bootstrap5',
    color: '#7b18f7',
    icon: <FaBootstrap className='project_tecs__tecbox__icon'/>
  },
  {
    name: 'Ant-Design',
    color: '#f6293b',
    icon: <AiOutlineAntDesign className='project_tecs__tecbox__icon'/>
  },
  {
    name: 'Jest',
    color: '#8f1844',
    icon: <SiJest className='project_tecs__tecbox__icon resizable'/>
  }
]