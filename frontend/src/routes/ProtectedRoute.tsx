// routes/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../stores/auth.store";

interface Props {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: Props) {
  const user = useAuthStore((state) => state.user);
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return children;
}
