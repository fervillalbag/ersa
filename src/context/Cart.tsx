import React, { createContext, useState } from 'react'

export const CartContext = createContext(null)

const CartProvider: React.FC = ({ children }) => {
  const [statusCart, setStatusCart] = useState<boolean>(false)

  return (
    <CartContext.Provider value={{ statusCart, setStatusCart }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider
