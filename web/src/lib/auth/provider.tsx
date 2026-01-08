"use client";

import { AuthProvider as OIDCProvider } from "react-oidc-context";
import { oidcConfig } from "./config";

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  // Only render auth provider on client side with valid config
  if (typeof window === "undefined" || !oidcConfig.clientId) {
    return <>{children}</>;
  }

  return <OIDCProvider {...oidcConfig}>{children}</OIDCProvider>;
}
