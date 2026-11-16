export function CartIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="9" cy="20" r="1.5" />
      <circle cx="18" cy="20" r="1.5" />
      <path d="M2 3h3l2.7 12.4a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.5L21 7H6" />
    </svg>
  );
}

export function BagIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2a4 4 0 0 0-4 4v1H5.6a1 1 0 0 0-1 .9L3.4 20a2 2 0 0 0 2 2.1h13.2a2 2 0 0 0 2-2.1L19.4 7.9a1 1 0 0 0-1-.9H16V6a4 4 0 0 0-4-4Zm-2 5V6a2 2 0 1 1 4 0v1h-4Zm-1 4.5a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm4 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z" />
    </svg>
  );
}
