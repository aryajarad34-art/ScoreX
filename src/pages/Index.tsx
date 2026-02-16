import { Link } from "react-router-dom";
import { Shield, BarChart3, Brain, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const features = [
  {
    icon: Shield,
    title: "Fraud Prevention",
    description: "AI-powered identity verification and employment validation to prevent impersonation.",
  },
  {
    icon: Brain,
    title: "ML Credit Scoring",
    description: "Explainable credit scores based on spending behavior, not just credit history.",
  },
  {
    icon: BarChart3,
    title: "Transaction Analysis",
    description: "Deep analysis of income consistency, savings patterns, and bill payment behavior.",
  },
  {
    icon: Users,
    title: "Fair Access",
    description: "Enabling credit access for underbanked populations through alternative data.",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-hero">
              <Shield className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-heading text-xl font-bold text-foreground">CreditIQ</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/dashboard">
              <Button variant="ghost" size="sm">Dashboard</Button>
            </Link>
            <Link to="/admin">
              <Button variant="ghost" size="sm">Admin</Button>
            </Link>
            <Link to="/apply">
              <Button variant="accent" size="sm">Apply Now</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden pt-16">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-background" />
        <div className="container relative z-10 text-center">
          <div className="mx-auto max-w-3xl animate-fade-in">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-4 py-1.5 text-sm text-secondary-foreground">
              <Brain className="h-4 w-4 text-secondary" />
              <span className="text-primary-foreground/90">AI-Powered Credit Intelligence</span>
            </div>
            <h1 className="mb-6 font-heading text-5xl font-bold leading-tight tracking-tight text-primary-foreground md:text-6xl">
              Fair Credit Access for{" "}
              <span className="text-secondary">Everyone</span>
            </h1>
            <p className="mb-10 text-lg text-primary-foreground/70 md:text-xl">
              Intelligent credit assessment beyond traditional scores. Using transaction behavior,
              employment verification, and AI scoring to unlock financial opportunities.
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link to="/apply">
                <Button variant="accent" size="xl">
                  Start Application
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="outline" size="xl" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
                  View Demo Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24">
        <div className="container">
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-heading text-3xl font-bold text-foreground md:text-4xl">
              How CreditIQ Works
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              A modular, transparent approach to credit assessment that protects both lenders and borrowers.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, i) => (
              <div
                key={feature.title}
                className="group rounded-xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:shadow-elevated hover:-translate-y-1"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10">
                  <feature.icon className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="mb-2 font-heading text-lg font-semibold text-card-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-muted/50 py-20">
        <div className="container text-center">
          <h2 className="mb-4 font-heading text-3xl font-bold text-foreground">
            Ready to get assessed?
          </h2>
          <p className="mb-8 text-muted-foreground">
            Complete your application in under 5 minutes. No traditional credit history required.
          </p>
          <Link to="/apply">
            <Button variant="hero" size="xl">Begin Credit Application</Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-secondary" />
            <span className="font-heading text-sm font-semibold text-foreground">CreditIQ</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2026 CreditIQ. Hackathon prototype — not financial advice.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
