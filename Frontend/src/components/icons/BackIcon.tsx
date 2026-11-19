
interface BackIconProps {
  size?: number;
  className?: string;
}

const BackIcon = ({ size = 15, className }: BackIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size * 0.6}
    height={size}
    viewBox="0 0 9 15"
    className={className}
  >
    <path
      fill="currentColor"
      d="M8.35 14.36c.2-.2.2-.51 0-.7L1.76 7.5l6.59-6.17c.2-.19.2-.5 0-.7a.55.55 0 0 0-.75 0L.65 7.14c-.1.1-.15.22-.15.35 0 .13.05.26.15.35l6.95 6.5c.2.21.54.21.75.02z"
    />
  </svg>
);

export default BackIcon;
