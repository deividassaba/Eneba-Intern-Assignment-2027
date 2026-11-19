
interface HeartIconProps {
  size?: number;
  className?: string;
}

const HeartIcon = ({ size = 24, className }: HeartIconProps) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    className={className}
  >
    <path
      d="M12,21.844l-9.588-10A5.672,5.672,0,0,1,1.349,5.293h0a5.673,5.673,0,0,1,9.085-1.474L12,5.384l1.566-1.565a5.673,5.673,0,0,1,9.085,1.474h0a5.673,5.673,0,0,1-1.062,6.548Z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default HeartIcon;
