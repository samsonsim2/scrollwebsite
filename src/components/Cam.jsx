import React, { useEffect, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import {
  useGLTF,
  PerspectiveCamera,
  OrbitControls,
  useTexture,
  Environment,
} from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { AppContext, AppProvider, useGlobalContext } from '../context'

gsap.registerPlugin(ScrollTrigger)

export function Cam(props) {
  const { camColor, setCamColor } = useGlobalContext()
  const { nodes, materials } = useGLTF('/Fujifilm_Instax_Mini_11.glb')
  //REFS-----------------------------------------//
  const targetRef = useRef(null)
  const cameraRef = useRef(null)
  const modelRef = useRef(null)
  //TEXTURES-----------------------------------------//

  const diffuseMap_purple = useTexture('/camDiffuse_purple.jpg')
  const diffuseMap_blue = useTexture('/camDiffuse_blue.jpg')
  const diffuseMap_red = useTexture('/camDiffuse_red.jpg')
  const diffuseMap_black = useTexture('/camDiffuse_black.jpg')
  const [diffuseMap, setDiffuseMap] = useState(diffuseMap_purple)

  useEffect(() => {
    if (camColor === 'purple') {
      setDiffuseMap(diffuseMap_purple)
    }
    if (camColor === 'blue') {
      setDiffuseMap(diffuseMap_blue)
    }
    if (camColor === 'red') {
      setDiffuseMap(diffuseMap_red)
    }
    if (camColor === 'black') {
      setDiffuseMap(diffuseMap_black)
    }
  }, [camColor])
  diffuseMap_purple.minFilter = THREE.LinearFilter
  diffuseMap_purple.flipY = false
  diffuseMap_blue.minFilter = THREE.LinearFilter
  diffuseMap_blue.flipY = false
  diffuseMap_red.minFilter = THREE.LinearFilter
  diffuseMap_red.flipY = false
  diffuseMap_black.minFilter = THREE.LinearFilter
  diffuseMap_black.flipY = false

  // START OF SECTION CHECKER-----------------------------------------//
  useFrame(() => {
    if (cameraRef.current.position.x === -2) {
      setSection3(true)
    } else setSection3(false)
    if (cameraRef.current.position.z === 3) {
      setSection4(true)
    } else setSection4(false)
  })

  const [section3, setSection3] = useState(false)
  const [section4, setSection4] = useState(false)
  // END OF SECTION CHECKER-----------------------------------------//

  // START OF SECOND ANIMATION-----------------------------------------//

  useEffect(() => {
    const targetPosition = targetRef.current.target
    const cameraPosition = cameraRef.current.position
    const modelPosition = modelRef.current.position

    const tl2 = gsap.timeline()

    tl2
      .add('start')
      .to(
        cameraPosition,
        {
          x: -2,
          y: 1,
          z: 1,

          scrollTrigger: {
            trigger: document.querySelector('.second'),
            start: 'top bottom',
            end: 'top top',

            scrub: true,
          },
        },
        'start'
      )

      .to(
        modelPosition,
        {
          x: -1.2,
          y: 0.2,
          z: 0,

          scrollTrigger: {
            trigger: document.querySelector('.second'),
            start: 'top bottom',
            end: 'top top',

            scrub: true,
          },
        },
        'start'
      )
  }, [])

  // START OF THIRD ANIMATION-----------------------------------------//
  useEffect(() => {}, [])
  if (section3 == true) {
    const cameraPosition = cameraRef.current.position
    const modelPosition = modelRef.current.position
    const modelRotation = modelRef.current.rotation

    const tl3 = gsap.timeline()
    tl3
      .to(cameraPosition, {
        x: 2,
        y: -1,
        z: 3,

        scrollTrigger: {
          trigger: document.querySelector('.third'),
          start: 'top bottom',
          end: 'top top',

          scrub: true,
        },
      })
      .to(modelPosition, {
        x: 1.4,
        y: -0.4,
        z: 0,
        duration: 3,

        scrollTrigger: {
          trigger: document.querySelector('.third'),
          start: 'top bottom',
          end: 'top top',

          scrub: true,
        },
      })
      .to(modelRotation, {
        y: Math.PI,

        scrollTrigger: {
          trigger: document.querySelector('.third'),
          start: 'top bottom',
          end: 'top top',

          scrub: true,
        },
      })
  }

  // START OF FOURTH ANIMATION-----------------------------------------//
  if (section4 == true) {
    const cameraPosition = cameraRef.current.position
    const modelPosition = modelRef.current.position
    const modelRotation = modelRef.current.rotation

    const tl4 = gsap.timeline()
    tl4
      .to(cameraPosition, {
        x: -2,
        y: 1,
        z: 3,

        scrollTrigger: {
          trigger: document.querySelector('.fourth'),
          start: 'top bottom',
          end: 'top top',

          scrub: true,
        },
      })
      .to(modelPosition, {
        x: -1.4,
        y: 0.6,
        z: 0.6,

        scrollTrigger: {
          trigger: document.querySelector('.fourth'),
          start: 'top bottom',
          end: 'top top',

          scrub: true,
        },
      })
      .to(modelRotation, {
        x: -Math.PI / 7,
        y: -Math.PI / 6,

        scrollTrigger: {
          trigger: document.querySelector('.fourth'),
          start: 'top bottom',
          end: 'top top',

          scrub: true,
        },
      })
  }

  return (
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault position={[2, 0, 2]} />
      <OrbitControls
        ref={targetRef}
        target={[0, 0, 0]}
        enableZoom={false}
        enableRotate={false}
        enablePan={false}
      />

      <group
        ref={modelRef}
        {...props}
        dispose={null}
        scale={0.001}
        position={[1.2, 0, 0]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Fujifilm_Instax_Mini_11.geometry}
          material={materials.fuji}
        >
          <meshStandardMaterial map={diffuseMap} roughness={0} />
          <ambientLight />
        </mesh>
      </group>
    </>
  )
}

useGLTF.preload('/Fujifilm_Instax_Mini_11.glb')
