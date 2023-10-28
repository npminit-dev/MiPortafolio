import { useLoader, useFrame, useThree } from "@react-three/fiber";
import { useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default function SolarSystem() {

  const model = useLoader(GLTFLoader, '/assets/models/SolarSysModel.glb');
  const { camera } = useThree()

  useEffect(() => {
    camera.translateY(3)
    camera.translateX(-2.2)
    camera.translateZ(.2)
    camera.rotation.y = 0.92
    camera.rotation.z = 1.2
    camera.setFocalLength(28)
  }, [])

  let mixer;
  if (model.animations.length) {
    mixer = new THREE.AnimationMixer(model.scene);
    model.animations.forEach((clip) => {
      const action = mixer.clipAction(clip);
      action.play();
    });
  }

  useFrame((_, delta) => mixer?.update(delta));

  return (
    <primitive object={model.scene}></primitive>
  );
}
