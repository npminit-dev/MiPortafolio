import '../../styles/solarsystem.scss'
import { Canvas } from '@react-three/fiber'
import SolarSystem from './SolarSystem'
import { useInView } from 'react-intersection-observer'
import { useEffect, useState } from 'react'

export default function SolarSystemCanvas() {

  const { inView, ref } = useInView()
  const [load, setLoad] = useState(null)

  useEffect(() => {
    if(inView) setTimeout(() => setLoad(true), 3000)
  }, [inView])

  return (
    <div id='graph_container' ref={ref} className={load ? 'graph_appear' : ''}>
      {
      <Canvas camera={{ position: [10, 2, 1], rotateX: 50 }} resize={{ scroll: false }}>
        <directionalLight color="#450678" position={[50, 10, -70]} intensity={25}/>
        <SolarSystem></SolarSystem>
      </Canvas> 
      }
    </div>
  )
}