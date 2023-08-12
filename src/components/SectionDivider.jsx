import "../styles/sectiondivider.scss";
import { BsChevronCompactDown } from 'react-icons/bs'

export default function SectionDivider({ tag }) {
  return (
    <div className="projects__titlebox">
      <span className="projects__titlebox__title">{ tag }</span>
      <span className="projects__titlebox__iconbox">
        <BsChevronCompactDown className="projects__titlebox__iconbox__icon" />
      </span>
    </div>
  );
}
