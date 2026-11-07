import type { SelectHTMLAttributes } from 'react';

export interface SelectOption {
  value: string | number;
  label: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: SelectOption[];
}

/**
 * Dropdown chọn dữ liệu (Select) theo Design Tokens.
 */
export function Select({
  label,
  error,
  helperText,
  options,
  id,
  className = '',
  disabled,
  ...props
}: SelectProps) {
  const selectId = id ?? (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full">
      {label ? (
        <label
          htmlFor={selectId}
          className="mb-1.5 block text-sm font-medium text-ink"
        >
          {label}
        </label>
      ) : null}

      <select
        id={selectId}
        disabled={disabled}
        className={`w-full rounded-lg border bg-surface px-3 py-2 text-sm text-ink transition-colors focus:border-primary focus:outline-hidden disabled:bg-surface-alt disabled:opacity-60 ${
          error ? 'border-danger focus:border-danger' : 'border-border'
        } ${className}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {error ? (
        <p className="mt-1 text-xs text-danger">{error}</p>
      ) : helperText ? (
        <p className="mt-1 text-xs text-ink-muted">{helperText}</p>
      ) : null}
    </div>
  );
}
