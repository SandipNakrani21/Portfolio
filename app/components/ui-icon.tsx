export default function Icon({ name, size = 24 }: { name: string; size?: number }) {
  const paths: Record<string, React.ReactNode> = {
    eye: <><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></>,
    code: <><path d="m8 7-5 5 5 5m8-10 5 5-5 5m-3-13-2 16" /></>,
    screen: <><rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8m-4-4v4"/></>,
    layers: <><path d="m12 3 10 5-10 5L2 8Zm-9 9 9 5 9-5M3 16l9 5 9-5"/></>,
    database: <><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 4 16 4 16 0V5M4 12c0 4 16 4 16 0"/></>,
    rocket: <><path d="M14 4c3-1 6-1 6-1s0 3-1 6l-8 8-4-4ZM7 13l-4-1 4-5 5 1m-1 9 1 4 5-4-1-5M4 17l-1 4 4-1"/><circle cx="15" cy="8" r="1.5"/></>,
    people: <><circle cx="9" cy="7" r="3"/><path d="M3 21v-3a6 6 0 0 1 12 0v3m1-17a3 3 0 0 1 0 6m2 4a5 5 0 0 1 3 4v3"/></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/></>,
    phone: <path d="m6 3 4 5-3 3a15 15 0 0 0 6 6l3-3 5 4c-2 6-6 4-10 2S4 13 3 9s0-5 3-6Z"/>,
    pin: <><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 0 1 14 0Z"/><circle cx="12" cy="10" r="2"/></>,
    arrow: <path d="M4 12h16m-6-6 6 6-6 6"/>,
    download: <><path d="M12 3v12m-4-4 4 4 4-4M4 16v5h16v-5"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name] || paths.code}</svg>;
}
