import { useContext } from "react";
import "../../styles/projects.scss";
import { MdWeb } from "react-icons/md";
import { AiFillGithub } from "react-icons/ai";
import { themeContext } from "../ThemeContext";
import LazyLoad from "react-lazy-load";

export default function Project({ name, info, cover, link, repo }) {
  const { theme } = useContext(themeContext);

  return (
    <div className={`project ${theme}`}>
      <LazyLoad
        className="LazyLoad"
        onContentVisible={() => console.log("loaded")}
      >
        <>
          <span className="project__name">
            <span>{name}</span>
          </span>
          <p className="project__info">
            <span>{info}</span>
          </p>
          <div className="project__imgbox">
            <img src={cover} className="project__imgbox__img"></img>
          </div>
          <div className="project__links">
            <span className="project__links">
              <a href={link}>
                <MdWeb />
              </a>
            </span>
            <span>
              <a href={repo}>
                <AiFillGithub />
              </a>
            </span>
          </div>
        </>
      </LazyLoad>
    </div>
  );
}
