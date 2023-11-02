import { useEffect, useState } from 'react';
import '../../App.scss'
import "../../styles/aboutme.scss";
import Main from "./Main";
import MyPhoto from "./MyPhoto";
import PersonalInfo from './PersonalInfo';
import Presentation from './Presentation'

export default function AboutMe() {

  const [pres_enabled, setPres_enabled] = useState(false)

  useEffect(() => {
    setTimeout(() => setPres_enabled(true), 2500)
  }, [])

  return (
    <section id="aboutme_container">
      <Main></Main>
      <MyPhoto></MyPhoto>
      {
        pres_enabled && <Presentation></Presentation>
      }
      <PersonalInfo></PersonalInfo>
    </section>
  );
}
