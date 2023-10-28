import { BiMailSend } from "react-icons/bi";
import { BsGithub, BsLinkedin, BsStackOverflow } from "react-icons/bs";
import '../../styles/networks.scss'
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

export default function NetWorks() {

  const { inView, ref, entry } = useInView()

  useEffect(() => {
    entry?.target?.getAnimations({ subtree: true }).forEach(anim => anim.cancel())
    if(inView) {
      let i = 0;
      for(const nwBox of entry.target.children) {
        nwBox.animate([
          { top: '-12px', opacity: 0 },
          { top: '0px', opacity: 1 }
        ], { duration: 500, fill: "forwards", delay: i * 350, easing: 'ease-out'})
        i++;
      }
    } 
  }, [inView])

  return (
    <section id="nw__section">
      <div id="nw__box" ref={ref}>
        <a 
          href="https://es.stackoverflow.com/users/224775/infinit3loop"
          className="nw__box__nwbox"
        >
          <div className="nw__box__nwbox__title">StackOverflow ES</div>
          <div className="nw__box__nwbox__iconbox">
            <BsStackOverflow className="nw__box__nwbox__iconbox__icon so"></BsStackOverflow>
          </div>
        </a>
        <a 
          href="https://github.com/npminit-dev"
          className="nw__box__nwbox"
        >
          <div className="nw__box__nwbox__title">GitHub</div>
          <div className="nw__box__nwbox__iconbox">
            <BsGithub className="nw__box__nwbox__iconbox__icon gh"></BsGithub>
          </div>
        </a>
        <a 
          onClick={() => alert('Disponible proximamente xD')}
          className="nw__box__nwbox"
        >
          <div className="nw__box__nwbox__title">LinkedIn</div>
          <div className="nw__box__nwbox__iconbox">
            <BsLinkedin className="nw__box__nwbox__iconbox__icon li"></BsLinkedin>
          </div>
        </a>
        <a 
          href="mailto:jorgeb.dev.acc@gmail.com"
          className="nw__box__nwbox"
        >
          <div className="nw__box__nwbox__title">Envíame un mail</div>
          <div className="nw__box__nwbox__iconbox">
            <BiMailSend className="nw__box__nwbox__iconbox__icon mail"></BiMailSend>
          </div>
        </a>
      </div>
    </section>
  )
}