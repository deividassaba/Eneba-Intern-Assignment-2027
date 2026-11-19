
import { useState } from "react";
import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";
import "./../styles/AuthForms.scss"
interface LoginFormProps {
  title?: string;
  submitText?: string;
  emailLabel?: string;
  passwordLabel?: string;
  onSubmit: (data: { email: string; password: string }) => Promise<void>;
}

export default function LoginForm({
  title = "Welcome back",
  submitText = "Log in",
  emailLabel = "Email",
  passwordLabel = "Password",
  onSubmit,
}: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await onSubmit({ email, password });
    } catch (err) {
      throw err
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>{title}</h2>

      <AuthInput
        name="email"
        label={emailLabel}
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={setEmail}
      />

      <AuthInput
        name="password"
        label={passwordLabel}
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={setPassword}
      />

      <AuthButton text={submitText} loading={loading} />
    </form>
  );
}
