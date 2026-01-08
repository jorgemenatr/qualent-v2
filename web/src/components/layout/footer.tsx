import Link from "next/link";
import Image from "next/image";
import { Container } from "./container";

const footerLinks = {
  services: [
    { name: "Problem Identification", href: "/services/problem-identification" },
    { name: "Implementation", href: "/services/implementation" },
    { name: "Ongoing Partnership", href: "/services/partnership" },
  ],
  resources: [
    { name: "Learn", href: "/learn" },
    { name: "Case Studies", href: "/proof" },
    { name: "Thunk Box", href: "/thunkbox" },
  ],
  company: [
    { name: "About", href: "/about" },
    { name: "Contact", href: "/talk" },
    { name: "Privacy", href: "/privacy" },
    { name: "Terms", href: "/terms" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <Container className="py-12 md:py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 flex items-center justify-center md:justify-start">
            <Link href="/" className="inline-block">
              <Image
                src="/logo.png"
                alt="PickleLlama.Studio"
                width={200}
                height={200}
                className="h-40 w-auto"
              />
            </Link>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold">Services</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold">Resources</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold">Company</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-border pt-8">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} PickleLlama. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
