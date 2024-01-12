import React from 'react'
import {motion}  from 'framer-motion';


const animations = {
    initial: {opacity: 0, scale: 0.5 },
    animate: {opacity: 1, scale: 1},
}

const AnimatedPage = ({children}) => {
  return (
    <motion.div 
    variants={animations}
    initial="initial" 
    animate="animate"
    transition={{
        duration: 0.8,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01]
      }}  
      >
      {children}
    </motion.div>
  )
}

export default AnimatedPage
