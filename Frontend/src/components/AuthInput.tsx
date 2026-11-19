
import { useState } from "react";

interface AuthInputProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

export default function AuthInput({
  name,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  required = true,
}: AuthInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="auth-field">
      <label htmlFor={name}>{label}</label>

      <div className="auth-input-wrapper">
        <input
          id={name}
          name={name}
          type={isPassword && showPassword ? "text" : type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
        />

        {isPassword && (
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        )}
      </div>
    </div>
  );
}
