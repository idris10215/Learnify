import React from 'react'

const CarouselButton = ({ onClick, children }) => {
  return (
    <div className="relative group cursor-pointer">
        <div className="absolute inset-0 bg-black rounded-lg transform translate-x-0.5 translate-y-0.5"></div>
        <button 
            onClick={onClick} 
            className="relative cursor-pointer bg-white p-3 border-2 border-black rounded-lg transition-all duration-200 group-hover:bg-gray-100"
        >
            {children}
        </button>
    </div>
  )
}

export default CarouselButton