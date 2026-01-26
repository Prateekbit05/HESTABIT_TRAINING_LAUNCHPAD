export default function Card({
  children,
  title,
  subtitle,
  footer,
  variant = 'default',
  padding = 'md',
  hover = false,
  onClick,
  className = ''
}) {
  const baseStyles = 'bg-white dark:bg-gray-800 rounded shadow dark:shadow-gray-900 transition-all duration-200';
  
  const variants = {
    default: 'border border-gray-200 dark:border-gray-700',
    primary: 'border-l-4 border-l-blue-500 dark:border-l-blue-600',
    success: 'border-l-4 border-l-green-500 dark:border-l-green-600',
    warning: 'border-l-4 border-l-yellow-500 dark:border-l-yellow-600',
    danger: 'border-l-4 border-l-red-500 dark:border-l-red-600',
    elevated: 'shadow-lg dark:shadow-gray-900',
  };
  
  const paddings = {
    none: '',
    sm: 'p-3',
    md: 'p-6',
    lg: 'p-8',
  };
  
  const hoverEffect = hover ? 'hover:shadow-lg dark:hover:shadow-gray-900 hover:-translate-y-0.5 cursor-pointer' : '';
  const clickable = onClick ? 'cursor-pointer' : '';
  
  return (
    <div
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${paddings[padding]} ${hoverEffect} ${clickable} ${className}`}
    >
      {(title || subtitle) && (
        <div className="mb-4">
          {title && (
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h3>
          )}
          {subtitle && (
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{subtitle}</p>
          )}
        </div>
      )}
      
      <div className="card-body text-gray-900 dark:text-gray-100">
        {children}
      </div>
      
      {footer && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          {footer}
        </div>
      )}
    </div>
  );
}

// Card Header Component
export function CardHeader({ children, className = '' }) {
  return (
    <div className={`mb-4 ${className}`}>
      {children}
    </div>
  );
}

// Card Body Component
export function CardBody({ children, className = '' }) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}

// Card Footer Component
export function CardFooter({ children, className = '' }) {
  return (
    <div className={`mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 ${className}`}>
      {children}
    </div>
  );
}