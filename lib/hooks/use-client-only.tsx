import { useEffect, useState } from "react";

/**
 * Hook that prevents hydration mismatches by only rendering client-side content
 * after React has hydrated. This is essential when using localStorage/sessionStorage
 * with Jotai atoms or any client-side only state.
 *
 * @returns boolean indicating if component has mounted on client
 */
export function useClientOnly(): boolean {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return hasMounted;
}

/**
 * Component wrapper that only renders children on the client side after hydration.
 * Prevents SSR hydration mismatches when using localStorage, sessionStorage, or other
 * browser-only APIs.
 *
 * @param children - React elements to render client-side only
 * @param fallback - Optional loading component to show during SSR/hydration
 */
interface ClientOnlyProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function ClientOnly({ children, fallback = null }: ClientOnlyProps) {
  const hasMounted = useClientOnly();

  if (!hasMounted) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
