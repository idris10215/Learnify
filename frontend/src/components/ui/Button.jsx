import React from 'react'

const Button = ({ children, className = '', ...props }) => {
  return (
    <button
      className={`bg-white w-full sm:w-auto px-6 py-3 border-2 border-black rounded-lg font-bold transition-all duration-200 hover:shadow-[4px_4px_0_0_#000] hover:-translate-x-1 hover:-translate-y-1 cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button;