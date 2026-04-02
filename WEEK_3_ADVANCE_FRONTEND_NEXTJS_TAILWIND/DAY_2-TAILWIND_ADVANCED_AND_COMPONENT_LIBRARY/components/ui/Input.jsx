export default function Input({ type = 'text', placeholder, className = '', icon, ...props }) {
  return (
    <div className="relative">
      {icon && (
        <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
          {icon}
        </div>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className={`w-full rounded-lg border-2 border-slate-300 bg-white px-4 py-3 text-slate-800 placeholder-slate-400 transition-colors focus:border-emerald-500 focus:outline-none ${
          icon ? 'pl-11' : ''
        } ${className}`}
        {...props}
      />
    </div>
  );
}
// Input: reusable TailwindCSS input component with validation states label and helper text support

// Input: reusable TailwindCSS input component with validation states label and helper text support
