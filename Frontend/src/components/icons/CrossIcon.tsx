
interface CrossIconProps {
  size?: number;
  className?: string;
}

const CrossIcon = ({ size = 14, className }: CrossIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 14 14"
    className={className}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M14 1.67L12.59.31 7 5.69 1.41.31 0 1.67l5.59 5.37L0 12.42l1.41 1.36L7 8.4l5.59 5.38L14 12.42 8.41 7.04z"
    />
  </svg>
);

export default CrossIcon;
