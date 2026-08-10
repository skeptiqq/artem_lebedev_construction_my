type Direction = "left" | "right" | "up" | "down";

function getPoints(direction: Direction, size: number): string {
  switch (direction) {
    case "left":
      return `${size * 0.65},${size * 0.18} ${size * 0.28},${size * 0.5} ${size * 0.65},${size * 0.82}`;
    case "right":
      return `${size * 0.35},${size * 0.18} ${size * 0.72},${size * 0.5} ${size * 0.35},${size * 0.82}`;
    case "up":
      return `${size * 0.18},${size * 0.65} ${size * 0.5},${size * 0.28} ${size * 0.82},${size * 0.65}`;
    case "down":
      return `${size * 0.18},${size * 0.35} ${size * 0.5},${size * 0.72} ${size * 0.82},${size * 0.35}`;
  }
}

interface ChevronSvgProps {
  direction: Direction;
  color?: string;
  size?: number;
  strokeWidth?: number;
}

/** Pure SVG chevron – use inside any existing interactive element */
export function ChevronSvg({
  direction,
  color = "currentColor",
  size = 28,
  strokeWidth = 1.5,
}: ChevronSvgProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polyline
        points={getPoints(direction, size)}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface ChevronArrowProps {
  direction: Direction;
  onClick: (e: React.MouseEvent) => void;
  color?: string;
  size?: number;
  strokeWidth?: number;
  className?: string;
  ariaLabel?: string;
  disabled?: boolean;
}

/** Full button with chevron – use as a standalone interactive control */
export default function ChevronArrow({
  direction,
  onClick,
  color = "currentColor",
  size = 28,
  strokeWidth = 1.5,
  className = "",
  ariaLabel,
  disabled = false,
}: ChevronArrowProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`flex items-center justify-center cursor-pointer transition-opacity duration-150 hover:opacity-60 active:opacity-40 disabled:opacity-20 disabled:cursor-not-allowed ${className}`}
    >
      <ChevronSvg direction={direction} color={color} size={size} strokeWidth={strokeWidth} />
    </button>
  );
}
