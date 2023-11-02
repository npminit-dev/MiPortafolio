import { useEffect, useRef } from "react";
import "../../styles/personalinfo.scss";

const getCoords = (element) => {
  let rect = element.target.getBoundingClientRect();
  let width = rect.width;
  let height = rect.height;
  let x = ((element.clientX - rect.x) / (width / 2) - 1).toFixed(2);
  let y = ((element.clientY - rect.y) / (height / 2) - 1).toFixed(2);
  return [x, y];
};

export default function PersonalInfo() {
  const boxHoverRef = useRef(null);
  const boxRef = useRef(null);
  const leaveAnim = useRef(null);

  useEffect(() => {
    boxHoverRef.current &&
      boxHoverRef.current.addEventListener("mousemove", (e) => {
        leaveAnim.current?.cancel();
        let [x, y] = getCoords(e);
        boxRef.current.style.transform = `rotate3d(${x}, ${y}, 0, 16deg)`;
      });

    boxHoverRef &&
      boxHoverRef.current.addEventListener("mouseleave", () => {
        leaveAnim.current?.cancel();
        leaveAnim.current = boxRef.current.animate(
          {
            transform: `rotate3d(0, 0, 0, 0)`,
          },
          {
            duration: 800,
            fill: "forwards",
            easing: "ease-out",
          }
        );
      });
  }, []);

  return (
    <div id="p__info__hover__box" ref={boxHoverRef}>
      <div ref={boxRef} id="p__info__box">
        <div id="p__info__box__info">
          <div id="p__info__box__imgbox">
            <img 
              id="p__info__box__imgbox__img"
              src='https://i.ibb.co/rtPfrTf/main.webp' 
              alt='Foto de la carta de presentacion' 
            ></img>
          </div>
          <div id="p__info__box__databox">
            <div className="p__info__box__databox__data">
              <strong className="p__info__box__databox__data__label">Nombre: </strong>
              <span className="p__info__box__databox__data__data">Jorge Antonio</span>
            </div>
            <div className="p__info__box__databox__data">
              <strong className="p__info__box__databox__data__label">Apellido: </strong>
              <span className="p__info__box__databox__data__data">Balsamo</span>
            </div>
            <div className="p__info__box__databox__data">
              <strong className="p__info__box__databox__data__label">Fecha de nacimiento: </strong>
              <time className="p__info__box__databox__data__data" dateTime="1995-02-15">15-02-1995</time>
            </div>
            <div className="p__info__box__databox__data">
              <strong className="p__info__box__databox__data__label">Vivo en: </strong>
              <span className="p__info__box__databox__data__data">Buenos Aires, Argentina</span>
            </div>
            <div className="p__info__box__databox__data">
              <strong className="p__info__box__databox__data__label">Edad: </strong>
              <span className="p__info__box__databox__data__data">28 años</span>
            </div>
            <div className="p__info__box__databox__data">
              <strong className="p__info__box__databox__data__label">Nacionalidad: </strong>
              <span className="p__info__box__databox__data__data">Argentino</span>
            </div>
          </div>
        </div>
        <div id="p__info__box__review">
          <p className="p__info__box__review__paragraph">
            Soy un programador principalmente autodidacta, desde pequeño me han gustado los temas relacionados a las computadoras. Comencé a programar en la universidad donde aprendí las bases de la programación en lenguaje <dfn>C</dfn>.
          </p>
          <p className="p__info__box__review__paragraph">
            Luego aprendí POO en <dfn>Java</dfn>, donde realicé varios proyectos y aprendí sobre los conceptos clave de este paradigma. También me formé sobre las bases de datos relacionales.
          </p>
          <p className="p__info__box__review__paragraph">
            Finalmente, aprendí sobre el desarrollo web por mi cuenta, <dfn>HTML5</dfn>, <dfn>CSS3</dfn> y <dfn>JavaScript</dfn>, que es el lenguaje que mejor domino, junto a varias librerías de componentes y preprocesadores como <dfn>SASS</dfn>, también tengo conocimientos de backend con <dfn>NodeJS</dfn>, aunque podría aprender cualquier herramienta de ser necesario. 
          </p>
          <p className="p__info__box__review__paragraph">
            Mi objetivo profesional y personal es el constante aprendizaje y el desarrollo de mi capacidad para resolver los problemas que se presenten diariamente.
          </p>
          <p id="p__info__box__review__citebox">
            <cite id="p__info__box__review__citebox__cite">"Experiencia es el nombre que todo el mundo da a sus errores." </cite> 
            Oscar wilde
          </p>
        </div>
      </div>
    </div>
  );
}
