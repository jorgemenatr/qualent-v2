import Link from "next/link";
import { ArrowRight, Goal, Zap, Rocket, MessageCircle } from "lucide-react";
import { Container } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeroBackground } from "@/components/page-hero-background";

export const metadata = {
  title: "Services",
  description:
    "Explore PickleLlama's AI and automation consulting services for mid-market companies.",
};

const services = [
  {
    title: "Get to Know You",
    description:
      "Every engagement starts with understanding. We begin with a 17-minute diagnostic to identify your top problems and quantify what they cost.",
    icon: MessageCircle,
    href: "/talk",
    features: [
      "17-minute diagnostic call",
      "Identify your top problems",
      "Quantify what they're costing you",
      "No obligation—just clarity on whether the math works",
    ],
  },
  {
    title: "Problem Identification as a Service (PIaaS)",
    description:
      "Before we build anything, we help you figure out what's actually worth building. Not every problem needs a custom solution—we help you prioritize the ones that do.",
    icon: Goal,
    href: "/services/problem-identification",
    features: [
      "Process analysis and mapping",
      "Opportunity prioritization",
      "ROI assessment",
      "Build vs. buy recommendations",
    ],
  },
  {
    title: "Implementation",
    description:
      "Fast, focused sprints that turn your biggest pain points into working solutions. We prototype in days and launch in weeks, not months.",
    icon: Zap,
    href: "/services/implementation",
    features: [
      "Rapid prototyping",
      "Custom AI solutions",
      "Process automation",
      "Integration with existing systems",
    ],
  },
  {
    title: "Ongoing Partnership",
    description:
      "Long-term support to keep your solutions running, evolving, and delivering value. We become an extension of your team.",
    icon: Rocket,
    href: "/services/partnership",
    features: [
      "Maintenance and support",
      "Continuous improvement",
      "New feature development",
      "Strategic technology guidance",
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-16 md:py-20 min-h-[40vh] flex items-center overflow-hidden">
        {/* Background styling - corner accents for distinction */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Top-left decorative blur */}
          <div className="absolute -top-20 -left-20 w-[400px] h-[300px] rounded-full bg-primary/10 blur-3xl" />
          {/* Bottom-right decorative blur */}
          <div className="absolute -bottom-20 -right-20 w-[400px] h-[300px] rounded-full bg-[rgba(132,204,22,0.08)] blur-3xl" />
          {/* Subtle center glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-primary/5 blur-3xl" />
        </div>
        <PageHeroBackground />

        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            {/* Centered accent line */}
            <div className="mx-auto w-12 h-1 bg-primary rounded-full mb-6" />
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              Our Process
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Over the years, we have watched some <strong>projects crash and burn</strong>. <i>Learning</i> from failure has led us to develop a process that we are proud to share. There is a <strong>story and a reason</strong> behind each step in our process. 

              <br />
              <br />
              <strong>These are the steps we find essential for an enjoyable long-term relationship.</strong>
            </p>
          </div>
        </Container>
      </section>

      {/* Services */}
      <section className="relative border-t border-border py-20 overflow-hidden">
        {/* Subtle background accent */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-primary/3 blur-3xl" />
        </div>

        <Container className="relative">
          <div className="grid gap-8 md:grid-cols-2">
            {services.map((service) => (
              <Card
                key={service.title}
                className="flex flex-col border-2 border-transparent bg-card/80 backdrop-blur-sm transition-all hover:border-primary/20 hover:shadow-lg"
              >
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="mt-4">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col">
                  <p className="text-muted-foreground">{service.description}</p>
                  <ul className="mt-6 space-y-2">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-sm"
                      >
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-6">
                    <Button variant="outline" asChild className="w-full">
                      <Link href={service.href}>
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="relative bg-muted/50 py-20 overflow-hidden">
        {/* Corner accents matching hero */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-10 -right-10 w-[250px] h-[200px] rounded-full bg-primary/8 blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-[250px] h-[200px] rounded-full bg-[rgba(132,204,22,0.06)] blur-3xl" />
        </div>

        <Container className="relative">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold">Not sure where to start?</h2>
            <p className="mt-4 text-muted-foreground">
              17 minutes to identify your top problems and whether the math works.
            </p>
            <Button className="mt-6" asChild>
              <Link href="/talk">
                Book Your Diagnostic <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
