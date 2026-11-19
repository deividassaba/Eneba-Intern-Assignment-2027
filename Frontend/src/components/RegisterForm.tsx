
import { useState } from "react";
import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";
import "./../styles/AuthForms.scss"
import { useMessage } from "../context/MessageContext";

interface RegisterFormProps {
  title?: string;
  submitText?: string;
  onSubmit: (data: {
    email: string;
    password: string;
  }) => Promise<void>;
}

export default function RegisterForm({
  title = "Create an account",
  submitText = "Register",
  onSubmit,
}: RegisterFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { showError} = useMessage();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password.length < 8) {
      showError("Password must contain at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      showError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      await onSubmit({ email, password });
    } catch (err) {
      showError(err instanceof Error ? err.message : "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>{title}</h2>

      <AuthInput
        name="email"
        label="Email"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={setEmail}
      />

      <AuthInput
        name="password"
        label="Password"
        type="password"
        placeholder="At least 8 characters"
        value={password}
        onChange={setPassword}
      />

      <AuthInput
        name="confirmPassword"
        label="Confirm password"
        type="password"
        placeholder="Repeat your password"
        value={confirmPassword}
        onChange={setConfirmPassword}
      />


      <AuthButton text={submitText} loading={loading} />
    </form>
  );
}
