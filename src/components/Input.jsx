import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref,
) {
  const id = useId();
  return (
    <div className="w-full">
      <label htmlFor={id} className="mb-2 text-sm font-medium text-gray-900">
        {label}
      </label>
      <input
        id={id}
        type={type}
        ref={ref}
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        {...props}
      />
    </div>
  );
});
export default Input;
