import { useState } from 'react'
import { AppContext, AppProvider, useGlobalContext } from '../context'

const Color = () => {
  const { camColor, setCamColor } = useGlobalContext()

  const handleClick = (e) => {
    const color = e.target.className.split(' ')[1]

    if (color === 'purple') {
      setCamColor('purple')
    }
    if (color === 'black') {
      setCamColor('black')
    }

    if (color === 'blue') {
      setCamColor('blue')
    }

    if (color === 'red') {
      setCamColor('red')
    }
  }

  return (
    <>
      <div>
        <button
          className='color-circle purple'
          onClick={(e) => handleClick(e)}
        ></button>
        <button
          className='color-circle black'
          onClick={(e) => handleClick(e)}
        ></button>
        <button
          className='color-circle blue'
          onClick={(e) => handleClick(e)}
        ></button>
        <button
          className='color-circle red'
          onClick={(e) => handleClick(e)}
        ></button>
        <div className='color-instructions'>
          <h4>*Click to change color</h4>
        </div>
      </div>
    </>
  )
}

export default Color
