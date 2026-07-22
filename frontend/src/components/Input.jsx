export default function Input({
  id,
  label,
  error,
  className = "",
  ...props
}) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-slate-700">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`w-full rounded-lg border px-3.5 py-2.5 text-sm text-slate-900
          placeholder:text-slate-400 outline-none transition
          focus:ring-2 focus:ring-offset-0
          ${
            error
              ? "border-red-400 focus:ring-red-200"
              : "border-slate-300 focus:border-indigo-500 focus:ring-indigo-100"
          }
          ${className}`}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} className="text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
