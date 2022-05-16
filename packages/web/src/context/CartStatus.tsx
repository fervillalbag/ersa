import React, { createContext, useState } from 'react'

export const CartStatusContext = createContext(null)

export const CartStatusProvider: React.FC = ({ children }) => {
  const [statusCart, setStatusCart] = useState<boolean>(false)

  return (
    <CartStatusContext.Provider value={{ statusCart, setStatusCart }}>
      {children}
    </CartStatusContext.Provider>
  )
}
