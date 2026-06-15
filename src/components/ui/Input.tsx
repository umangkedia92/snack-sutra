import { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes, ReactNode } from "react";

interface BaseInputProps {
  label: string;
  error?: string;
  className?: string;
}

type InputFieldProps = BaseInputProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, "className"> & {
    as?: "input";
  };

type TextareaFieldProps = BaseInputProps &
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "className"> & {
    as: "textarea";
  };

type SelectFieldProps = BaseInputProps &
  Omit<SelectHTMLAttributes<HTMLSelectElement>, "className"> & {
    as: "select";
    children: ReactNode;
  };

type InputProps = InputFieldProps | TextareaFieldProps | SelectFieldProps;

export default function Input(props: InputProps) {
  const { label, error, className = "", as = "input", ...rest } = props;

  const fieldClasses = `w-full rounded-lg border bg-white px-4 py-2.5 text-sm text-stone-800 placeholder:text-stone-400 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-400 ${
    error ? "border-red-400" : "border-stone-200"
  } ${className}`;

  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-stone-700">
        {label}
      </label>
      {as === "textarea" ? (
        <textarea
          className={`${fieldClasses} resize-none`}
          rows={3}
          {...(rest as Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "className">)}
        />
      ) : as === "select" ? (
        <select
          className={fieldClasses}
          {...(rest as Omit<SelectHTMLAttributes<HTMLSelectElement>, "className" | "children">)}
        >
          {(props as SelectFieldProps).children}
        </select>
      ) : (
        <input
          className={fieldClasses}
          {...(rest as Omit<InputHTMLAttributes<HTMLInputElement>, "className">)}
        />
      )}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
