import React from 'react'

type ButtonProps = {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'danger'
}

const Button: React.FC<ButtonProps> = ({ children, onClick, className, type = 'button', variant = 'primary' }) => {
  let variantClasses = ''
  switch (variant) {
    case 'primary':
      variantClasses = 'bg-blue-500 text-white hover:bg-blue-600'
      break
    case 'secondary':
      variantClasses = 'bg-yellow-500 text-white hover:bg-yellow-600'
      break
    case 'danger':
      variantClasses = 'bg-red-500 text-white hover:bg-red-600'
      break
    default:
      break
  }

  return (
    <button onClick={onClick} className={`${variantClasses} ${className}`} type={type}>
      {children}
    </button>
  )
}

export default Button