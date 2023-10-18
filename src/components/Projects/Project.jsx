import { useContext } from "react";
import "../../styles/projects.scss";
import { AiFillGithub, AiOutlineGlobal } from "react-icons/ai";
import { themeContext } from "../ThemeContext";
import LazyLoad from "react-lazy-load";
import { v4 as uuidv4 } from 'uuid'
import { Tooltip, Image } from 'antd'

export default function Project({ name, info, cover, thumbnail, tecs, link, repo }) {
  const { theme } = useContext(themeContext);

  return (
    <div className={`project ${theme}`}>
      <LazyLoad
        className="LazyLoad"
      >
        <>
          <span className="project__name">
            <span>{name}</span>
          </span>
          <p className="project__info">
            <span>{info}</span>
          </p>
          <div className="project__imgbox">
            <Image
              preview={{
                src: cover
              }}
              src={thumbnail}
              className="project__imgbox__img"
            ></Image>
          </div>
          <div className="project_tecs">
          {
            tecs && tecs.map(tec => 
              <div 
                className="project_tecs__tecbox" 
                title={ `${tec.name}` }
                style={{ color: `${tec.color}` }}
                key={uuidv4()}>
                { tec.icon }
              </div>
            )
          }
          </div>
          <div className="project__links">
          {
            link !== '#' && 
            <span className="project__links__box">
              <a className="project__links__box__link" href={link}>
                <Tooltip title="A la web" trigger="hover" placement="bottom">
                  <AiOutlineGlobal className="project__links__box__link__icon"/>
                </Tooltip>
              </a>
            </span>
          }
            <span className="project__links__box">
              <a className="project__links__box__link" href={repo}>
                <Tooltip title="Al repositorio" trigger="hover" placement="bottom">
                  <AiFillGithub className="project__links__box__link__icon"/>
                </Tooltip>
              </a>
            </span>
          </div>
        </>
      </LazyLoad>
      <span className="project__glasseffect"></span>
    </div>
  );
}
