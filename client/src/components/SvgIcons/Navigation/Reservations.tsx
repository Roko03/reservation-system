import { SVGProps } from 'react';

const Reservations = ({
  props,
  fill = 'currentColor',
  size = '1em',
}: {
  props?: SVGProps<SVGSVGElement>;
  fill?: string;
  size?: string | number;
}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
    <g clipPath="url(#a)">
      <path
        fill={fill}
        d="M6.857 0c.713 0 1.286.502 1.286 1.125V3h7.714V1.125C15.857.502 16.43 0 17.143 0c.712 0 1.286.502 1.286 1.125V3h2.142C22.462 3 24 4.345 24 6v15c0 1.655-1.538 3-3.429 3H3.43C1.538 24 0 22.655 0 21V6c0-1.655 1.538-3 3.429-3H5.57V1.125C5.571.502 6.145 0 6.857 0ZM21.43 9H2.57v12c0 .413.386.75.858.75H20.57c.472 0 .858-.337.858-.75V9Zm-3.804 4.922-6 5.25c-.504.44-1.318.44-1.816 0l-3.429-3c-.503-.44-.503-1.153 0-1.59.504-.435 1.318-.44 1.816 0l2.518 2.204 5.09-4.453c.503-.44 1.317-.44 1.816 0 .498.44.503 1.153 0 1.589h.005Z"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="transparent" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);

export default Reservations;
