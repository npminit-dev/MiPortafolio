import { BiLogoCss3, BiLogoNodejs, BiLogoJavascript, BiLogoTypescript, BiLogoReact, BiLogoHtml5 } from 'react-icons/bi'
import { FaBootstrap } from 'react-icons/fa'
import { AiOutlineAntDesign } from 'react-icons/ai'
import { SiJest, SiExpo } from 'react-icons/si'
import { TbBrandReactNative } from 'react-icons/tb'

export const projectsdata = [
  {
    name: 'BookNexus',
    info: 'Web de libros con React/TS/Ant-Design (prueba tecnica de @midudev)',
    cover: 'https://i.ibb.co/HrMvDNv/Book-Nexus.webp',
    thumbnail: 'https://i.ibb.co/3fVX707/Book-Nexus-tn.webp',
    link: 'https://dreamy-vacherin-eba168.netlify.app/',
    tecs: ['HTML5', 'CSS3', 'React', 'TypeScript', 'Ant-Design', 'Jest'],
    repo: 'https://github.com/npminit-dev/npminit-dev.git'
  },
  {
    name: 'Nasa APOD',
    info: 'App de las fotos astronómicas de los ultimos 6 dias, usando la API NASA-APOD',
    cover: 'https://i.ibb.co/2vgyjxY/Nasa-App.webp',
    thumbnail: 'https://i.ibb.co/S6yYbWs/Nasa-App-tn.webp',
    link: '#',
    tecs: ['TypeScript', 'React Native', 'Jest'],
    repo: 'https://github.com/npminit-dev/NASA-App.git'
  },
  {
    name: 'DailyFuel',
    info: 'App para controlar el consumo diario de calorías',
    cover: 'https://i.ibb.co/8cXYDbL/Daily-Fuel.webp',
    thumbnail: 'https://i.ibb.co/cvkzHCr/Daily-Fuel-tn.webp',
    link: '#',
    tecs: ['React Native', 'Expo Go'],
    repo: 'https://github.com/npminit-dev/DailyFuel.git'
  },
  {
    name: 'Landing Page',
    info: 'Landing page con Bootstrap5',
    cover: 'https://i.ibb.co/80kqmpC/Landing-Page-BS5.webp',
    thumbnail: 'https://i.ibb.co/Z2r64Zw/Landing-Page-BS5-tn.webp',
    link: 'https://capable-kringle-1fe2b3.netlify.app/',
    tecs: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap5'],
    repo: 'https://github.com/npminit-dev/BSLandingPage.git'
  },
  {
    name: 'Football teams CRUD',
    info: 'CRUD de equipos de fútbol con React y Bootstrap5',
    cover: 'https://i.ibb.co/GJzRpjC/CRUDBS5.webp',
    thumbnail: 'https://i.ibb.co/Jk753ZR/CRUDBS5-tn.webp',
    link: 'https://melodious-licorice-c983f3.netlify.app/',
    tecs: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Bootstrap5'],
    repo: 'https://github.com/npminit-dev/BS5-React-CRUD.git'
  },
  { 
    name: 'IndexedDB CRUD',
    info: 'CRUD con VainillaJS y IndexedDB',
    cover: 'https://i.ibb.co/ZGvBy74/Indexed-DBCRUD.webp',
    thumbnail: 'https://i.ibb.co/S5XQpnZ/Indexed-DBCRUD-tn.webp',
    link: 'https://fluffy-snickerdoodle-8f13a1.netlify.app/',
    tecs: ['HTML5', 'CSS3', 'JavaScript'],
    repo: 'https://github.com/npminit-dev/Vainilla-CRUD.git'
  },
  {  
    name: 'RealTime Chat',
    info: 'Chat en tiempo real entre 2 pestañas con Vainilla y Service Workers',
    cover: 'https://i.ibb.co/fGn6skd/Real-Time-Chat.webp',
    thumbnail: 'https://i.ibb.co/rs0W6y1/Real-Time-Chat-tn.webp',
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
  },
  {
    name: 'Expo Go',
    color: '#333',
    icon: <SiExpo className='project_tecs__tecbox__icon'></SiExpo>
  },
  {
    name: 'React Native',
    color: '#1977f2',
    icon: <TbBrandReactNative className='project_tecs__tecbox__icon rotatable'></TbBrandReactNative>
  }
]