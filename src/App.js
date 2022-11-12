import logo from './logo.svg'
import './App.css'
import Color from './components/Color'
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

import { Cam } from './components/Cam'
import Loading from './components/Loading'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef, useEffect, Suspense, useState } from 'react'
gsap.registerPlugin(ScrollTrigger)

function App() {
  function topFunction() {
    document.body.scrollIntoView({
      behavior: 'smooth',
    })
  }

  // TEXT ANIMATIONS
  const headerImage = document.querySelector('.header-image')
  useEffect(() => {
    const tl = gsap.timeline() //for first section elements

    tl.add('same')
      .to(
        '.header-image',
        {
          opacity: 1,
          duration: 2,
        },
        'same'
      )
      .to(
        '.buy-btn',
        {
          opacity: 1,
          duration: 2,
        },
        'same'
      )

      .to(
        '.content-container1',
        {
          opacity: 1,
          y: -50,
        },
        'same'
      )

    gsap.to('.content-container2', {
      y: 100,
      opacity: 1,
      duration: 3,
      scrollTrigger: '.second',
    })

    gsap.to('.content-container3', {
      y: 100,
      opacity: 1,
      duration: 3,
      scrollTrigger: '.third',
    })
    gsap.to('.content-container4', {
      y: 100,
      opacity: 1,
      duration: 3,
      scrollTrigger: '.fourth',
    })
  }, [])

  return (
    <>
      <Suspense fallback={<Loading />}>
        <section className='header'>
          <div>
            <img className='header-image' src='./logo.png' alt='' />
          </div>
          <div>
            <button className='buy-btn'>Buy Now</button>
          </div>
        </section>
        <section className='color-banner'></section>
        <div className='section-container'>
          <section className='first'>
            <div className='content-container1'>
              <div className='title_left'>Capture the Perfect Momments</div>
              <div className='text_left'>
                The bubbly, super social and delightfully small instax mini
                loves nothing more than bringing friends and family together.
                Designed to fit seamlessly into your everday life, this little
                gem is easy to use and all without compromising on print quality
              </div>
            </div>
          </section>
          <section className='second'>
            <div className='content-container2'>
              <div className='title_right'>Automatic Exposure </div>
              <div className='text_right'>
                The high-performance flash automatically calculates surrounding
                brightness and adjusts shutter speed accordingly — no need for
                any special settings.
              </div>
            </div>
          </section>
          <section className='third'>
            <div className='content-container3'>
              <div className='title_left'>Your Travel Companion</div>
              <div className='text_left'>
                Compact,light-weight and waterproof the instax mini makes the
                perfect travel companion. Never miss a shot on your happiest
                adventures.
              </div>
            </div>
          </section>
          <section className='fourth'>
            <div className='content-container4'>
              <div className='title_right'>Match Your Personality</div>
              <div className='text_right'>
                The mini instax comes in multiple colors to suit multiple styles
              </div>
              <div className='color-container'>
                <Color />
              </div>
            </div>
          </section>
          <section className='footer'>
            <button className='footer-btn' onClick={topFunction}>
              Back to top
            </button>
          </section>
        </div>
        <div className='canvas-container'>
          <Canvas
            gl={{ antialias: true, toneMapping: THREE.NoToneMapping }}
            linear
            className='canvas'
          >
            <Suspense fallback={null}>
              {/* <Building /> */}
              {/* <Cube /> */}

              <Cam />
            </Suspense>
          </Canvas>
        </div>
      </Suspense>
    </>
  )
}

export default App
