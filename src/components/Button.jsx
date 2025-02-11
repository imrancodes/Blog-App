import React from 'react'

const Button = ({
    children,
    type = 'button',
    ...props,
    bgColor = 'bg-blue-500',
    className = '',

}) => {
  return (
    <button className={`px-4 py-2 rounded-lg ${className} ${bgColor}`}>{children}</button>
  )
}

export default Button