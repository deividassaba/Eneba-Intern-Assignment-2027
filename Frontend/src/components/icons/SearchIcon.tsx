
interface SearchIconProps {
  size?: number;
  className?: string;
}

const SearchIcon = ({ size = 24, className }: SearchIconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <g clipPath="url(#search-icon-clip)">
      <path
        d="M17 17L22.7499 22.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1 10.25C1 12.7033 1.97455 15.056 3.70926 16.7907C5.44397 18.5254 7.79675 19.5 10.25 19.5C12.7033 19.5 15.056 18.5254 16.7907 16.7907C18.5254 15.056 19.5 12.7033 19.5 10.25C19.5 7.79675 18.5254 5.44397 16.7907 3.70926C15.056 1.97455 12.7033 1 10.25 1C7.79675 1 5.44397 1.97455 3.70926 3.70926C1.97455 5.44397 1 7.79675 1 10.25Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="search-icon-clip">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default SearchIcon;
