import { useState, type InputHTMLAttributes } from 'react';

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

/**
 * Trường nhập liệu văn bản có nhãn, thông báo lỗi chuẩn aria và nút ẩn/hiện mật khẩu.
 */
export function TextField({
  label,
  error,
  helperText,
  id,
  type = 'text',
  className = '',
  disabled,
  ...props
}: TextFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const inputId = id ?? (label ? label.toLowerCase().replace(/[^a-z0-9]/g, '-') : undefined);
  const isPasswordField = type === 'password';
  const computedType = isPasswordField ? (showPassword ? 'text' : 'password') : type;

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

      <div className="relative">
        <input
          id={inputId}
          type={computedType}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={
            error
              ? `${inputId}-error`
              : helperText
                ? `${inputId}-helper`
                : undefined
          }
          className={`w-full rounded-lg border bg-surface px-3 py-2 text-sm text-ink placeholder:text-ink-subtle transition-colors focus:border-primary focus:outline-hidden disabled:bg-surface-alt disabled:opacity-60 ${
            isPasswordField ? 'pr-10' : ''
          } ${
            error ? 'border-danger focus:border-danger' : 'border-border'
          } ${className}`}
          {...props}
        />

        {isPasswordField ? (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-ink-muted hover:text-ink transition-colors cursor-pointer"
          >
            {showPassword ? (
              // Icon mắt gạch chéo (Ẩn mật khẩu)
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
              </svg>
            ) : (
              // Icon mắt mở (Hiện mật khẩu)
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </button>
        ) : null}
      </div>

      {error ? (
        <p id={`${inputId}-error`} role="alert" className="mt-1 text-xs text-danger">
          {error}
        </p>
      ) : helperText ? (
        <p id={`${inputId}-helper`} className="mt-1 text-xs text-ink-muted">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}
