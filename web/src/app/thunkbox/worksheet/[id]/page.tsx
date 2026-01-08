"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { Loader2, AlertCircle } from "lucide-react";
import { Container } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { WorksheetView } from "@/components/worksheet";
import { WorksheetFormData } from "@/lib/worksheet-utils";
import { useAuth } from "@/lib/auth";

interface Worksheet {
  id: string;
  name: string;
  data: WorksheetFormData;
  createdAt: string;
  updatedAt: string;
}

export default function WorksheetViewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { isAuthenticated, cognitoId, isLoading: authLoading, login } = useAuth();

  const [worksheet, setWorksheet] = useState<Worksheet | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchWorksheet() {
      if (!cognitoId) return;

      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(`/api/worksheets/${id}`, {
          headers: { "x-cognito-id": cognitoId },
        });

        const data = await response.json();

        if (data.success && data.worksheet) {
          setWorksheet(data.worksheet);
        } else {
          setError(data.error || "Worksheet not found");
        }
      } catch (err) {
        console.error("Error fetching worksheet:", err);
        setError("Failed to load worksheet");
      } finally {
        setIsLoading(false);
      }
    }

    if (cognitoId) {
      fetchWorksheet();
    }
  }, [id, cognitoId]);

  // Show loading while auth is initializing
  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Show login prompt if not authenticated
  if (!isAuthenticated) {
    return (
      <section className="py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-md text-center">
            <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground" />
            <h1 className="mt-4 text-2xl font-bold">Sign In Required</h1>
            <p className="mt-2 text-muted-foreground">
              Please sign in to view your worksheets.
            </p>
            <Button className="mt-6" onClick={login}>
              Sign In
            </Button>
          </div>
        </Container>
      </section>
    );
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading worksheet...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <section className="py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-md text-center">
            <AlertCircle className="mx-auto h-12 w-12 text-destructive" />
            <h1 className="mt-4 text-2xl font-bold">Error</h1>
            <p className="mt-2 text-muted-foreground">{error}</p>
            <Button
              variant="outline"
              className="mt-6"
              onClick={() => router.push("/profile")}
            >
              Back to Profile
            </Button>
          </div>
        </Container>
      </section>
    );
  }

  // Show worksheet view
  if (!worksheet) {
    return null;
  }

  return (
    <section className="py-8 md:py-12">
      <Container>
        <div className="mx-auto max-w-3xl">
          <WorksheetView
            data={worksheet.data}
            name={worksheet.name}
            worksheetId={worksheet.id}
            createdAt={worksheet.createdAt}
            updatedAt={worksheet.updatedAt}
            showActions={true}
            showBackLink={true}
          />
        </div>
      </Container>
    </section>
  );
}
