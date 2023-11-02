import { useState, useEffect, useRef } from "react";
import { skills } from "../../data/skillsdata";
import SkillList from "./SkillList";
import { v4 as uuidv4 } from "uuid";
import "../../styles/skills.scss";
import { RxChevronLeft, RxChevronRight } from "react-icons/rx";
import { BiLogoReact, BiLogoNodejs } from "react-icons/bi";
import { BsFillDatabaseFill } from "react-icons/bs";
import { FcIdea } from "react-icons/fc";
import { PiPersonArmsSpread } from "react-icons/pi";
import { useInView } from "react-intersection-observer";

export default function Skills() {
  const { inView, ref } = useInView();
  const [sectionLoad, setSectionLoad] = useState(false);
  const [skSections, _] = useState(skills);
  const [selected, setSelected] = useState(3);
  const skMaskInner = useRef();

  useEffect(() => {
    if(sectionLoad) {
      skMaskInner.current.style.transform =
      selected === 1
        ? "translateX(585px)"
        : selected === 2
        ? "translateX(286px)"
        : selected === 3
        ? "translateX(-10px)"
        : selected === 4
        ? "translateX(-310px)"
        : selected === 5
        ? "translateX(-608px)"
        : "";
    }
  }, [selected]);

  useEffect(() => {
    if (inView) setSectionLoad(true);
  }, [inView]);

  return (
    <section className="skills" ref={ref}>
      {sectionLoad ? (
        <>
          <div
            className="skills__leftarrow"
            onClick={() => setSelected((sel) => (sel > 1 ? sel - 1 : sel))}
          >
            <RxChevronLeft className="skills__leftarrow__icon" />
          </div>

          <div className="skills__mask">
            <div className={`backgroundicon i__${selected}`}>
              {selected === 1 ? (
                <FcIdea className="backgroundicon__icon idea" />
              ) : selected === 2 ? (
                <PiPersonArmsSpread className="backgroundicon__icon person" />
              ) : selected === 3 ? (
                <BiLogoReact className="backgroundicon__icon react" />
              ) : selected === 4 ? (
                <BiLogoNodejs className="backgroundicon__icon node" />
              ) : selected === 5 ? (
                <BsFillDatabaseFill className="backgroundicon__icon db" />
              ) : (
                <></>
              )}
            </div>
            <div className="skills__mask__inner" ref={skMaskInner}>
              {skSections.map((sk, i) => (
                <SkillList
                  isFocused={i + 1 === selected ? true : false}
                  key={uuidv4()}
                  skillist={sk}
                ></SkillList>
              ))}
            </div>
          </div>

          <div
            className="skills__rightarrow"
            onClick={() => setSelected((sel) => (sel < 5 ? sel + 1 : sel))}
          >
            <RxChevronRight className="skills__rightarrow__icon" />
          </div>

          <div className="skills__selectcount">
            {skSections.map((_, i) => (
              <div key={uuidv4()}>
                <span
                  className={`${
                    i + 1 === selected
                      ? "skills__selectcount__item selected"
                      : "skills__selectcount__item unselected"
                  }`}
                ></span>
              </div>
            ))}
          </div>
        </>
      ) : (
        <></>
      )}
    </section>
  );
}
