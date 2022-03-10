import React from 'react'
import { motion } from 'framer-motion'

const Animation: React.FC = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 0.3, duration: 0.3 }
      }}
    >
      {children}
    </motion.div>
  )
}

export default Animation
