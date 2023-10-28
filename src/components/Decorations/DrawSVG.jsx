import { useEffect, useContext, useRef } from "react";
import { useInView } from "react-intersection-observer";
import "../../styles/decorations.scss";
import { drawcontext } from "../DrawContext";

export default function DrawSVG({
  path,
  top, left,
  right, bottom,
  height, width,
  zoomX, zoomY,
  color, strokeWidth,
  reversed, duration
}) {
  const { ref, inView, entry } = useInView({ initialInView: false });
  const { drawOn, isDownScrolled } = useContext(drawcontext);
  const pathRef = useRef(null)

  const svgstyle = {
    position: "absolute",
    top: `${top ?? 'unset'}px`,
    right: `${right ?? 'unset'}px`,
    bottom: `${bottom ?? 'unset'}px`,
    left: `${left ?? 'unset'}px`,
    zIndex: -1000
  };

  useEffect(() => {
    if (isDownScrolled && drawOn && inView) {
      pathRef.current?.animate(drawAnimationKeyframes, reversed ? drawOutOptions : drawInOptions)
    }
    if (!isDownScrolled && drawOn && inView) {
      pathRef.current?.animate(drawAnimationKeyframes, reversed ? drawInOptions : drawOutOptions)
    }
  }, [inView, isDownScrolled, drawOn]);

  const drawAnimationKeyframes = [
    { strokeDasharray: `0 ${Math.ceil(pathRef.current?.getTotalLength())}`, visibility: 'hidden'}, 
    { strokeDasharray: `${Math.ceil(pathRef.current?.getTotalLength())} 0`, visibility: 'visible'}
  ]
  
  const drawInOptions = {
    duration: duration,
    easing: reversed ? 'ease-in' : 'ease-out',
    fill: 'forwards',
  }

  const drawOutOptions = {
    ...drawInOptions,
    easing: reversed ? 'ease-out' : 'ease-in',
    direction: 'reverse'
  }


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
        className="draw"
        ref={pathRef}
        d={path}
        fill="transparent"
        stroke={color}
        strokeMiterlimit="10"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={`0 ${Math.ceil(pathRef.current?.getTotalLength())}`}
      />
    </svg>
  );
}
