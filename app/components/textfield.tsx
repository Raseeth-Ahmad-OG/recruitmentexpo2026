import type { ChangeEvent, FocusEvent, HTMLInputTypeAttribute } from "react";

type TextFieldProps = {
  label: string;
  id: string;
  name: string;
  type?: HTMLInputTypeAttribute;
  value: string;
  error?: string;
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
  containerClassName?: string;
  className?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
};

const TextField = ({
  label,
  id,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  required,
  autoComplete,
  containerClassName,
  className,
}: TextFieldProps) => {
  const inputClassName = [
    "block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6",
    error ? "border border-red-500/70 focus:outline-red-500" : "",
    className ?? "",
  ]
    .join(" ")
    .trim();

  return (
    <div className={containerClassName ?? "w-full"}>
      <label htmlFor={id} className="block text-sm/6 font-medium text-white">
        {label}
        {required ? <span className="ml-1 text-red-400">*</span> : null}
      </label>
      <div className="mt-2">
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          className={inputClassName}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          required={required}
          autoComplete={autoComplete}
        />
        {error ? <p className="mt-2 text-sm text-red-400">{error}</p> : null}
      </div>
    </div>
  );
};

export default TextField;
