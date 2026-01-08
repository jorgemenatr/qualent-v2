"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/layout";
import { useAuth } from "@/lib/auth";

export default function AuthCallbackPage() {
  const { isAuthenticated, error } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Handle the callback
    if (isAuthenticated) {
      // Redirect to the intended destination or home
      const returnTo = sessionStorage.getItem("auth_return_to") || "/";
      sessionStorage.removeItem("auth_return_to");
      router.replace(returnTo);
    }
  }, [isAuthenticated, router]);

  if (error) {
    return (
      <section className="py-20">
        <Container size="small">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-destructive">
              Authentication Error
            </h1>
            <p className="mt-4 text-muted-foreground">{error.message}</p>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-20">
      <Container size="small">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="mt-4 text-muted-foreground">Signing you in...</p>
        </div>
      </Container>
    </section>
  );
}
