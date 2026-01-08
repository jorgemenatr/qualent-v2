import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { PageHeroBackground } from "@/components/page-hero-background";

export const metadata = {
  title: "Controversial Opinions",
  description:
    "Our contrarian views on software, AI, consulting, and how work should actually get done.",
};

const opinions = [
  {
    title: "Most AI Projects Shouldn't Be Built",
    subtitle: "At least not yet.",
    content: [
      "We make money building AI solutions, but we'll be the first to tell you that most AI projects are solutions looking for problems. Before you automate something, make sure it's actually worth automating. (or possible to automate)",
      "Sometimes a spreadsheet, a checklist, or just hiring another person is the right answer. We'd rather lose a project than build something that doesn't deliver real value.",
    ],
  },
  {
    title: "Outcome is the only thing that matters.",
    subtitle: "EVERYTHING else is a detail.",
    content: [
      "Us nerds can get caught up in the details of how things are built. Like coneseurs of fine code we can endlessly debate the best way to do something. But at the end of the day, a beautiful piece of code is worthless if it sucks to use. See our article on <a href='/reports/outcome-is-all-you-need'>Outcome is all you need</a> for more details.",
    ],
  },
  {
    title: "Enterprise Software Is Usually Terrible",
    subtitle: "Complexity is not a feature.",
    content: [
      "Most enterprise software is designed to be sold, not used. It's packed with features nobody needs, requires months of implementation, and ends up being worked around rather than worked with.",
      "Simple tools that do one thing well beat complex platforms that do everything poorly. Your team will actually use them.",
    ],
  },
  {
    title: "Meetings Are Where Work Goes to Die",
    subtitle: "If it could be an email, it should be an email.",
    content: [
      "The default response to any problem in corporate America is to schedule a meeting. Most meetings exist because someone didn't want to make a decision or write something down.",
      "We bias heavily toward async communication and written documentation. When we do meet, it's because we need to actually discuss something, not because it's Tuesday at 10am.",
    ],
  },
  {
    title: "Perfect Is the Enemy of Done",
    subtitle: "Ship it. Learn. Iterate.",
    content: [
      "We've seen too many projects die in pursuit of perfection. Six months of planning, endless stakeholder reviews, and comprehensive documentation—followed by a launch that flops because nobody actually used the thing until it was 'ready'.",
      "We'd rather ship something rough in two weeks, learn from real usage, and iterate. You'll end up with a better product faster, and you'll waste less money on features nobody wanted.",
    ],
  },
  {
    title: "Most Best Practices Aren't",
    subtitle: "Context matters more than convention.",
    content: [
      "Best practices are usually just 'practices that worked for someone else in a different context.' Blindly following them without understanding why they exist leads to cargo cult engineering.",
      "We think from first principles. Sometimes that means following conventions. Sometimes it means ignoring them entirely. The goal is solving your problem, not checking boxes.",
    ],
  },
];

export default function ControversialOpinionsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-16 md:py-20 min-h-[40vh] flex items-center overflow-hidden">
        {/* Background styling */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-transparent" />
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[400px] rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[300px] h-[250px] rounded-full bg-[rgba(132,204,22,0.08)] blur-3xl" />
        </div>
        <PageHeroBackground />

        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto w-12 h-1 bg-primary rounded-full mb-6" />
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              Controversial Opinions
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Things we believe that might ruffle some feathers. We&apos;re not
              trying to be contrarian for its own sake—these are hard-won
              lessons from years of watching projects succeed and fail.
            </p>
          </div>
        </Container>
      </section>

      {/* Opinions */}
      {opinions.map((opinion, index) => (
        <section
          key={opinion.title}
          className={`py-16 ${index % 2 === 0 ? "bg-muted/30" : ""}`}
        >
          <Container size="small">
            <div className="w-12 h-1 bg-primary rounded-full mb-6" />
            <h2 className="text-2xl font-bold">{opinion.title}</h2>
            <p className="mt-2 text-lg text-primary font-medium">
              {opinion.subtitle}
            </p>
            <div className="mt-6 space-y-4 text-muted-foreground">
              {opinion.content.map((paragraph, pIndex) => (
                <p key={pIndex}>{paragraph}</p>
              ))}
            </div>
          </Container>
        </section>
      ))}

      {/* CTA */}
      <section className="relative border-t border-border py-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(34,197,94,0.08),transparent_70%)]" />
        </div>

        <Container size="small" className="relative">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Agree? Disagree?</h2>
            <p className="mt-4 text-muted-foreground">
              We&apos;d love to hear your take. Let&apos;s have a conversation.
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
