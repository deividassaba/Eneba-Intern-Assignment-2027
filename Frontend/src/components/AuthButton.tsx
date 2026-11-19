
interface AuthButtonProps {
  text: string;
  loading?: boolean;
  disabled?: boolean;
}

export default function AuthButton({
  text,
  loading = false,
  disabled = false,
}: AuthButtonProps) {
  return (
    <button
      type="submit"
      className="btn"
      disabled={disabled || loading}
    >
      {loading ? "Please wait..." : text}
    </button>
  );
}
