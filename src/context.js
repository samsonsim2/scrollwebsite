import React, { useState, useContext } from 'react'

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [camColor, setCamColor] = useState('/camDiffuse_purple.jpg')
  return (
    <AppContext.Provider value={{ camColor, setCamColor }}>
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}

//custom hook
export { AppContext, AppProvider }
