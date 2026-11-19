
interface NextIconProps {
  size?: number;
  className?: string;
}

const NextIcon = ({ size = 15, className }: NextIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size * 0.6}
    height={size}
    viewBox="0 0 9 15"
    className={className}
  >
    <path
      fill="currentColor"
      d="M.65.64c-.2.2-.2.51 0 .7L7.24 7.5.65 13.66c-.2.19-.2.5 0 .7.21.19.55.19.75 0l6.95-6.5c.1-.1.15-.22.15-.35a.49.49 0 0 0-.15-.35L1.4.66A.54.54 0 0 0 .65.64z"
    />
  </svg>
);

export default NextIcon;
