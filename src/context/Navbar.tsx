import React, { createContext, useState } from 'react'

export const NavbarContext = createContext(null)

const NavbarProvider: React.FC = ({ children }) => {
  const [showNavbar, setShowNavbar] = useState<boolean>(false)

  return (
    <NavbarContext.Provider value={{ showNavbar, setShowNavbar }}>
      {children}
    </NavbarContext.Provider>
  )
}

export default NavbarProvider
