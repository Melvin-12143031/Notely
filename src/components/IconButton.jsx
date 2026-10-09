import React from 'react'

const IconButton = ({
    children,
    onClick,
    label,
    title,
    className = '',
    type = 'button',
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`icon-button ${className}`}
            aria-label={label}
            title={title || label}>
            {children}
        </button>
    )
}

export default IconButton
