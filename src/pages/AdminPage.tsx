import { useState } from "react";
import { Link } from "react-router-dom";
import { Shield, Search, Eye, CheckCircle2, AlertTriangle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { mockApplicants, type Applicant } from "@/lib/mockData";

const statusConfig = {
  pending: { icon: Clock, label: "Pending", className: "bg-warning/10 text-warning border-warning/20" },
  verified: { icon: CheckCircle2, label: "Verified", className: "bg-info/10 text-info border-info/20" },
  approved: { icon: CheckCircle2, label: "Approved", className: "bg-success/10 text-success border-success/20" },
  rejected: { icon: AlertTriangle, label: "Rejected", className: "bg-destructive/10 text-destructive border-destructive/20" },
};

const AdminPage = () => {
  const [search, setSearch] = useState("");
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);

  const filtered = mockApplicants.filter(
    (a) => a.name.toLowerCase().includes(search.toLowerCase()) || a.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-card">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-secondary" />
              <span className="font-heading text-xl font-bold text-foreground">CreditIQ</span>
            </Link>
            <span className="text-sm text-muted-foreground">/ Admin Panel</span>
          </div>
          <Link to="/dashboard"><Button variant="ghost" size="sm">Dashboard</Button></Link>
        </div>
      </nav>

      <div className="container py-10">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-heading text-3xl font-bold text-foreground">Applications</h1>
            <p className="text-muted-foreground">{mockApplicants.length} total applications</p>
          </div>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search by name or ID..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Application List */}
          <div className="lg:col-span-2">
            <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
              <div className="grid grid-cols-[1fr_1fr_auto_auto] gap-4 border-b border-border bg-muted/50 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <span>Applicant</span>
                <span>Company</span>
                <span>Status</span>
                <span>Score</span>
              </div>
              {filtered.map((applicant) => {
                const status = statusConfig[applicant.status];
                return (
                  <div
                    key={applicant.id}
                    onClick={() => setSelectedApplicant(applicant)}
                    className={`grid cursor-pointer grid-cols-[1fr_1fr_auto_auto] gap-4 border-b border-border px-6 py-4 transition-colors hover:bg-muted/30 ${selectedApplicant?.id === applicant.id ? "bg-muted/50" : ""}`}
                  >
                    <div>
                      <p className="text-sm font-medium text-card-foreground">{applicant.name}</p>
                      <p className="text-xs text-muted-foreground">{applicant.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-card-foreground">{applicant.employer}</p>
                      <p className="text-xs text-muted-foreground">{applicant.companyCategory}</p>
                    </div>
                    <Badge variant="outline" className={status.className}>
                      <status.icon className="mr-1 h-3 w-3" />
                      {status.label}
                    </Badge>
                    <span className={`text-sm font-bold ${applicant.creditScore >= 700 ? "text-success" : applicant.creditScore >= 550 ? "text-warning" : "text-destructive"}`}>
                      {applicant.creditScore}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Detail Panel */}
          <div>
            {selectedApplicant ? (
              <div className="sticky top-24 rounded-xl border border-border bg-card p-6 shadow-card animate-slide-in-right">
                <h3 className="mb-4 font-heading text-lg font-semibold text-card-foreground">{selectedApplicant.name}</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">ID</span><span className="font-medium text-card-foreground">{selectedApplicant.id}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Email</span><span className="font-medium text-card-foreground">{selectedApplicant.email}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Monthly Income</span><span className="font-medium text-card-foreground">₹{selectedApplicant.monthlyIncome.toLocaleString()}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Family Income</span><span className="font-medium text-card-foreground">₹{selectedApplicant.familyIncome.toLocaleString()}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Employer</span><span className="font-medium text-card-foreground">{selectedApplicant.employer}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Years Employed</span><span className="font-medium text-card-foreground">{selectedApplicant.yearsEmployed}</span></div>
                  <hr className="border-border" />
                  <div className="flex justify-between"><span className="text-muted-foreground">Credit Score</span><span className={`font-bold ${selectedApplicant.creditScore >= 700 ? "text-success" : "text-warning"}`}>{selectedApplicant.creditScore}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Risk</span><span className="font-medium capitalize text-card-foreground">{selectedApplicant.riskCategory}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Loan Eligibility</span><span className="font-medium text-card-foreground">₹{selectedApplicant.loanEligibility.toLocaleString()}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Fraud Score</span><span className={`font-medium ${selectedApplicant.fraudScore < 15 ? "text-success" : "text-destructive"}`}>{selectedApplicant.fraudScore}%</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Identity</span><span className={selectedApplicant.identityVerified ? "text-success" : "text-destructive"}>{selectedApplicant.identityVerified ? "Verified ✓" : "Not Verified"}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Applied</span><span className="font-medium text-card-foreground">{selectedApplicant.appliedAt}</span></div>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center rounded-xl border-2 border-dashed border-border">
                <div className="text-center">
                  <Eye className="mx-auto mb-2 h-8 w-8 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Select an applicant to view details</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
