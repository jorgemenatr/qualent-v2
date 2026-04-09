"use client";

import { useEffect, useState, useCallback } from "react";
import { Link } from "@/i18n/navigation";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import {
  FileText,
  Trash2,
  Calendar,
  Clock,
  LogIn,
  Loader2,
  FolderOpen,
  Building2,
  ClipboardList,
  Wrench,
  Pencil,
  Save,
  X,
  MessageSquare,
  Headphones,
  Send,
  ArrowRight,
} from "lucide-react";
import { Container } from "@/components/layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/lib/auth";

interface ToolSave {
  id: string;
  toolType: string;
  name: string;
  data: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

interface WorksheetSubmission {
  id: string;
  name: string;
  data: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

interface CompanyProfile {
  id: string;
  companyName: string;
  industry: string | null;
  companySize: string | null;
  userRole: string | null;
  createdAt: string;
  updatedAt: string;
}

const toolTypeRoutes: Record<string, string> = {
  fives: "/learn/tools/fives",
  build_vs_buy: "/learn/tools/build-vs-buy",
  prioritization: "/learn/tools/prioritization",
};

const companySizeValues = ["1-10", "11-50", "51-200", "201-500", "500+"] as const;

const industryValues = [
  "technology",
  "finance",
  "healthcare",
  "retail",
  "manufacturing",
  "professional_services",
  "education",
  "government",
  "nonprofit",
  "other",
] as const;

export default function ProfilePage() {
  const {
    isAuthenticated,
    isLoading: authLoading,
    cognitoId,
    login,
    name,
    email,
  } = useAuth();
  const router = useRouter();
  const t = useTranslations("Profile");

  // Saved tools state
  const [saves, setSaves] = useState<ToolSave[]>([]);
  const [savesLoading, setSavesLoading] = useState(true);
  const [savesError, setSavesError] = useState<string | null>(null);
  const [deletingToolId, setDeletingToolId] = useState<string | null>(null);

  // Worksheets state
  const [worksheets, setWorksheets] = useState<WorksheetSubmission[]>([]);
  const [worksheetsLoading, setWorksheetsLoading] = useState(true);
  const [worksheetsError, setWorksheetsError] = useState<string | null>(null);
  const [deletingWorksheetId, setDeletingWorksheetId] = useState<string | null>(
    null
  );

  // Company profile state
  const [companyProfile, setCompanyProfile] = useState<CompanyProfile | null>(
    null
  );
  const [companyLoading, setCompanyLoading] = useState(true);
  const [companyError, setCompanyError] = useState<string | null>(null);
  const [isEditingCompany, setIsEditingCompany] = useState(false);
  const [companySaving, setCompanySaving] = useState(false);
  const [companyForm, setCompanyForm] = useState({
    companyName: "",
    industry: "",
    companySize: "",
    userRole: "",
  });

  // Fetch saved tools
  const fetchSaves = useCallback(async () => {
    try {
      setSavesLoading(true);
      const response = await fetch("/api/tools", {
        headers: { "x-cognito-id": cognitoId || "" },
      });
      const data = await response.json();
      if (data.success) {
        setSaves(data.saves);
      } else {
        setSavesError(data.error || "Failed to load saves");
      }
    } catch {
      setSavesError("Failed to load saves");
    } finally {
      setSavesLoading(false);
    }
  }, [cognitoId]);

  // Fetch worksheets
  const fetchWorksheets = useCallback(async () => {
    try {
      setWorksheetsLoading(true);
      const response = await fetch("/api/worksheets", {
        headers: { "x-cognito-id": cognitoId || "" },
      });
      const data = await response.json();
      if (data.success) {
        setWorksheets(data.worksheets);
      } else {
        setWorksheetsError(data.error || "Failed to load worksheets");
      }
    } catch {
      setWorksheetsError("Failed to load worksheets");
    } finally {
      setWorksheetsLoading(false);
    }
  }, [cognitoId]);

  // Fetch company profile
  const fetchCompanyProfile = useCallback(async () => {
    try {
      setCompanyLoading(true);
      const response = await fetch("/api/profile/company", {
        headers: { "x-cognito-id": cognitoId || "" },
      });
      const data = await response.json();
      if (data.success && data.profile) {
        setCompanyProfile(data.profile);
        setCompanyForm({
          companyName: data.profile.companyName || "",
          industry: data.profile.industry || "",
          companySize: data.profile.companySize || "",
          userRole: data.profile.userRole || "",
        });
      }
    } catch {
      setCompanyError("Failed to load company profile");
    } finally {
      setCompanyLoading(false);
    }
  }, [cognitoId]);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      setSavesLoading(false);
      setWorksheetsLoading(false);
      setCompanyLoading(false);
      return;
    }

