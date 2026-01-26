export default function Button({ children, variant = 'primary', className = '', ...props }) {
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    success: 'bg-emerald-500 text-white hover:bg-emerald-600',
    warning: 'bg-orange-500 text-white hover:bg-orange-600',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    secondary: 'bg-slate-600 text-white hover:bg-slate-700',
  };

  return (
    <button
      className={`rounded-lg px-6 py-3 font-semibold uppercase tracking-wide transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}