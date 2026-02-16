export interface Applicant {
  id: string;
  name: string;
  email: string;
  phone: string;
  monthlyIncome: number;
  familyIncome: number;
  familyMembers: number;
  employer: string;
  companyCategory: string;
  yearsEmployed: number;
  status: 'pending' | 'verified' | 'approved' | 'rejected';
  creditScore: number;
  riskCategory: 'low' | 'medium' | 'high';
  loanEligibility: number;
  identityVerified: boolean;
  fraudScore: number;
  appliedAt: string;
  factors: CreditFactor[];
}

export interface CreditFactor {
  name: string;
  impact: 'positive' | 'negative' | 'neutral';
  score: number;
  description: string;
}

export const mockApplicants: Applicant[] = [
  {
    id: "APP-001",
    name: "Priya Sharma",
    email: "priya@example.com",
    phone: "+91 98765 43210",
    monthlyIncome: 65000,
    familyIncome: 120000,
    familyMembers: 4,
    employer: "Infosys Technologies",
    companyCategory: "IT/Software",
    yearsEmployed: 3,
    status: "approved",
    creditScore: 782,
    riskCategory: "low",
    loanEligibility: 500000,
    identityVerified: true,
    fraudScore: 5,
    appliedAt: "2026-02-10",
    factors: [
      { name: "Income Consistency", impact: "positive", score: 92, description: "Steady monthly income over 12 months" },
      { name: "Savings Behavior", impact: "positive", score: 85, description: "Regular savings of 20%+ income" },
      { name: "Bill Payments", impact: "positive", score: 88, description: "On-time utility and rent payments" },
      { name: "Spending Discipline", impact: "neutral", score: 70, description: "Moderate discretionary spending" },
      { name: "Employment Stability", impact: "positive", score: 90, description: "3+ years at reputed company" },
    ],
  },
  {
    id: "APP-002",
    name: "Rahul Verma",
    email: "rahul@example.com",
    phone: "+91 87654 32109",
    monthlyIncome: 35000,
    familyIncome: 80000,
    familyMembers: 5,
    employer: "Local Retail Store",
    companyCategory: "Retail",
    yearsEmployed: 1,
    status: "pending",
    creditScore: 580,
    riskCategory: "high",
    loanEligibility: 100000,
    identityVerified: false,
    fraudScore: 25,
    appliedAt: "2026-02-14",
    factors: [
      { name: "Income Consistency", impact: "negative", score: 45, description: "Irregular income patterns detected" },
      { name: "Savings Behavior", impact: "negative", score: 30, description: "Minimal savings observed" },
      { name: "Bill Payments", impact: "neutral", score: 65, description: "Occasional delayed payments" },
      { name: "Spending Discipline", impact: "negative", score: 40, description: "High discretionary spending ratio" },
      { name: "Employment Stability", impact: "negative", score: 35, description: "Short tenure, unverified employer" },
    ],
  },
  {
    id: "APP-003",
    name: "Ananya Patel",
    email: "ananya@example.com",
    phone: "+91 76543 21098",
    monthlyIncome: 48000,
    familyIncome: 95000,
    familyMembers: 3,
    employer: "TCS",
    companyCategory: "IT/Software",
    yearsEmployed: 2,
    status: "verified",
    creditScore: 695,
    riskCategory: "medium",
    loanEligibility: 300000,
    identityVerified: true,
    fraudScore: 10,
    appliedAt: "2026-02-12",
    factors: [
      { name: "Income Consistency", impact: "positive", score: 80, description: "Stable salary credits" },
      { name: "Savings Behavior", impact: "neutral", score: 55, description: "Moderate savings pattern" },
      { name: "Bill Payments", impact: "positive", score: 78, description: "Mostly on-time payments" },
      { name: "Spending Discipline", impact: "neutral", score: 60, description: "Average spending patterns" },
      { name: "Employment Stability", impact: "positive", score: 75, description: "2 years at top-tier company" },
    ],
  },
];

export function generateCreditScore(income: number, familyIncome: number, yearsEmployed: number, companyCategory: string): {
  score: number;
  riskCategory: 'low' | 'medium' | 'high';
  loanEligibility: number;
  factors: CreditFactor[];
} {
  const companyScores: Record<string, number> = {
    'IT/Software': 90,
    'Banking/Finance': 88,
    'Healthcare': 85,
    'Government': 92,
    'Manufacturing': 75,
    'Retail': 55,
    'Startup': 60,
    'Self-employed': 50,
    'Other': 45,
  };

  const companyScore = companyScores[companyCategory] || 45;
  const incomeScore = Math.min(95, (income / 1000) * 1.2);
  const stabilityScore = Math.min(95, yearsEmployed * 20 + 30);
  const familyRatio = familyIncome > 0 ? Math.min(90, (familyIncome / 2000)) : 40;

  const rawScore = (incomeScore * 0.3 + companyScore * 0.25 + stabilityScore * 0.25 + familyRatio * 0.2);
  const score = Math.round(Math.min(850, Math.max(300, rawScore * 9 + 50)));

  const riskCategory = score >= 700 ? 'low' : score >= 550 ? 'medium' : 'high';
  const loanEligibility = Math.round((score / 850) * income * 10);

  const factors: CreditFactor[] = [
    { name: "Income Consistency", impact: incomeScore > 70 ? "positive" : incomeScore > 45 ? "neutral" : "negative", score: Math.round(incomeScore), description: incomeScore > 70 ? "Strong and stable income level" : "Income level could be improved" },
    { name: "Savings Behavior", impact: "neutral", score: Math.round(Math.random() * 30 + 50), description: "Transaction analysis pending" },
    { name: "Bill Payments", impact: "neutral", score: Math.round(Math.random() * 25 + 60), description: "Payment history analysis pending" },
    { name: "Spending Discipline", impact: "neutral", score: Math.round(Math.random() * 30 + 45), description: "Spending pattern analysis pending" },
    { name: "Employment Stability", impact: stabilityScore > 70 ? "positive" : stabilityScore > 45 ? "neutral" : "negative", score: Math.round(stabilityScore), description: `${yearsEmployed} years at ${companyCategory} company` },
  ];

  return { score, riskCategory, loanEligibility, factors };
}
