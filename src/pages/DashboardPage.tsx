import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Shield, TrendingUp, TrendingDown, Minus, AlertTriangle, CheckCircle2, Info, ArrowUpRight, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { mockApplicants, type Applicant } from "@/lib/mockData";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const riskColors = { low: "text-success", medium: "text-warning", high: "text-destructive" };
const riskBg = { low: "bg-success/10", medium: "bg-warning/10", high: "bg-destructive/10" };

const DashboardPage = () => {
  const [applicant, setApplicant] = useState<Applicant>(mockApplicants[0]);

  useEffect(() => {
    const stored = sessionStorage.getItem("latestApplicant");
    if (stored) {
      try { setApplicant(JSON.parse(stored)); } catch {}
    }
  }, []);

  const radarData = applicant.factors.map((f) => ({ subject: f.name, score: f.score, fullMark: 100 }));
  const barData = applicant.factors.map((f) => ({ name: f.name.split(" ")[0], score: f.score }));

  const scoreColor = applicant.creditScore >= 700 ? "text-success" : applicant.creditScore >= 550 ? "text-warning" : "text-destructive";

  const improvements = [
    "Maintain consistent savings of at least 15% of monthly income",
    "Ensure all utility bills are paid before due dates",
    "Reduce discretionary spending to below 30% of income",
    "Build an emergency fund covering 3 months of expenses",
  ];

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-card">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-secondary" />
              <span className="font-heading text-xl font-bold text-foreground">CreditIQ</span>
            </Link>
            <span className="text-sm text-muted-foreground">/ Dashboard</span>
          </div>
          <div className="flex gap-2">
            <Link to="/admin"><Button variant="ghost" size="sm">Admin</Button></Link>
            <Link to="/apply"><Button variant="accent" size="sm">New Application</Button></Link>
          </div>
        </div>
      </nav>

      <div className="container py-10">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="font-heading text-3xl font-bold text-foreground">Credit Assessment Report</h1>
          <p className="text-muted-foreground">Applicant: {applicant.name} · {applicant.id}</p>
        </div>

        {/* Score Cards */}
        <div className="mb-8 grid gap-4 md:grid-cols-4">
          <div className="rounded-xl border border-border bg-card p-6 shadow-card animate-fade-in">
            <p className="text-sm text-muted-foreground">Credit Score</p>
            <p className={`font-heading text-4xl font-bold ${scoreColor}`}>{applicant.creditScore}</p>
            <p className="text-xs text-muted-foreground">out of 850</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-6 shadow-card animate-fade-in" style={{ animationDelay: "100ms" }}>
            <p className="text-sm text-muted-foreground">Risk Category</p>
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-semibold ${riskBg[applicant.riskCategory]} ${riskColors[applicant.riskCategory]}`}>
                {applicant.riskCategory === "low" ? <CheckCircle2 className="h-3.5 w-3.5" /> : applicant.riskCategory === "high" ? <AlertTriangle className="h-3.5 w-3.5" /> : <Info className="h-3.5 w-3.5" />}
                {applicant.riskCategory.charAt(0).toUpperCase() + applicant.riskCategory.slice(1)} Risk
              </span>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-6 shadow-card animate-fade-in" style={{ animationDelay: "200ms" }}>
            <p className="text-sm text-muted-foreground">Loan Eligibility</p>
            <p className="font-heading text-2xl font-bold text-foreground">₹{applicant.loanEligibility.toLocaleString()}</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-6 shadow-card animate-fade-in" style={{ animationDelay: "300ms" }}>
            <p className="text-sm text-muted-foreground">Fraud Score</p>
            <p className={`font-heading text-2xl font-bold ${applicant.fraudScore < 15 ? "text-success" : applicant.fraudScore < 30 ? "text-warning" : "text-destructive"}`}>
              {applicant.fraudScore}%
            </p>
            <p className="text-xs text-muted-foreground">{applicant.identityVerified ? "✓ Identity verified" : "⚠ Not verified"}</p>
          </div>
        </div>

        {/* Charts + Factors */}
        <div className="mb-8 grid gap-6 lg:grid-cols-2">
          {/* Radar Chart */}
          <div className="rounded-xl border border-border bg-card p-6 shadow-card">
            <h3 className="mb-4 font-heading text-lg font-semibold text-card-foreground">Score Breakdown</h3>
            <ResponsiveContainer width="100%" height={280}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
                <Radar name="Score" dataKey="score" stroke="hsl(170 55% 42%)" fill="hsl(170 55% 42%)" fillOpacity={0.2} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Factor Details */}
          <div className="rounded-xl border border-border bg-card p-6 shadow-card">
            <h3 className="mb-4 font-heading text-lg font-semibold text-card-foreground">Credit Factors</h3>
            <div className="space-y-4">
              {applicant.factors.map((factor) => (
                <div key={factor.name} className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {factor.impact === "positive" ? (
                        <TrendingUp className="h-4 w-4 text-success" />
                      ) : factor.impact === "negative" ? (
                        <TrendingDown className="h-4 w-4 text-destructive" />
                      ) : (
                        <Minus className="h-4 w-4 text-muted-foreground" />
                      )}
                      <span className="text-sm font-medium text-card-foreground">{factor.name}</span>
                    </div>
                    <span className="text-sm font-semibold text-card-foreground">{factor.score}</span>
                  </div>
                  <Progress value={factor.score} className="h-2" />
                  <p className="text-xs text-muted-foreground">{factor.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="mb-8 rounded-xl border border-border bg-card p-6 shadow-card">
          <h3 className="mb-4 font-heading text-lg font-semibold text-card-foreground">Factor Comparison</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
              <YAxis domain={[0, 100]} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} />
              <Bar dataKey="score" fill="hsl(170 55% 42%)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Improvement Suggestions */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-card">
          <div className="mb-4 flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-warning" />
            <h3 className="font-heading text-lg font-semibold text-card-foreground">Improvement Suggestions</h3>
          </div>
          <ul className="space-y-3">
            {improvements.map((tip, i) => (
              <li key={i} className="flex items-start gap-3 rounded-lg bg-muted/50 p-3">
                <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                <span className="text-sm text-card-foreground">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
