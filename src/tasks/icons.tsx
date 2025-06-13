export const CircleCheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    role="presentation"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="2rem"
    height="2rem"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="size-full stroke-current"
    {...props}
  >
    <path d="M21.801 10A10 10 0 1 1 17 3.335" />
    <path d="m9 11 3 3L22 4" />
  </svg>
);

export const CircleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    role="presentation"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="2rem"
    height="2rem"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="size-full stroke-current"
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
  </svg>
);

export const CirclePlusIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    role="presentation"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="2rem"
    height="2rem"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M8 12h8" />
    <path d="M12 8v8" />
  </svg>
);