import React from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  style?: React.CSSProperties
}

const Card: React.FC<CardProps> = ({ children, className = '', onClick, style }) => {
  const baseClasses = "rounded-xl p-6 shadow-sm border transition-all duration-300 hover:shadow-md"
  const interactiveClasses = onClick ? "cursor-pointer hover:-translate-y-1" : ""
  
  return (
    <div 
      className={`${baseClasses} ${interactiveClasses} ${className}`}
      style={{
        backgroundColor: 'var(--card-bg)',
        borderColor: 'var(--card-border)',
        color: 'var(--text-primary)',
        ...style
      }}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export default Card 