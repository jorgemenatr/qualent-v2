"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, User, LogOut, FolderOpen } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/lib/auth";
import { Wordmark } from "@/components/brand";
import { cn } from "@/lib/utils";
import { LocaleSwitcher } from "./locale-switcher";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { isAuthenticated, isLoading, name, email, login, logout } = useAuth();
  const t = useTranslations("Nav");
  const pathname = usePathname();
  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`) || pathname.endsWith(href);

  const navigation = [
    { name: t("process"), href: "/services" },
    { name: t("whoWeWorkWith"), href: "/who-we-work-with" },
    { name: t("proof"), href: "/proof" },
    { name: t("pricing"), href: "/pricing" },
    { name: t("learn"), href: "/learn" },
    { name: t("about"), href: "/about" },
  ];

  // Prevent hydration mismatch by only rendering auth UI after mount
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const getInitials = (name?: string, email?: string) => {
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

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-[color-mix(in_oklab,var(--pl-paper-100)_88%,transparent)] backdrop-blur-[10px]">
      <nav className="pl-container flex h-16 items-center justify-between gap-6">
        {/* Logo */}
        <Link href="/" className="flex flex-none items-center" aria-label={t("logoAlt")}>
          <Wordmark height={26} suffix={t("logoSuffix")} />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-[clamp(12px,2vw,28px)] lg:flex">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "border-b-2 pb-0.5 text-sm font-semibold transition-colors",
                isActive(item.href)
                  ? "border-pickle text-ink"
                  : "border-transparent text-ink-muted hover:text-ink"
              )}
            >
              {item.name}
            </Link>
          ))}
          <Button asChild>
            <Link href="/talk">{t("ctaButton")}</Link>
          </Button>

          <LocaleSwitcher />

          {/* Auth - only render after mount to prevent hydration mismatch */}
          {!mounted || isLoading ? (
            <div className="h-8 w-8 animate-pulse rounded-full bg-muted" />
          ) : isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                      {getInitials(name, email)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium">{name || t("userFallback")}</p>
                  {email && (
                    <p className="text-xs text-muted-foreground">{email}</p>
                  )}
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/projects" className="cursor-pointer">
                    <FolderOpen className="mr-2 h-4 w-4" />
                    {t("dropdownProjects")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    {t("dropdownProfile")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={logout}
                  className="cursor-pointer text-destructive focus:text-destructive"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  {t("dropdownSignOut")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="outline" size="sm" onClick={login}>
              {t("signIn")}
            </Button>
          )}
        </div>

        {/* Mobile Menu */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">{t("openMenu")}</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <SheetTitle className="sr-only">{t("mobileMenuTitle")}</SheetTitle>
            <div className="flex flex-col gap-6 pt-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-medium text-foreground transition-colors hover:text-primary"
                >
                  {item.name}
                </Link>
              ))}
              <Button asChild className="mt-4">
                <Link href="/talk" onClick={() => setMobileMenuOpen(false)}>
                  {t("ctaButton")}
                </Link>
              </Button>

              <LocaleSwitcher />

              {/* Mobile Auth - only render after mount to prevent hydration mismatch */}
              <div className="mt-4 border-t border-border pt-4">
                {!mounted || isLoading ? (
                  <div className="h-10 animate-pulse rounded bg-muted" />
                ) : isAuthenticated ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {getInitials(name, email)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{name || t("userFallback")}</p>
                        {email && (
                          <p className="text-sm text-muted-foreground">
                            {email}
                          </p>
                        )}
                      </div>
                    </div>
                    <Link
                      href="/projects"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
                    >
                      <FolderOpen className="h-4 w-4" />
                      {t("dropdownProjects")}
                    </Link>
                    <Link
                      href="/profile"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
                    >
                      <User className="h-4 w-4" />
                      {t("dropdownProfile")}
                    </Link>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        logout();
                      }}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      {t("dropdownSignOut")}
                    </Button>
                  </div>
                ) : (
                  <Button
                    className="w-full"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      login();
                    }}
                  >
                    {t("signIn")}
                  </Button>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