    if (isAuthenticated && cognitoId) {
      fetchSaves();
      fetchWorksheets();
      fetchCompanyProfile();
    }
  }, [
    isAuthenticated,
    authLoading,
    cognitoId,
    fetchSaves,
    fetchWorksheets,
    fetchCompanyProfile,
  ]);

  // Delete tool save
  const handleDeleteTool = async (id: string) => {
    try {
      setDeletingToolId(id);
      const response = await fetch(`/api/tools/${id}`, {
        method: "DELETE",
        headers: { "x-cognito-id": cognitoId || "" },
      });
      const data = await response.json();
      if (data.success) {
        setSaves((prev) => prev.filter((save) => save.id !== id));
      } else {
        setSavesError(data.error || "Failed to delete save");
      }
    } catch {
      setSavesError("Failed to delete save");
    } finally {
      setDeletingToolId(null);
    }
  };

  // Delete worksheet
  const handleDeleteWorksheet = async (id: string) => {
    try {
      setDeletingWorksheetId(id);
      const response = await fetch(`/api/worksheets/${id}`, {
        method: "DELETE",
        headers: { "x-cognito-id": cognitoId || "" },
      });
      const data = await response.json();
      if (data.success) {
        setWorksheets((prev) => prev.filter((w) => w.id !== id));
      } else {
        setWorksheetsError(data.error || "Failed to delete worksheet");
      }
    } catch {
      setWorksheetsError("Failed to delete worksheet");
    } finally {
      setDeletingWorksheetId(null);
    }
  };

  // Save company profile
  const handleSaveCompanyProfile = async () => {
    if (!companyForm.companyName.trim()) {
      setCompanyError("Company name is required");
      return;
    }

    try {
      setCompanySaving(true);
      setCompanyError(null);
      const response = await fetch("/api/profile/company", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cognitoId,
          ...companyForm,
        }),
      });
      const data = await response.json();
      if (data.success) {
        setCompanyProfile(data.profile);
        setIsEditingCompany(false);
      } else {
        setCompanyError(data.error || "Failed to save profile");
      }
    } catch {
      setCompanyError("Failed to save profile");
    } finally {
      setCompanySaving(false);
    }
  };

  const handleOpenTool = (save: ToolSave) => {
    const route = toolTypeRoutes[save.toolType];
    if (route) {
      router.push(`${route}?load=${save.id}`);
    }
  };

  const handleOpenWorksheet = (worksheet: WorksheetSubmission) => {
    router.push(`/thunkbox/worksheet/${worksheet.id}`);
  };

  // Get initials for avatar
  const getInitials = () => {
    if (name) {
      return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    if (email) {
      return email[0].toUpperCase();
    }
    return "U";
  };

  // Show login prompt if not authenticated
  if (!authLoading && !isAuthenticated) {
    return (
      <section className="py-20">
        <Container size="small">
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <LogIn className="h-8 w-8 text-muted-foreground" />
            </div>
            <h1 className="mt-6 text-2xl font-bold">
              {t("signInToView")}
            </h1>
            <p className="mt-2 text-muted-foreground">
              {t("signInDescription")}
            </p>
            <Button className="mt-6" onClick={login}>
              {t("signIn")}
            </Button>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <>
      {/* Header with user info */}
      <section className="border-b border-border py-12">
        <Container>
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="bg-primary/10 text-lg text-primary">
                {getInitials()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                {name || t("yourProfile")}
              </h1>
              <p className="text-muted-foreground">{email}</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Content */}
      <section className="py-12">
        <Container>
          <div className="space-y-12">
            {/* Company Profile Section */}
            <div>
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-muted-foreground" />
                  <h2 className="text-xl font-semibold">{t("companyProfile")}</h2>
                </div>
                {companyProfile && !isEditingCompany && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditingCompany(true)}
                  >
                    <Pencil className="mr-2 h-4 w-4" />
                    {t("edit")}
                  </Button>
                )}
              </div>

              {companyLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              ) : companyProfile && !isEditingCompany ? (
                <Card>
                  <CardContent className="grid gap-4 pt-6 sm:grid-cols-2">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {t("companyName")}
                      </p>
                      <p className="font-medium">{companyProfile.companyName}</p>
                    </div>
                    {companyProfile.industry && (
                      <div>
                        <p className="text-sm text-muted-foreground">{t("industry")}</p>
                        <p className="font-medium">
                          {t(`industryOptions.${companyProfile.industry}`)}
                        </p>
                      </div>
                    )}
                    {companyProfile.companySize && (
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {t("companySize")}
                        </p>
                        <p className="font-medium">
                          {t(`companySizeOptions.${companyProfile.companySize}`)}
                        </p>
                      </div>
                    )}
                    {companyProfile.userRole && (
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {t("yourRole")}
                        </p>
                        <p className="font-medium">{companyProfile.userRole}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">
                      {companyProfile
                        ? t("editCompanyProfile")
                        : t("tellUsAboutCompany")}
                    </CardTitle>
                    <CardDescription>
                      {t("companyProfileDescription")}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {companyError && (
                      <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
                        {companyError}
                      </div>
                    )}
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="companyName">{t("companyNameRequired")}</Label>
                        <Input
                          id="companyName"
                          value={companyForm.companyName}
                          onChange={(e) =>
                            setCompanyForm((prev) => ({
                              ...prev,
                              companyName: e.target.value,
                            }))
                          }
                          placeholder="Acme Corp"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="industry">{t("industry")}</Label>
                        <Select
                          value={companyForm.industry}
                          onValueChange={(value) =>
                            setCompanyForm((prev) => ({
                              ...prev,
                              industry: value,
                            }))
                          }
                        >
                          <SelectTrigger id="industry">
                            <SelectValue placeholder={t("selectIndustry")} />
                          </SelectTrigger>
                          <SelectContent>
                            {industryValues.map((value) => (
                              <SelectItem key={value} value={value}>
                                {t(`industryOptions.${value}`)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="companySize">{t("companySize")}</Label>
                        <Select
                          value={companyForm.companySize}
                          onValueChange={(value) =>
                            setCompanyForm((prev) => ({
                              ...prev,
                              companySize: value,
                            }))
                          }
                        >
                          <SelectTrigger id="companySize">
                            <SelectValue placeholder={t("selectSize")} />
                          </SelectTrigger>
                          <SelectContent>
                            {companySizeValues.map((value) => (
                              <SelectItem key={value} value={value}>
                                {t(`companySizeOptions.${value}`)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="userRole">{t("yourRole")}</Label>
                        <Input
                          id="userRole"
                          value={companyForm.userRole}
                          onChange={(e) =>
                            setCompanyForm((prev) => ({
                              ...prev,
                              userRole: e.target.value,
                            }))
                          }
                          placeholder={t("rolePlaceholder")}
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      {isEditingCompany && (
                        <Button
                          variant="outline"
                          onClick={() => {
                            setIsEditingCompany(false);
                            if (companyProfile) {
                              setCompanyForm({
                                companyName: companyProfile.companyName || "",
                                industry: companyProfile.industry || "",
                                companySize: companyProfile.companySize || "",
                                userRole: companyProfile.userRole || "",
                              });
                            }
                          }}
                        >
                          <X className="mr-2 h-4 w-4" />
                          {t("cancel")}
                        </Button>
                      )}
                      <Button
                        onClick={handleSaveCompanyProfile}
                        disabled={companySaving}
                      >
                        {companySaving ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <Save className="mr-2 h-4 w-4" />
                        )}
                        {t("saveProfile")}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Worksheets Section */}
            <div>
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ClipboardList className="h-5 w-5 text-muted-foreground" />
                  <h2 className="text-xl font-semibold">{t("preMeetingWorksheets")}</h2>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/thunkbox/worksheet">{t("newWorksheet")}</Link>
                </Button>
              </div>

              {worksheetsLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              ) : worksheetsError ? (
                <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-center">
                  <p className="text-destructive">{worksheetsError}</p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => {
                      setWorksheetsError(null);
                      fetchWorksheets();
                    }}
                  >
                    {t("tryAgain")}
                  </Button>
                </div>
              ) : worksheets.length === 0 ? (
                <div className="rounded-lg border border-dashed border-border bg-muted/30 p-8 text-center">
                  <ClipboardList className="mx-auto h-10 w-10 text-muted-foreground/50" />
                  <h3 className="mt-4 font-medium">{t("noWorksheetsYet")}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {t("noWorksheetsDescription")}
                  </p>
                  <Button className="mt-4" variant="outline" asChild>
                    <Link href="/thunkbox/worksheet">{t("startWorksheet")}</Link>
                  </Button>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {worksheets.map((worksheet) => (
                    <Card key={worksheet.id} className="group relative">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                            <ClipboardList className="h-5 w-5 text-primary" />
                          </div>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
                                disabled={deletingWorksheetId === worksheet.id}
                              >
                                {deletingWorksheetId === worksheet.id ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                                )}
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  {t("deleteWorksheetTitle")}
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  {t("deleteWorksheetDescription", { name: worksheet.name })}
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() =>
                                    handleDeleteWorksheet(worksheet.id)
                                  }
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  {t("delete")}
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                        <CardTitle className="mt-4 text-base">
                          {worksheet.name}
                        </CardTitle>
                        <CardDescription>{t("preMeetingWorksheet")}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(worksheet.createdAt).toLocaleDateString(
                              "en-US",
                              { month: "short", day: "numeric", year: "numeric" }
                            )}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {new Date(worksheet.updatedAt).toLocaleTimeString(
                              "en-US",
                              { hour: "numeric", minute: "2-digit" }
                            )}
                          </span>
                        </div>
                        <Button
                          variant="outline"
                          className="mt-4 w-full"
                          onClick={() => handleOpenWorksheet(worksheet)}
                        >
                          {t("view")}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            {/* Saved Tools Section */}
            <div>
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Wrench className="h-5 w-5 text-muted-foreground" />
                  <h2 className="text-xl font-semibold">{t("savedTools")}</h2>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/learn/tools">{t("exploreTools")}</Link>
                </Button>
              </div>

              {savesLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              ) : savesError ? (
                <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-center">
                  <p className="text-destructive">{savesError}</p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => {
                      setSavesError(null);
                      fetchSaves();
                    }}
                  >
                    {t("tryAgain")}
                  </Button>
                </div>
              ) : saves.length === 0 ? (
                <div className="rounded-lg border border-dashed border-border bg-muted/30 p-8 text-center">
                  <FolderOpen className="mx-auto h-10 w-10 text-muted-foreground/50" />
                  <h3 className="mt-4 font-medium">{t("noSavedToolsYet")}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {t("noSavedToolsDescription")}
                  </p>
                  <Button className="mt-4" variant="outline" asChild>
                    <Link href="/learn/tools">{t("exploreTools")}</Link>
                  </Button>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {saves.map((save) => (
                    <Card key={save.id} className="group relative">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                            <FileText className="h-5 w-5 text-primary" />
                          </div>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
                                disabled={deletingToolId === save.id}
                              >
                                {deletingToolId === save.id ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                                )}
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  {t("deleteSaveTitle")}
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  {t("deleteSaveDescription", { name: save.name })}
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeleteTool(save.id)}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  {t("delete")}
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                        <CardTitle className="mt-4 text-base">
                          {save.name}
                        </CardTitle>
                        <CardDescription>
                          {t(`toolTypeLabels.${save.toolType}`)}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(save.createdAt).toLocaleDateString(
                              "en-US",
                              { month: "short", day: "numeric", year: "numeric" }
                            )}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {new Date(save.updatedAt).toLocaleTimeString(
                              "en-US",
                              { hour: "numeric", minute: "2-digit" }
                            )}
                          </span>
                        </div>
                        <Button
                          variant="outline"
                          className="mt-4 w-full"
                          onClick={() => handleOpenTool(save)}
                        >
                          {t("open")}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Access Tools */}
            <div>
              <div className="mb-6 flex items-center gap-2">
                <Wrench className="h-5 w-5 text-muted-foreground" />
                <h2 className="text-xl font-semibold">{t("quickAccess")}</h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Card className="group hover:border-primary/50 transition-colors">
                  <CardContent className="pt-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 mb-3">
                      <MessageSquare className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-medium">{t("askAnything")}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {t("askAnythingDescription")}
                    </p>
                    <Button variant="outline" size="sm" className="mt-4 w-full" asChild>
                      <Link href="/thunkbox/ask">
                        {t("startChat")} <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="group hover:border-primary/50 transition-colors">
                  <CardContent className="pt-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 mb-3">
                      <Headphones className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-medium">{t("audioLibrary")}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {t("audioLibraryDescription")}
                    </p>
                    <Button variant="outline" size="sm" className="mt-4 w-full" asChild>
                      <Link href="/thunkbox/audio">
                        {t("browseAudio")} <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="group hover:border-primary/50 transition-colors">
                  <CardContent className="pt-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 mb-3">
                      <ClipboardList className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-medium">{t("newWorksheet")}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {t("newWorksheetDescription")}
                    </p>
                    <Button variant="outline" size="sm" className="mt-4 w-full" asChild>
                      <Link href="/thunkbox/worksheet">
                        {t("createNew")} <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="group hover:border-primary/50 transition-colors">
                  <CardContent className="pt-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 mb-3">
                      <Send className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-medium">{t("submitRequest")}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {t("submitRequestDescription")}
                    </p>
                    <Button variant="outline" size="sm" className="mt-4 w-full" asChild>
                      <Link href="/thunkbox/request">
                        {t("submit")} <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
