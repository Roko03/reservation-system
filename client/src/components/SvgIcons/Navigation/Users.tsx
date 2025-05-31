const Users = ({
  props,
  fill = 'currentColor',
  size = '1em',
}: {
  props?: React.SVGProps<SVGSVGElement>;
  fill?: string;
  size?: string | number;
}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
    <g clipPath="url(#a)">
      <path
        fill={fill}
        d="M3.75 5a5 5 0 1 1 10 0 5 5 0 0 1-10 0ZM0 18.84a6.963 6.963 0 0 1 6.965-6.965h3.57A6.963 6.963 0 0 1 17.5 18.84c0 .64-.52 1.16-1.16 1.16H1.16C.52 20 0 19.48 0 18.84ZM23.8 20h-5.382a2.51 2.51 0 0 0 .336-1.25v-.313c0-2.37-1.059-4.5-2.727-5.93.094-.003.184-.007.278-.007h2.398A6.3 6.3 0 0 1 25 18.8a1.2 1.2 0 0 1-1.2 1.2Zm-6.925-10a4.366 4.366 0 0 1-3.098-1.285A6.219 6.219 0 0 0 15 5a6.209 6.209 0 0 0-.715-2.902 4.373 4.373 0 0 1 2.59-.848 4.373 4.373 0 0 1 4.375 4.375A4.373 4.373 0 0 1 16.875 10Z"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="transparent" d="M0 0h25v20H0z" />
      </clipPath>
    </defs>
  </svg>
);

export default Users;
