"use client";

import { useContext, useCallback } from "react";
import { AuthContext } from "react-oidc-context";

export function useAuth() {
  const auth = useContext(AuthContext);

  const login = useCallback(() => {
    auth?.signinRedirect();
  }, [auth]);

  const logout = useCallback(() => {
    auth?.signoutRedirect();
  }, [auth]);

  // Return safe defaults if auth context is not available (e.g., during SSR/static generation)
  if (!auth) {
    return {
      user: undefined,
      isAuthenticated: false,
      isLoading: false,
      error: undefined,
      login: () => {},
      logout: () => {},
      email: undefined,
      name: undefined,
      accessToken: undefined,
      idToken: undefined,
    };
  }

  return {
    user: auth.user,
    isAuthenticated: auth.isAuthenticated,
    isLoading: auth.isLoading,
    error: auth.error,
    login,
    logout,
    // Convenience accessors
    email: auth.user?.profile?.email as string | undefined,
    name: auth.user?.profile?.name as string | undefined,
    accessToken: auth.user?.access_token,
    idToken: auth.user?.id_token,
  };
}
