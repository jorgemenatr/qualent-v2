"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Download, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAuth } from "@/lib/auth";

interface PDFGateModalProps {
  reportSlug: string;
  reportTitle: string;
  children?: React.ReactNode;
}

export function PDFGateModal({
  reportSlug,
  reportTitle,
  children,
}: PDFGateModalProps) {
  const t = useTranslations("PdfGate");

  const formSchema = z.object({
    email: z.string().email(t("emailValidation")),
    name: z.string().optional(),
    company: z.string().optional(),
  });

  type FormData = z.infer<typeof formSchema>;

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated, email: userEmail } = useAuth();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      company: "",
    },
  });

  const handleDownload = async (email?: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/downloads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reportSlug,
          email: email || userEmail,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || t("failedToGenerateLink"));
      }

      // Open the download URL in a new tab
      window.open(data.downloadUrl, "_blank");
      setOpen(false);
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : t("somethingWentWrong"));
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: FormData) => {
    // First create/update the contact
    try {
      await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          source: "pdf_download",
        }),
      });
    } catch {
      // Continue even if contact creation fails
    }

    // Then handle the download
    await handleDownload(data.email);
  };

  // If user is authenticated, skip the form
  const handleAuthenticatedDownload = () => {
    handleDownload();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button>
            <Download className="mr-2 h-4 w-4" />
            {t("downloadPdfButton")}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t("downloadReportTitle")}</DialogTitle>
          <DialogDescription>
            {isAuthenticated
              ? t("authenticatedDescription", { title: reportTitle })
              : t("unauthenticatedDescription", { title: reportTitle })}
          </DialogDescription>
        </DialogHeader>

        {isAuthenticated ? (
          <div className="space-y-4">
            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}
            <Button
              onClick={handleAuthenticatedDownload}
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t("generatingLinkText")}
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  {t("downloadPdfButton")}
                </>
              )}
            </Button>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("emailLabel")}</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder={t("emailPlaceholder")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("nameLabel")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("namePlaceholder")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("companyLabel")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("companyPlaceholder")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {error && <p className="text-sm text-destructive">{error}</p>}

              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t("generatingLinkText")}
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-4 w-4" />
                    {t("downloadPdfButton")}
                  </>
                )}
              </Button>

              <p className="text-center text-xs text-muted-foreground">
                {t("updatesNotice")}
              </p>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
