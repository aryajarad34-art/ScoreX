import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, User, Briefcase, IndianRupee, ChevronRight, ChevronLeft, Camera, Upload, CheckCircle2 } from "lucide-react";
import { generateCreditScore, type Applicant } from "@/lib/mockData";

const steps = ["Personal Info", "Income & Family", "Employment", "Identity Verification"];

const ApplyPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'scanning' | 'verified'>('idle');
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    monthlyIncome: "",
    familyIncome: "",
    familyMembers: "",
    employer: "",
    companyCategory: "",
    yearsEmployed: "",
  });

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSimulateVerification = () => {
    setVerificationStatus('scanning');
    setTimeout(() => setVerificationStatus('verified'), 2500);
  };

  const handleSubmit = () => {
    const result = generateCreditScore(
      Number(formData.monthlyIncome),
      Number(formData.familyIncome),
      Number(formData.yearsEmployed),
      formData.companyCategory
    );
    // Store in sessionStorage for demo
    const applicant: Applicant = {
      id: `APP-${Date.now()}`,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      monthlyIncome: Number(formData.monthlyIncome),
      familyIncome: Number(formData.familyIncome),
      familyMembers: Number(formData.familyMembers),
      employer: formData.employer,
      companyCategory: formData.companyCategory,
      yearsEmployed: Number(formData.yearsEmployed),
      status: "verified",
      creditScore: result.score,
      riskCategory: result.riskCategory,
      loanEligibility: result.loanEligibility,
      identityVerified: verificationStatus === 'verified',
      fraudScore: Math.round(Math.random() * 15),
      appliedAt: new Date().toISOString().split("T")[0],
      factors: result.factors,
    };
    sessionStorage.setItem("latestApplicant", JSON.stringify(applicant));
    navigate("/dashboard");
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0: return formData.name && formData.email && formData.phone;
      case 1: return formData.monthlyIncome && formData.familyIncome && formData.familyMembers;
      case 2: return formData.employer && formData.companyCategory && formData.yearsEmployed;
      case 3: return verificationStatus === 'verified';
      default: return false;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <nav className="border-b border-border bg-card">
        <div className="container flex h-16 items-center gap-2">
          <Shield className="h-6 w-6 text-secondary" />
          <span className="font-heading text-xl font-bold text-foreground">CreditIQ</span>
          <span className="ml-2 text-sm text-muted-foreground">/ Apply</span>
        </div>
      </nav>

      <div className="container max-w-2xl py-12">
        {/* Stepper */}
        <div className="mb-10 flex items-center justify-between">
          {steps.map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-all ${
                  i < currentStep
                    ? "bg-secondary text-secondary-foreground"
                    : i === currentStep
                    ? "gradient-hero text-primary-foreground animate-pulse-glow"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {i < currentStep ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
              </div>
              {i < steps.length - 1 && (
                <div className={`hidden h-0.5 w-8 sm:block md:w-16 ${i < currentStep ? "bg-secondary" : "bg-border"}`} />
              )}
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-border bg-card p-8 shadow-card animate-fade-in">
          <h2 className="mb-1 font-heading text-2xl font-bold text-card-foreground">{steps[currentStep]}</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            {currentStep === 0 && "Enter your personal details to get started."}
            {currentStep === 1 && "Provide income details for credit assessment."}
            {currentStep === 2 && "Employment information helps verify your application."}
            {currentStep === 3 && "Verify your identity to prevent fraud."}
          </p>

          {/* Step 0: Personal */}
          {currentStep === 0 && (
            <div className="space-y-5">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Enter your full name" value={formData.name} onChange={(e) => updateField("name", e.target.value)} className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="you@example.com" value={formData.email} onChange={(e) => updateField("email", e.target.value)} className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" placeholder="+91 XXXXX XXXXX" value={formData.phone} onChange={(e) => updateField("phone", e.target.value)} className="mt-1.5" />
              </div>
            </div>
          )}

          {/* Step 1: Income */}
          {currentStep === 1 && (
            <div className="space-y-5">
              <div>
                <Label htmlFor="monthlyIncome">Monthly Income (₹)</Label>
                <Input id="monthlyIncome" type="number" placeholder="50000" value={formData.monthlyIncome} onChange={(e) => updateField("monthlyIncome", e.target.value)} className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="familyIncome">Family Monthly Income (₹)</Label>
                <Input id="familyIncome" type="number" placeholder="100000" value={formData.familyIncome} onChange={(e) => updateField("familyIncome", e.target.value)} className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="familyMembers">Number of Family Members</Label>
                <Input id="familyMembers" type="number" placeholder="4" value={formData.familyMembers} onChange={(e) => updateField("familyMembers", e.target.value)} className="mt-1.5" />
              </div>
            </div>
          )}

          {/* Step 2: Employment */}
          {currentStep === 2 && (
            <div className="space-y-5">
              <div>
                <Label htmlFor="employer">Employer / Company Name</Label>
                <Input id="employer" placeholder="Company name" value={formData.employer} onChange={(e) => updateField("employer", e.target.value)} className="mt-1.5" />
              </div>
              <div>
                <Label>Company Category</Label>
                <Select value={formData.companyCategory} onValueChange={(v) => updateField("companyCategory", v)}>
                  <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select category" /></SelectTrigger>
                  <SelectContent>
                    {["IT/Software", "Banking/Finance", "Healthcare", "Government", "Manufacturing", "Retail", "Startup", "Self-employed", "Other"].map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="yearsEmployed">Years at Current Employer</Label>
                <Input id="yearsEmployed" type="number" placeholder="3" value={formData.yearsEmployed} onChange={(e) => updateField("yearsEmployed", e.target.value)} className="mt-1.5" />
              </div>
            </div>
          )}

          {/* Step 3: Identity Verification */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="flex flex-col items-center gap-6 rounded-lg border-2 border-dashed border-border p-10">
                {verificationStatus === 'idle' && (
                  <>
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                      <Camera className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <p className="text-center text-sm text-muted-foreground">
                      Verify your identity using webcam capture or upload a photo ID.
                    </p>
                    <div className="flex gap-3">
                      <Button variant="accent" onClick={handleSimulateVerification}>
                        <Camera className="h-4 w-4" /> Use Webcam
                      </Button>
                      <Button variant="outline" onClick={handleSimulateVerification}>
                        <Upload className="h-4 w-4" /> Upload Photo
                      </Button>
                    </div>
                  </>
                )}
                {verificationStatus === 'scanning' && (
                  <>
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-secondary/10 animate-pulse-glow">
                      <Shield className="h-10 w-10 text-secondary" />
                    </div>
                    <p className="text-sm font-medium text-foreground">Scanning face & verifying identity...</p>
                    <div className="h-2 w-48 overflow-hidden rounded-full bg-muted">
                      <div className="h-full animate-pulse rounded-full gradient-accent" style={{ width: '70%' }} />
                    </div>
                  </>
                )}
                {verificationStatus === 'verified' && (
                  <>
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-success/10">
                      <CheckCircle2 className="h-10 w-10 text-success" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-semibold text-foreground">Identity Verified</p>
                      <p className="text-xs text-muted-foreground">Face match confidence: 97.3%</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="mt-8 flex justify-between">
            <Button variant="ghost" onClick={() => setCurrentStep((s) => s - 1)} disabled={currentStep === 0}>
              <ChevronLeft className="h-4 w-4" /> Back
            </Button>
            {currentStep < steps.length - 1 ? (
              <Button variant="default" onClick={() => setCurrentStep((s) => s + 1)} disabled={!canProceed()}>
                Next <ChevronRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button variant="accent" onClick={handleSubmit} disabled={!canProceed()}>
                Submit Application <ChevronRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyPage;