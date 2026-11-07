import type { InputHTMLAttributes } from 'react';

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

/**
 * Trường nhập liệu văn bản có nhãn và thông báo lỗi theo Design Tokens.
 */
export function TextField({
  label,
  error,
  helperText,
  id,
  className = '',
  disabled,
  ...props
}: TextFieldProps) {
  const inputId = id ?? (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full">
      {label ? (
        <label
          htmlFor={inputId}
          className="mb-1.5 block text-sm font-medium text-ink"
        >
          {label}
        </label>
      ) : null}

      <input
        id={inputId}
        disabled={disabled}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${inputId}-error` : undefined}
        className={`w-full rounded-lg border bg-surface px-3 py-2 text-sm text-ink placeholder:text-ink-subtle transition-colors focus:border-primary focus:outline-hidden disabled:bg-surface-alt disabled:opacity-60 ${
          error ? 'border-danger focus:border-danger' : 'border-border'
        } ${className}`}
        {...props}
      />

      {error ? (
        <p id={`${inputId}-error`} className="mt-1 text-xs text-danger">
          {error}
        </p>
      ) : helperText ? (
        <p className="mt-1 text-xs text-ink-muted">{helperText}</p>
      ) : null}
    </div>
  );
}
