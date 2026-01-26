'use client';

import { useEffect } from 'react';

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  closeOnOverlayClick = true,
  showCloseButton = true,
}) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-full mx-4',
  };

  const handleOverlayClick = (e) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 dark:bg-opacity-80 p-4 backdrop-blur-sm"
      onClick={handleOverlayClick}
    >
      <div
        className={`bg-white dark:bg-gray-800 rounded shadow-2xl dark:shadow-gray-900 w-full ${sizes[size]} max-h-[90vh] flex flex-col animate-fadeIn transition-colors`}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
            {title && (
              <h2 className="text-lg font-bold text-gray-900 dark:text-white uppercase tracking-wide">{title}</h2>
            )}
            {showCloseButton && (
              <button
                onClick={onClose}
                className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors text-2xl font-bold leading-none"
                aria-label="Close modal"
              >
                ×
              </button>
            )}
          </div>
        )}

        {/* Body */}
        <div className="px-6 py-4 overflow-y-auto flex-1 text-gray-900 dark:text-gray-100">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 flex justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

// Modal Header Component
export function ModalHeader({ children, className = '' }) {
  return (
    <div className={`px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 ${className}`}>
      {children}
    </div>
  );
}

// Modal Body Component
export function ModalBody({ children, className = '' }) {
  return (
    <div className={`px-6 py-4 overflow-y-auto flex-1 ${className}`}>
      {children}
    </div>
  );
}

// Modal Footer Component
export function ModalFooter({ children, className = '' }) {
  return (
    <div className={`px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 flex justify-end gap-3 ${className}`}>
      {children}
    </div>
  );
}