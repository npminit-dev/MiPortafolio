import '../../styles/solarsystem.scss'
import { Canvas } from '@react-three/fiber'
import SolarSystem from './SolarSystem'

export default function SolarSystemCanvas() {

  return (
    <div id='graph_container'>
      <Canvas camera={{ position: [10, 2, 1], rotateX: 50 }} resize={{ scroll: false }}>
        <directionalLight color="LavenderBlush" position={[20, 10, 55]} intensity={4}/>
        <SolarSystem></SolarSystem>
      </Canvas>
    </div>
  )
}