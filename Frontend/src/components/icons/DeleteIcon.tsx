
interface DeleteIconProps {
  size?: number;
  className?: string;
}

const DeleteIcon = ({ size = 16, className }: DeleteIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    className={className}
  >
    <g>
      <line
        x1="1" y1="5" x2="23" y2="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.25,1H9.75a1.5,1.5,0,0,0-1.5,1.5V5h7.5V2.5A1.5,1.5,0,0,0,14.25,1Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="9.75" y1="17.75" x2="9.75" y2="10.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="14.25" y1="17.75" x2="14.25" y2="10.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.86,21.62A1.49,1.49,0,0,1,17.37,23H6.63a1.49,1.49,0,0,1-1.49-1.38L3.75,5h16.5Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
);

export default DeleteIcon;
