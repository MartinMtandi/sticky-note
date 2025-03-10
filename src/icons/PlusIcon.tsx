interface PlusIconProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
}

const PlusIcon = ({ 
  size = 24,  // Larger default size for cursor use
  color = '#FFFFFF',  // Pure white for maximum visibility
  strokeWidth = 2.5   // Match priority dot style (12px diameter)
}: PlusIconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 20 20" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="Add note"
  >
    {/* Dark shadow for depth, matching priority dot style */}
    <path 
      d="M10 3V17" 
      stroke="#000000" 
      strokeWidth={strokeWidth * 1.5} 
      strokeLinecap="round" 
      opacity="0.5"  // Match priority dot opacity for no priority state
    />
    <path 
      d="M3 10H17" 
      stroke="#000000" 
      strokeWidth={strokeWidth * 1.5} 
      strokeLinecap="round" 
      opacity="0.5"  // Match priority dot opacity for no priority state
    />
    {/* Main plus shape in white */}
    <path 
      d="M10 3V17" 
      stroke={color} 
      strokeWidth={strokeWidth} 
      strokeLinecap="round" 
    />
    <path 
      d="M3 10H17" 
      stroke={color} 
      strokeWidth={strokeWidth} 
      strokeLinecap="round" 
    />
  </svg>
);

export default PlusIcon;
