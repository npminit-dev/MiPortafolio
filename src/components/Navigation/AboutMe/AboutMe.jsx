import { useContext } from "react";
import '../../../App.css'
import "../../../styles/aboutme.css";
import { globalContext } from "../../GlobalContext";
import Main from "./Main";
import MyPhoto from "./MyPhoto";
import Presentation from './Presentation'

export default function AboutMe() {
  const { theme } = useContext(globalContext);

  return (
    <section id="aboutme_container" className={`${theme}`}>
      <Main></Main>
      <MyPhoto></MyPhoto>
      <Presentation></Presentation>
    </section>
  );
}
