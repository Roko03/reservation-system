import { SVGProps } from 'react';

const EyeOpen = ({
  props,
  fill = 'currentColor',
  size = '1em',
}: {
  props?: SVGProps<SVGSVGElement>;
  fill?: string;
  size?: string | number;
}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill="none" {...props}>
    <path
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M1.357 8.215a.675.675 0 0 1 0-.426 7.001 7.001 0 0 1 13.285-.004.665.665 0 0 1 0 .426 7.003 7.003 0 0 1-13.285.003Z"
    />
    <path stroke="#000" strokeLinecap="round" strokeLinejoin="round" d="M10 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
  </svg>
);

export default EyeOpen;
