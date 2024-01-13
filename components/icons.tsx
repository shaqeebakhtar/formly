type IconProps = React.HTMLAttributes<SVGElement>;

export const Icons = {
  logo: (props: IconProps) => (
    <svg
      {...props}
      width="28"
      height="28"
      viewBox="0 0 30 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 2.5C5 1.11929 6.11929 0 7.5 0H22.5C23.8807 0 25 1.11929 25 2.5C25 3.88071 23.8807 5 22.5 5H7.5C6.11929 5 5 3.88071 5 2.5Z"
        fill="#2563EB"
      />
      <path
        d="M0 12.5C0 11.1193 1.11929 10 2.5 10H17.5C18.8807 10 20 11.1193 20 12.5C20 13.8807 18.8807 15 17.5 15H2.5C1.11929 15 0 13.8807 0 12.5Z"
        fill="#E11D48"
      />
      <path
        d="M10 21.5C10 20.1193 11.1193 19 12.5 19H27.5C28.8807 19 30 20.1193 30 21.5C30 22.8807 28.8807 24 27.5 24H12.5C11.1193 24 10 22.8807 10 21.5Z"
        fill="#7C3AED"
      />
    </svg>
  ),

  google: (props: IconProps) => (
    <svg role="img" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
      />
    </svg>
  ),

  spinner: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  ),
};
