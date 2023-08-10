import '../../../App.scss'
import "../../../styles/aboutme.scss";
import Main from "./Main";
import MyPhoto from "./MyPhoto";
import Presentation from './Presentation'

export default function AboutMe() {

  return (
    <section id="aboutme_container">
      <Main></Main>
      <MyPhoto></MyPhoto>
      <Presentation></Presentation>
    </section>
  );
}
