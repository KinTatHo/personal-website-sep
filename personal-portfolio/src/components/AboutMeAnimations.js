export const fadeIn = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };
  
  export const slideIn = (direction) => {
    return {
      hidden: { 
        x: direction === 'left' ? -100 : 100,
        opacity: 0
      },
      visible: { 
        x: 0,
        opacity: 1,
        transition: { 
          type: 'spring',
          damping: 15,
          stiffness: 100
        }
      }
    };
  };
  
  export const scaleIn = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 15,
        stiffness: 100
      }
    }
  };