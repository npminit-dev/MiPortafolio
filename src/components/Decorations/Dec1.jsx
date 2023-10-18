import { useState, useEffect, useContext } from "react";
import { useInView } from "react-intersection-observer";
import '../../styles/decorations.scss'
import { drawcontext } from "../DrawContext";

export default function Dec1({ top, left, height, width, zoomX, zoomY, color, strokeWidth }) {
  const { ref, inView, entry } = useInView({ initialInView: false });
  const { drawOn, isDownScrolled } = useContext(drawcontext)
  const [drawIn, setDrawIn] = useState(null)

  const svgstyle = {
    position: "absolute",
    left: `${left}px`,
    top: `${top}px`,
  };

  useEffect(() => {
    if(isDownScrolled && drawOn && inView) setDrawIn(true)
    if(!isDownScrolled && drawOn && inView) setDrawIn(false)
  }, [inView, isDownScrolled, drawOn])

  return (
    <svg
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      width={`${width}px`}
      height={`${height}px`}
      viewBox={`0 0 ${zoomX} ${zoomY}`}
      ref={ref}
      style={svgstyle}
    >
      <path
        d="m.3.4c4.3,2.2,53,28.2,57.7,71.2,1.3,11.5,3.4,30.7-6.5,48.1-2.8,4.9-7.6,11.6-10.3,22.7-1.7,7-3.9,16.8,1.6,23.8.7.9,5.7,7,13,5.9,5.3-.8,10.2-5.1,10.8-10.3.9-7.4-7.3-13.9-14.1-14.6-9.5-1-17,9.1-19.5,12.4-18.2,24.6-4.6,61.2,0,73.5,1.8,4.9,6.6,16.8,17.8,25.9,8.2,6.7,13.3,6.6,15.1,6.5,5.6-.4,11.5-4,13.5-9.2,3.8-9.5-5.8-22.7-16.2-24.9-12.6-2.7-25.4,11.1-28.6,23.2-3.7,13.9,3.8,30,11.9,37.3,1.8,1.7,6,4.9,10.3,10.8,3.1,4.2,5.1,8.3,5.9,10.3,4.8,11.6-2,25.8-4.9,31.9-13.8,29-50.6,51.1-57.7,55.2"
        fill="transparent"
        stroke={color}
        strokeMiterlimit="10"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        className={
          drawIn === null ? 'default' : 
          drawIn ? 'draw-in' : 'draw-out'
        }
      />
    </svg>
  );
}



