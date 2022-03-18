import { useContext, useEffect } from 'react'
import { CartContext } from '../context/CartContext'

interface useCartIprops {
  cart: []
  handleAddCart: (item) => void
  handleDeleteCart: (id: string) => void
  handleDeleteAllProductCart: (id: string) => void
}

export const useCart = (): useCartIprops => {
  const { cart, setCart } = useContext(CartContext)
  // console.log(cart)

  useEffect(() => {
    const cartFromStoraget = JSON.parse(
      localStorage.getItem('cart-product') || '[]'
    )
    setCart(cartFromStoraget)
    // console.log(cart)
  }, [])

  useEffect(() => {
    localStorage.setItem('cart-product', JSON.stringify(cart))
    // console.log(cart)
  }, [cart])

  const handleAddCart = item => {
    const exist = cart.find(x => x._id === item._id)
    // console.log(cart)

    if (exist) {
      setCart(
        cart.map(x =>
          x._id === item._id ? { ...exist, qty: exist.qty + 1 } : x
        )
      )
    } else {
      setCart([...cart, { ...item, qty: 1 }])
    }
  }

  const handleDeleteCart = item => {
    const exist = cart.find(x => x._id === item._id)

    if (!exist) {
      return
    }

    if (exist.qty === 1) {
      setCart(cart.filter(x => x._id !== item._id))
    } else {
      setCart(
        cart.map(x =>
          x._id === item._id ? { ...exist, qty: exist.qty - 1 } : x
        )
      )
    }
  }

  const handleDeleteAllProductCart = (id: string) => {
    setCart(cart.filter(x => x.id !== id))
  }

  return {
    cart,
    handleAddCart,
    handleDeleteCart,
    handleDeleteAllProductCart
  }
}
