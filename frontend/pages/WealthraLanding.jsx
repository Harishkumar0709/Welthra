import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Brain,
  LineChart as LineChartIcon,
  PieChart as PieChartIcon,
  Bot,
  ShieldAlert,
  Target,
  ChevronDown,
  Menu,
  X,
  Lock,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Play,
  Wallet,
  CreditCard,
  PiggyBank,
  Umbrella,
  TrendingUp,
  GitHub,
  Linkedin,
  Twitter,
  Mail,
  Star,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import {
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  AreaChart,
  Area,
  LineChart,
  Line,
  Tooltip,
} from "recharts";

/* ------------------------------------------------------------------ */
/* DATA                                                                */
/* ------------------------------------------------------------------ */

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "AI Risk Engine", href: "#insights" },
  { label: "Financial Simulator", href: "#simulator" },
  { label: "About", href: "#faq" },
];

const FEATURES = [
  {
    icon: Brain,
    title: "AI Financial Distress Prediction",
    desc: "Our models read 40+ financial signals to flag distress risk weeks before it shows up in your bank balance.",
  },
  {
    icon: LineChartIcon,
    title: "Future Scenario Simulator",
    desc: "Model the impact of a new job, a move, a child, or a market downturn before you commit to it.",
  },
  {
    icon: PieChartIcon,
    title: "Expense Intelligence",
    desc: "Every transaction is categorized automatically and benchmarked against your own history and peers.",
  },
  {
    icon: Bot,
    title: "AI Financial Coach",
    desc: "Specific, prioritized actions — not generic tips — based on your real risk profile and goals.",
  },
  {
    icon: ShieldAlert,
    title: "Fraud & Scam Detection",
    desc: "Behavioral anomaly detection catches suspicious transactions and known scam patterns in real time.",
  },
  {
    icon: Target,
    title: "Smart Goal Planner",
    desc: "Set savings and debt-payoff goals, and let Wealthra recalculate your path as life changes.",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Connect Financial Information",
    desc: "Link accounts, cards, and loans through bank-level encrypted connections. Read-only, always.",
  },
  {
    n: "02",
    title: "AI Analyses Spending Patterns",
    desc: "Wealthra studies income, expenses, debt, and behavior against millions of anonymized profiles.",
  },
  {
    n: "03",
    title: "Predict Future Financial Risks",
    desc: "A distress score is generated, along with the specific factors driving it up or down.",
  },
  {
    n: "04",
    title: "Receive Personalized Action Plan",
    desc: "Clear, ranked recommendations arrive — built around your goals, not a generic checklist.",
  },
];

const INSIGHT_CARDS = [
  {
    icon: Wallet,
    label: "Financial Health",
    value: "82 / 100",
    tone: "good",
    note: "Improved 4 pts this month",
  },
  {
    icon: PiggyBank,
    label: "Emergency Fund",
    value: "3.2 mo",
    tone: "warn",
    note: "Below the 6-month target",
  },
  {
    icon: CreditCard,
    label: "Debt-to-Income",
    value: "34%",
    tone: "warn",
    note: "Trending upward",
  },
  {
    icon: ShieldCheck,
    label: "Credit Score",
    value: "742",
    tone: "good",
    note: "Prime tier, stable",
  },
  {
    icon: Umbrella,
    label: "Insurance Coverage",
    value: "Under-insured",
    tone: "bad",
    note: "Health cover gap found",
  },
  {
    icon: TrendingUp,
    label: "Investments",
    value: "12%",
    tone: "neutral",
    note: "Share of monthly income",
  },
];

const IMPACT_STATS = [
  { value: 98, suffix: "%", label: "Prediction Accuracy" },
  { value: 50, suffix: "K+", label: "Users Protected" },
  {
    value: 120,
    suffix: "Cr+",
    prefix: "₹",
    label: "Financial Risk Identified",
  },
  { value: 24, suffix: "/7", label: "AI Monitoring" },
];

const TESTIMONIALS = [
  {
    name: "Ananya Rao",
    role: "Product Manager, Bengaluru",
    review:
      "Wealthra flagged my rising debt ratio two months before I noticed it myself. The action plan was specific enough to actually follow.",
    rating: 5,
  },
  {
    name: "Devansh Mehta",
    role: "Small Business Owner, Pune",
    review:
      "The scenario simulator changed how I plan. I tested three different loan structures before signing anything.",
    rating: 5,
  },
  {
    name: "Priya Nair",
    role: "Software Engineer, Hyderabad",
    review:
      "It caught a suspicious transaction pattern within hours. That alone justified the subscription for the year.",
    rating: 4,
  },
];

const FAQS = [
  {
    q: "How does Wealthra predict financial distress?",
    a: "Wealthra's models analyze income stability, spending velocity, debt trajectory, and behavioral signals against patterns learned from millions of anonymized financial histories, producing a distress score updated continuously.",
  },
  {
    q: "Is my financial data secure?",
    a: "All connections are read-only and encrypted with bank-level AES-256 encryption, both in transit and at rest. Wealthra never stores your banking credentials.",
  },
  {
    q: "Which accounts can I connect?",
    a: "Bank accounts, credit cards, loans, and investment accounts from over 200 supported institutions can be linked in minutes.",
  },
  {
    q: "How accurate are the predictions?",
    a: "Our current model holds a 98% accuracy rate on 90-day distress forecasts, validated against historical outcomes across our user base.",
  },
  {
    q: "What does Wealthra cost?",
    a: "A free tier covers core health scoring and alerts. Full simulation, coaching, and fraud monitoring are available on paid plans — see Pricing for details.",
  },
];

/* ------------------------------------------------------------------ */
/* CHART DATA                                                          */
/* ------------------------------------------------------------------ */

const SCORE_DATA = [{ name: "score", value: 82, fill: "#D4AF37" }];
const SAVINGS_TREND = [
  { m: "Apr", v: 12 },
  { m: "May", v: 15 },
  { m: "Jun", v: 14 },
  { m: "Jul", v: 18 },
  { m: "Aug", v: 22 },
  { m: "Sep", v: 21 },
];
const EXPENSE_TREND = [
  { m: "Apr", v: 38 },
  { m: "May", v: 40 },
  { m: "Jun", v: 42 },
  { m: "Jul", v: 41 },
  { m: "Aug", v: 45 },
  { m: "Sep", v: 47 },
];

/* ------------------------------------------------------------------ */
/* HOOKS                                                                */
/* ------------------------------------------------------------------ */

function useOnScreen(options) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        obs.disconnect();
      }
    }, options);
    obs.observe(el);
    return () => obs.disconnect();
  }, [options]);
  return [ref, visible];
}

function useCountUp(target, visible, duration = 1400) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!visible) return;
    let start = null;
    let raf;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [visible, target, duration]);
  return val;
}

/* ------------------------------------------------------------------ */
/* SMALL COMPONENTS                                                     */
/* ------------------------------------------------------------------ */

function StatBlock({ stat }) {
  const [ref, visible] = useOnScreen({ threshold: 0.4 });
  const val = useCountUp(stat.value, visible);
  return (
    <div className="stat-block" ref={ref}>
      <div className="stat-value">
        {stat.prefix || ""}
        {val}
        {stat.suffix}
      </div>
      <div className="stat-label">{stat.label}</div>
    </div>
  );
}

function InsightCard({ card }) {
  const Icon = card.icon;
  return (
    <div className="insight-card">
      <div className="insight-card-top">
        <span className={`insight-icon tone-${card.tone}`}>
          <Icon size={17} strokeWidth={1.6} />
        </span>
        <span className={`insight-dot tone-${card.tone}`} />
      </div>
      <div className="insight-value">{card.value}</div>
      <div className="insight-label">{card.label}</div>
      <div className="insight-note">{card.note}</div>
    </div>
  );
}

function FaqItem({ item, open, onToggle }) {
  return (
    <div className={`faq-item ${open ? "open" : ""}`}>
      <button className="faq-question" onClick={onToggle}>
        <span>{item.q}</span>
        <ChevronDown size={18} className="faq-chevron" />
      </button>
      <div className="faq-answer-wrap">
        <p className="faq-answer">{item.a}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* MAIN                                                                 */
/* ------------------------------------------------------------------ */

export default function WealthraLanding() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [income, setIncome] = useState(40000);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = useCallback((e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  // simulator derived numbers
  const expenseRatio =
    0.68 + (income < 30000 ? 0.14 : income > 100000 ? -0.08 : 0);
  const expenses = Math.round(
    income * Math.min(Math.max(expenseRatio, 0.5), 0.92),
  );
  const savings = income - expenses;
  const savingsRate = savings / income;
  let risk = "Low Risk";
  let riskTone = "good";
  let recommendation =
    "Your savings rate is healthy. Consider directing the surplus toward long-term investments.";
  if (savingsRate < 0.1) {
    risk = "High Risk";
    riskTone = "bad";
    recommendation =
      "Your expenses are consuming nearly all income. Build a 3-month buffer before any new fixed commitments.";
  } else if (savingsRate < 0.22) {
    risk = "Moderate Risk";
    riskTone = "warn";
    recommendation =
      "Your buffer is thin. Redirect 5–8% of income into an emergency fund over the next two quarters.";
  }

  return (
    <div className="wr-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');

        .wr-root {
          --bg: #0A0B0E;
          --surface: #16171B;
          --surface-2: #1B1C21;
          --accent: #D4AF37;
          --accent-dim: rgba(212,175,55,0.14);
          --secondary: #2C3545;
          --text: #F4F4F5;
          --muted: #8A8B94;
          --border: #27282D;
          --good: #4FAE7D;
          --warn: #D4AF37;
          --bad: #C4604A;

          background: var(--bg);
          color: var(--text);
          font-family: 'Inter', sans-serif;
          -webkit-font-smoothing: antialiased;
          line-height: 1.5;
          overflow-x: hidden;
        }
        .wr-root * { box-sizing: border-box; }
        .wr-root h1, .wr-root h2, .wr-root h3 {
          font-family: 'Playfair Display', serif;
          font-weight: 600;
          letter-spacing: -0.01em;
          margin: 0;
        }
        .wr-root .mono { font-family: 'JetBrains Mono', monospace; }
        .wr-root a { color: inherit; text-decoration: none; }
        .wr-root section { padding: 112px 0; }
        .wr-container { max-width: 1180px; margin: 0 auto; padding: 0 32px; }
        .wr-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 12.5px; color: var(--accent);
          border: 1px solid var(--border); background: var(--surface);
          padding: 6px 14px; border-radius: 2px; margin-bottom: 22px;
        }
        .wr-section-head { max-width: 620px; margin-bottom: 56px; }
        .wr-section-head h2 { font-size: 34px; line-height: 1.2; }
        .wr-section-head p { color: var(--muted); font-size: 15.5px; margin-top: 14px; line-height: 1.65; }

        /* ---------- NAV ---------- */
        .wr-nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          padding: 18px 0;
          transition: background 300ms ease, border-color 300ms ease, padding 300ms ease;
          border-bottom: 1px solid transparent;
        }
        .wr-nav.scrolled {
          background: rgba(10,11,14,0.78);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-bottom: 1px solid var(--border);
          padding: 12px 0;
        }
        .wr-nav-inner { display: flex; align-items: center; justify-content: space-between; }
        .wr-logo-wrap { display: flex; flex-direction: column; }
        .wr-logo { font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 700; letter-spacing: 0.02em; }
        .wr-tagline { font-size: 10.5px; color: var(--muted); letter-spacing: 0.04em; margin-top: 2px; }
        .wr-nav-links { display: flex; gap: 34px; }
        .wr-nav-links a { font-size: 14px; color: var(--muted); transition: color 220ms ease; position: relative; }
        .wr-nav-links a:hover { color: var(--text); }
        .wr-nav-right { display: flex; align-items: center; gap: 14px; }
        .wr-menu-btn { display: none; background: none; border: none; color: var(--text); cursor: pointer; }

        .btn { font-size: 14px; font-weight: 500; padding: 11px 22px; border-radius: 2px;
          transition: all 300ms ease-in-out; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; border: 1px solid transparent; }
        .btn-ghost { background: transparent; color: var(--text); border-color: var(--border); }
        .btn-ghost:hover { border-color: var(--muted); }
        .btn-primary { background: var(--accent); color: #0A0B0E; font-weight: 600; }
        .btn-primary:hover { background: #e3c257; transform: translateY(-1px); }
        .btn-secondary { background: transparent; color: var(--text); border-color: var(--border); }
        .btn-secondary:hover { border-color: var(--accent); color: var(--accent); }
        .btn-lg { padding: 14px 28px; font-size: 15px; }

        /* ---------- HERO ---------- */
        .wr-hero { padding: 176px 0 100px; position: relative; }
        .wr-hero::before {
          content: ''; position: absolute; top: -120px; right: -160px; width: 640px; height: 640px;
          background: radial-gradient(circle, rgba(212,175,55,0.10) 0%, rgba(212,175,55,0) 70%);
          pointer-events: none;
        }
        .wr-hero-grid { display: grid; grid-template-columns: 1.05fr 1fr; gap: 64px; align-items: center; position: relative; }
        .wr-hero h1 { font-size: 50px; line-height: 1.12; }
        .wr-hero .accent { color: var(--accent); }
        .wr-hero p.lede { color: var(--muted); font-size: 16.5px; line-height: 1.7; margin: 26px 0 34px; max-width: 520px; }
        .wr-hero-ctas { display: flex; gap: 14px; margin-bottom: 40px; }
        .wr-trust { display: flex; flex-wrap: wrap; gap: 22px; }
        .wr-trust span { font-size: 12.5px; color: var(--muted); display: flex; align-items: center; gap: 7px; }
        .wr-trust svg { color: var(--accent); }

        /* ---------- DASHBOARD CARD ---------- */
        .wr-dash {
          background: var(--surface); border: 1px solid var(--border); border-radius: 2px;
          padding: 26px; position: relative;
        }
        .wr-dash-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 22px; }
        .wr-dash-score-label { font-size: 12px; color: var(--muted); margin-bottom: 6px; }
        .wr-dash-score { font-family: 'JetBrains Mono', monospace; font-size: 34px; font-weight: 600; }
        .wr-dash-score span { font-size: 16px; color: var(--muted); font-weight: 400; }
        .wr-risk-pill { font-size: 11.5px; padding: 5px 11px; border-radius: 2px; border: 1px solid var(--accent); color: var(--accent); background: var(--accent-dim); }
        .wr-ring-wrap { width: 92px; height: 92px; position: relative; }
        .wr-ring-center { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-family: 'JetBrains Mono', monospace; font-size: 15px; color: var(--accent); }

        .wr-dash-metrics { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 20px; }
        .wr-metric { background: var(--surface-2); border: 1px solid var(--border); padding: 12px; border-radius: 2px; }
        .wr-metric-label { font-size: 10.5px; color: var(--muted); margin-bottom: 6px; }
        .wr-metric-value { font-family: 'JetBrains Mono', monospace; font-size: 14px; }

        .wr-dash-charts { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 20px; }
        .wr-chart-card { background: var(--surface-2); border: 1px solid var(--border); border-radius: 2px; padding: 12px; }
        .wr-chart-title { font-size: 10.5px; color: var(--muted); margin-bottom: 4px; display: flex; justify-content: space-between; }

        .wr-insight-list { display: flex; flex-direction: column; gap: 9px; }
        .wr-insight-row { display: flex; align-items: flex-start; gap: 9px; font-size: 12.5px; color: var(--muted); }
        .wr-insight-row svg { flex-shrink: 0; margin-top: 2px; }
        .wr-insight-row.up svg { color: var(--good); }
        .wr-insight-row.down svg { color: var(--bad); }

        /* ---------- FEATURES ---------- */
        .wr-feature-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--border); border: 1px solid var(--border); }
        .wr-feature-card { background: var(--bg); padding: 34px 30px; transition: background 300ms ease; }
        .wr-feature-card:hover { background: var(--surface); }
        .wr-feature-icon { width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; border: 1px solid var(--border); border-radius: 2px; color: var(--accent); margin-bottom: 20px; }
        .wr-feature-card h3 { font-size: 18px; margin-bottom: 10px; font-weight: 600; }
        .wr-feature-card p { font-size: 14px; color: var(--muted); line-height: 1.65; }

        /* ---------- HOW IT WORKS ---------- */
        .wr-steps { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; position: relative; }
        .wr-step { padding: 0 24px 0 0; position: relative; }
        .wr-step:not(:last-child)::after {
          content: ''; position: absolute; top: 20px; right: 0; width: 24px; height: 1px; background: var(--border);
        }
        .wr-step-n { font-family: 'JetBrains Mono', monospace; color: var(--accent); font-size: 13px; margin-bottom: 18px; }
        .wr-step h3 { font-size: 16.5px; margin-bottom: 10px; font-weight: 600; }
        .wr-step p { font-size: 13.5px; color: var(--muted); line-height: 1.6; }

        /* ---------- SIMULATOR ---------- */
        .wr-sim-card { background: var(--surface); border: 1px solid var(--border); border-radius: 2px; padding: 44px; }
        .wr-sim-top { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 30px; flex-wrap: wrap; gap: 12px; }
        .wr-sim-income { font-family: 'JetBrains Mono', monospace; font-size: 30px; color: var(--accent); }
        .wr-slider { width: 100%; margin-bottom: 34px; }
        .wr-slider input[type="range"] {
          -webkit-appearance: none; width: 100%; height: 2px; background: var(--border); outline: none; border-radius: 2px;
        }
        .wr-slider input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none; width: 16px; height: 16px; border-radius: 50%; background: var(--accent); cursor: pointer;
          border: 3px solid var(--bg); box-shadow: 0 0 0 1px var(--accent);
        }
        .wr-slider-labels { display: flex; justify-content: space-between; font-size: 11.5px; color: var(--muted); margin-top: 10px; }
        .wr-sim-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
        .wr-sim-metric { border: 1px solid var(--border); background: var(--surface-2); padding: 18px; border-radius: 2px; }
        .wr-sim-metric-label { font-size: 11.5px; color: var(--muted); margin-bottom: 10px; }
        .wr-sim-metric-value { font-family: 'JetBrains Mono', monospace; font-size: 19px; transition: color 300ms ease; }
        .wr-sim-rec { margin-top: 24px; padding: 18px 20px; border: 1px solid var(--border); border-left: 2px solid var(--accent); background: var(--surface-2); font-size: 13.5px; color: var(--muted); line-height: 1.6; }
        .tone-good { color: var(--good); }
        .tone-warn { color: var(--warn); }
        .tone-bad { color: var(--bad); }
        .tone-neutral { color: var(--text); }

        /* ---------- AI INSIGHTS ---------- */
        .wr-insights-layout { display: grid; grid-template-columns: 1fr 320px; gap: 22px; }
        .wr-insight-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
        .insight-card { background: var(--surface); border: 1px solid var(--border); border-radius: 2px; padding: 20px; transition: border-color 300ms ease; }
        .insight-card:hover { border-color: #3a3c44; }
        .insight-card-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; }
        .insight-icon { width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border: 1px solid var(--border); border-radius: 2px; }
        .insight-dot { width: 7px; height: 7px; border-radius: 50%; background: currentColor; }
        .insight-value { font-family: 'JetBrains Mono', monospace; font-size: 19px; margin-bottom: 6px; }
        .insight-label { font-size: 13px; color: var(--text); margin-bottom: 4px; }
        .insight-note { font-size: 11.5px; color: var(--muted); }

        .wr-reco-panel { background: var(--surface); border: 1px solid var(--accent); border-radius: 2px; padding: 24px; height: fit-content; }
        .wr-reco-top { display: flex; align-items: center; gap: 8px; color: var(--accent); font-size: 12.5px; margin-bottom: 16px; }
        .wr-reco-text { font-size: 14px; line-height: 1.65; color: var(--text); margin-bottom: 20px; }
        .wr-confidence-label { display: flex; justify-content: space-between; font-size: 11.5px; color: var(--muted); margin-bottom: 8px; }
        .wr-confidence-bar { height: 4px; background: var(--surface-2); border-radius: 2px; overflow: hidden; }
        .wr-confidence-fill { height: 100%; background: var(--accent); width: 94%; }

        /* ---------- IMPACT ---------- */
        .wr-impact-section { background: var(--surface); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); padding: 90px 0; }
        .wr-impact-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; text-align: center; }
        .stat-value { font-family: 'JetBrains Mono', monospace; font-size: 42px; color: var(--accent); }
        .stat-label { font-size: 13px; color: var(--muted); margin-top: 10px; }

        /* ---------- TESTIMONIALS ---------- */
        .wr-testi-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .wr-testi-card { background: var(--surface); border: 1px solid var(--border); border-radius: 2px; padding: 28px; display: flex; flex-direction: column; }
        .wr-testi-stars { display: flex; gap: 3px; margin-bottom: 18px; color: var(--accent); }
        .wr-testi-review { font-size: 14.5px; color: var(--text); line-height: 1.7; margin-bottom: 26px; flex: 1; }
        .wr-testi-person { display: flex; align-items: center; gap: 12px; }
        .wr-avatar { width: 38px; height: 38px; border-radius: 50%; background: var(--secondary); display: flex; align-items: center; justify-content: center; font-family: 'Playfair Display', serif; font-size: 14px; color: var(--accent); }
        .wr-testi-name { font-size: 14px; font-weight: 500; }
        .wr-testi-role { font-size: 12px; color: var(--muted); }

        /* ---------- FAQ ---------- */
        .wr-faq-list { max-width: 760px; }
        .faq-item { border-bottom: 1px solid var(--border); }
        .faq-question { width: 100%; background: none; border: none; color: var(--text); text-align: left; padding: 22px 0; font-size: 15.5px; font-family: 'Inter', sans-serif; display: flex; justify-content: space-between; align-items: center; cursor: pointer; }
        .faq-chevron { color: var(--muted); transition: transform 300ms ease; flex-shrink: 0; }
        .faq-item.open .faq-chevron { transform: rotate(180deg); color: var(--accent); }
        .faq-answer-wrap { max-height: 0; overflow: hidden; transition: max-height 350ms ease; }
        .faq-item.open .faq-answer-wrap { max-height: 200px; }
        .faq-answer { font-size: 14px; color: var(--muted); line-height: 1.7; padding-bottom: 22px; margin: 0; max-width: 640px; }

        /* ---------- CTA BAND ---------- */
        .wr-cta-band { text-align: center; padding: 100px 0; }
        .wr-cta-band h2 { font-size: 32px; max-width: 560px; margin: 0 auto 16px; }
        .wr-cta-band p { color: var(--muted); font-size: 15px; margin-bottom: 34px; }

        /* ---------- FOOTER ---------- */
        .wr-footer { border-top: 1px solid var(--border); padding: 64px 0 30px; }
        .wr-footer-grid { display: grid; grid-template-columns: 1.4fr 1fr 1fr 0.8fr; gap: 40px; margin-bottom: 50px; }
        .wr-footer-tag { color: var(--muted); font-size: 13px; margin-top: 14px; max-width: 220px; line-height: 1.6; }
        .wr-footer-col h4 { font-size: 12.5px; color: var(--muted); margin-bottom: 16px; font-weight: 500; }
        .wr-footer-col a { display: block; font-size: 14px; color: var(--text); margin-bottom: 12px; opacity: 0.85; transition: opacity 200ms ease; }
        .wr-footer-col a:hover { opacity: 1; color: var(--accent); }
        .wr-social { display: flex; gap: 12px; }
        .wr-social a { width: 34px; height: 34px; border: 1px solid var(--border); border-radius: 2px; display: flex; align-items: center; justify-content: center; color: var(--muted); transition: all 250ms ease; }
        .wr-social a:hover { color: var(--accent); border-color: var(--accent); }
        .wr-footer-bottom { border-top: 1px solid var(--border); padding-top: 24px; font-size: 12.5px; color: var(--muted); display: flex; justify-content: space-between; }

        /* ---------- RESPONSIVE ---------- */
        @media (max-width: 1024px) {
          .wr-hero-grid { grid-template-columns: 1fr; }
          .wr-hero h1 { font-size: 42px; }
          .wr-feature-grid { grid-template-columns: repeat(2, 1fr); }
          .wr-steps { grid-template-columns: repeat(2, 1fr); row-gap: 40px; }
          .wr-step:nth-child(2)::after { display: none; }
          .wr-sim-grid { grid-template-columns: repeat(2, 1fr); }
          .wr-insights-layout { grid-template-columns: 1fr; }
          .wr-insight-grid { grid-template-columns: repeat(3, 1fr); }
          .wr-impact-grid { grid-template-columns: repeat(2, 1fr); row-gap: 36px; }
          .wr-testi-grid { grid-template-columns: 1fr; }
          .wr-footer-grid { grid-template-columns: 1fr 1fr; row-gap: 32px; }
        }
        @media (max-width: 900px) {
          .wr-nav-links { display: none; }
          .wr-menu-btn { display: block; }
        }
        @media (max-width: 480px) {
          .wr-login-btn { display: none; }
        }
        @media (max-width: 640px) {
          .wr-root section { padding: 72px 0; }
          .wr-container { padding: 0 20px; }
          .wr-hero { padding: 140px 0 60px; }
          .wr-hero h1 { font-size: 32px; }
          .wr-hero-ctas { flex-direction: column; }
          .wr-feature-grid { grid-template-columns: 1fr; }
          .wr-steps { grid-template-columns: 1fr; }
          .wr-step::after { display: none !important; }
          .wr-sim-card { padding: 24px; }
          .wr-sim-grid { grid-template-columns: 1fr 1fr; }
          .wr-insight-grid { grid-template-columns: 1fr 1fr; }
          .wr-impact-grid { grid-template-columns: 1fr 1fr; }
          .wr-footer-grid { grid-template-columns: 1fr; }
          .wr-footer-bottom { flex-direction: column; gap: 10px; }
        }

        .wr-mobile-menu {
          position: fixed; inset: 0; background: rgba(10,11,14,0.98); z-index: 200;
          display: flex; flex-direction: column; padding: 100px 32px 40px; gap: 24px;
        }
        .wr-mobile-menu a { font-size: 20px; font-family: 'Playfair Display', serif; }
        .wr-mobile-close { position: absolute; top: 24px; right: 24px; background: none; border: none; color: var(--text); cursor: pointer; }
      `}</style>

      {/* NAV */}
      <nav className={`wr-nav ${scrolled ? "scrolled" : ""}`}>
        <div className="wr-container wr-nav-inner">
          <div className="wr-logo-wrap">
            <span className="wr-logo">WEALTHRA</span>
            <span className="wr-tagline">Predict. Empower. Protect.</span>
          </div>
          <div className="wr-nav-links">
            {NAV_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={(e) => handleNavClick(e, l.href)}
              >
                {l.label}
              </a>
            ))}
          </div>
          <div className="wr-nav-right">
            <a href="#login" className="btn btn-ghost wr-login-btn">
              Login
            </a>
            <a href="#signup" className="btn btn-primary">
              Sign Up
            </a>
            <button
              className="wr-menu-btn"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </nav>

      {menuOpen && (
        <div className="wr-mobile-menu">
          <button
            className="wr-mobile-close"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={(e) => handleNavClick(e, l.href)}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}

      {/* HERO */}
      <header className="wr-hero" id="home">
        <div className="wr-container wr-hero-grid">
          <div>
            <span className="wr-eyebrow">
              <Sparkles size={13} /> AI-Powered Financial Distress Prediction
            </span>
            <h1>
              Know Your Financial Risk
              <br />
              Before It Becomes A <span className="accent">Crisis.</span>
            </h1>
            <p className="lede">
              Wealthra uses artificial intelligence, predictive analytics, and
              behavioral financial modeling to detect early warning signs,
              simulate future outcomes, and deliver proactive recommendations
              that keep you financially resilient.
            </p>
            <div className="wr-hero-ctas">
              <a
                href="#simulator"
                className="btn btn-primary btn-lg"
                onClick={(e) => handleNavClick(e, "#simulator")}
              >
                Check My Financial Health <ArrowRight size={16} />
              </a>
              <a
                href="#how-it-works"
                className="btn btn-secondary btn-lg"
                onClick={(e) => handleNavClick(e, "#how-it-works")}
              >
                <Play size={15} /> Watch Demo
              </a>
            </div>
            <div className="wr-trust">
              <span>
                <ShieldCheck size={15} /> Secure
              </span>
              <span>
                <Brain size={15} /> AI Powered
              </span>
              <span>
                <Lock size={15} /> Private Data
              </span>
              <span>
                <ShieldCheck size={15} /> Bank-Level Encryption
              </span>
            </div>
          </div>

          {/* HERO DASHBOARD PANEL */}
          <div className="wr-dash">
            <div className="wr-dash-top">
              <div>
                <div className="wr-dash-score-label">
                  Financial Health Score
                </div>
                <div className="wr-dash-score">
                  82<span> / 100</span>
                </div>
                <div style={{ marginTop: 10 }}>
                  <span className="wr-risk-pill">Moderate Risk</span>
                </div>
              </div>
              <div className="wr-ring-wrap">
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart
                    innerRadius="72%"
                    outerRadius="100%"
                    data={SCORE_DATA}
                    startAngle={90}
                    endAngle={-270}
                  >
                    <RadialBar
                      dataKey="value"
                      cornerRadius={2}
                      background={{ fill: "#27282D" }}
                      max={100}
                    />
                  </RadialBarChart>
                </ResponsiveContainer>
                <div className="wr-ring-center">82</div>
              </div>
            </div>

            <div className="wr-dash-metrics">
              <div className="wr-metric">
                <div className="wr-metric-label">Monthly Income</div>
                <div className="wr-metric-value">₹85,000</div>
              </div>
              <div className="wr-metric">
                <div className="wr-metric-label">Monthly Expenses</div>
                <div className="wr-metric-value">₹58,200</div>
              </div>
              <div className="wr-metric">
                <div className="wr-metric-label">Savings</div>
                <div className="wr-metric-value">₹26,800</div>
              </div>
              <div className="wr-metric">
                <div className="wr-metric-label">Debt Ratio</div>
                <div className="wr-metric-value">34%</div>
              </div>
              <div className="wr-metric">
                <div className="wr-metric-label">Credit Score</div>
                <div className="wr-metric-value">742</div>
              </div>
              <div className="wr-metric">
                <div className="wr-metric-label">Stability</div>
                <div className="wr-metric-value">Fair</div>
              </div>
            </div>

            <div className="wr-dash-charts">
              <div className="wr-chart-card">
                <div className="wr-chart-title">
                  <span>Savings Trend</span>
                  <span style={{ color: "#4FAE7D" }}>+18%</span>
                </div>
                <ResponsiveContainer width="100%" height={46}>
                  <AreaChart data={SAVINGS_TREND}>
                    <defs>
                      <linearGradient
                        id="wrSavings"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="#D4AF37"
                          stopOpacity={0.35}
                        />
                        <stop
                          offset="100%"
                          stopColor="#D4AF37"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <Area
                      type="monotone"
                      dataKey="v"
                      stroke="#D4AF37"
                      strokeWidth={1.5}
                      fill="url(#wrSavings)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="wr-chart-card">
                <div className="wr-chart-title">
                  <span>Expense Growth</span>
                  <span style={{ color: "#C4604A" }}>+9%</span>
                </div>
                <ResponsiveContainer width="100%" height={46}>
                  <LineChart data={EXPENSE_TREND}>
                    <Line
                      type="monotone"
                      dataKey="v"
                      stroke="#C4604A"
                      strokeWidth={1.5}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="wr-insight-list">
              <div className="wr-insight-row down">
                <ArrowDownRight size={14} /> Emergency fund is below the
                recommended level.
              </div>
              <div className="wr-insight-row down">
                <ArrowDownRight size={14} /> Debt ratio has increased over the
                last quarter.
              </div>
              <div className="wr-insight-row up">
                <ArrowUpRight size={14} /> Savings trend has improved month over
                month.
              </div>
              <div className="wr-insight-row down">
                <ArrowDownRight size={14} /> Expense growth is outpacing income
                growth.
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* FEATURES */}
      <section id="features">
        <div className="wr-container">
          <div className="wr-section-head">
            <span className="wr-eyebrow">Platform</span>
            <h2>Everything you need to see risk before it arrives</h2>
            <p>
              Six connected systems work together to give you a complete,
              continuously updated view of your financial resilience.
            </p>
          </div>
        </div>
        <div className="wr-container">
          <div className="wr-feature-grid">
            {FEATURES.map((f) => {
              const Icon = f.icon;
              return (
                <div className="wr-feature-card" key={f.title}>
                  <div className="wr-feature-icon">
                    <Icon size={19} strokeWidth={1.6} />
                  </div>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        id="how-it-works"
        style={{
          background: "var(--surface)",
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="wr-container">
          <div className="wr-section-head">
            <span className="wr-eyebrow">Process</span>
            <h2>From connected accounts to a clear plan</h2>
            <p>
              Four steps take you from raw transactions to a prioritized set of
              actions, refreshed continuously as your finances change.
            </p>
          </div>
          <div className="wr-steps">
            {STEPS.map((s) => (
              <div className="wr-step" key={s.n}>
                <div className="wr-step-n">{s.n}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SIMULATOR */}
      <section id="simulator">
        <div className="wr-container">
          <div className="wr-section-head">
            <span className="wr-eyebrow">What-If Simulator</span>
            <h2>Explore your financial future</h2>
            <p>
              Move the slider to see how a change in income reshapes your
              expenses, savings, and risk profile.
            </p>
          </div>

          <div className="wr-sim-card">
            <div className="wr-sim-top">
              <div>
                <div
                  style={{
                    fontSize: 12.5,
                    color: "var(--muted)",
                    marginBottom: 8,
                  }}
                >
                  Current Monthly Income
                </div>
                <div className="wr-sim-income">
                  ₹{income.toLocaleString("en-IN")}
                </div>
              </div>
              <span
                className={`wr-risk-pill`}
                style={{
                  borderColor: `var(--${riskTone === "good" ? "good" : riskTone === "warn" ? "warn" : "bad"})`,
                  color: `var(--${riskTone === "good" ? "good" : riskTone === "warn" ? "warn" : "bad"})`,
                }}
              >
                {risk}
              </span>
            </div>

            <div className="wr-slider">
              <input
                type="range"
                min="20000"
                max="150000"
                step="1000"
                value={income}
                onChange={(e) => setIncome(Number(e.target.value))}
              />
              <div className="wr-slider-labels">
                <span>₹20,000</span>
                <span>₹150,000</span>
              </div>
            </div>

            <div className="wr-sim-grid">
              <div className="wr-sim-metric">
                <div className="wr-sim-metric-label">Income</div>
                <div className="wr-sim-metric-value">
                  ₹{income.toLocaleString("en-IN")}
                </div>
              </div>
              <div className="wr-sim-metric">
                <div className="wr-sim-metric-label">Expenses</div>
                <div className="wr-sim-metric-value">
                  ₹{expenses.toLocaleString("en-IN")}
                </div>
              </div>
              <div className="wr-sim-metric">
                <div className="wr-sim-metric-label">Savings</div>
                <div className={`wr-sim-metric-value tone-${riskTone}`}>
                  ₹{savings.toLocaleString("en-IN")}
                </div>
              </div>
              <div className="wr-sim-metric">
                <div className="wr-sim-metric-label">Risk Level</div>
                <div className={`wr-sim-metric-value tone-${riskTone}`}>
                  {risk}
                </div>
              </div>
            </div>

            <div className="wr-sim-rec">{recommendation}</div>
          </div>
        </div>
      </section>

      {/* AI INSIGHTS */}
      <section
        id="insights"
        style={{
          background: "var(--surface)",
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="wr-container">
          <div className="wr-section-head">
            <span className="wr-eyebrow">AI Risk Engine</span>
            <h2>A full picture of your financial standing</h2>
            <p>
              Six dimensions are scored continuously, with a single AI
              recommendation prioritized above the rest.
            </p>
          </div>

          <div className="wr-insights-layout">
            <div className="wr-insight-grid">
              {INSIGHT_CARDS.map((c) => (
                <InsightCard card={c} key={c.label} />
              ))}
            </div>

            <div className="wr-reco-panel">
              <div className="wr-reco-top">
                <Bot size={16} /> AI Recommendation
              </div>
              <p className="wr-reco-text">
                Increase your emergency fund contribution by ₹5,000 per month to
                reach a 6-month buffer by March 2027. This single change reduces
                your distress probability by an estimated 14 points.
              </p>
              <div className="wr-confidence-label">
                <span>Model Confidence</span>
                <span className="mono" style={{ color: "var(--accent)" }}>
                  94%
                </span>
              </div>
              <div className="wr-confidence-bar">
                <div className="wr-confidence-fill" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IMPACT */}
      <section className="wr-impact-section">
        <div className="wr-container">
          <div className="wr-impact-grid">
            {IMPACT_STATS.map((s) => (
              <StatBlock stat={s} key={s.label} />
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section>
        <div className="wr-container">
          <div className="wr-section-head">
            <span className="wr-eyebrow">Testimonials</span>
            <h2>Trusted by people managing real financial risk</h2>
          </div>
          <div className="wr-testi-grid">
            {TESTIMONIALS.map((t) => (
              <div className="wr-testi-card" key={t.name}>
                <div className="wr-testi-stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      fill={i < t.rating ? "currentColor" : "none"}
                      strokeWidth={1.4}
                    />
                  ))}
                </div>
                <p className="wr-testi-review">{t.review}</p>
                <div className="wr-testi-person">
                  <div className="wr-avatar">{t.name.charAt(0)}</div>
                  <div>
                    <div className="wr-testi-name">{t.name}</div>
                    <div className="wr-testi-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        id="faq"
        style={{
          background: "var(--surface)",
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="wr-container">
          <div className="wr-section-head">
            <span className="wr-eyebrow">FAQ</span>
            <h2>Questions, answered</h2>
          </div>
          <div className="wr-faq-list">
            {FAQS.map((f, i) => (
              <FaqItem
                key={f.q}
                item={f}
                open={openFaq === i}
                onToggle={() => setOpenFaq(openFaq === i ? -1 : i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="wr-cta-band">
        <div className="wr-container">
          <h2>Know where you stand before the numbers force you to.</h2>
          <p>Free to start. No credit card required.</p>
          <a href="#signup" className="btn btn-primary btn-lg">
            Check My Financial Health <ArrowRight size={16} />
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="wr-footer">
        <div className="wr-container">
          <div className="wr-footer-grid">
            <div>
              <span className="wr-logo">WEALTHRA</span>
              <p className="wr-footer-tag">
                Predict. Empower. Protect. AI-powered financial distress
                prediction for individuals who want to see risk coming.
              </p>
            </div>
            <div className="wr-footer-col">
              <h4>Product</h4>
              <a
                href="#features"
                onClick={(e) => handleNavClick(e, "#features")}
              >
                Features
              </a>
              <a href="#pricing">Pricing</a>
              <a
                href="#how-it-works"
                onClick={(e) => handleNavClick(e, "#how-it-works")}
              >
                How It Works
              </a>
              <a href="#resources">Resources</a>
            </div>
            <div className="wr-footer-col">
              <h4>Company</h4>
              <a href="#about">About</a>
              <a href="#privacy">Privacy</a>
              <a href="#terms">Terms</a>
              <a href="#contact">Contact</a>
            </div>
            <div className="wr-footer-col">
              <h4>Connect</h4>
              <div className="wr-social">
                <a href="#linkedin" aria-label="LinkedIn">
                  <Linkedin size={15} />
                </a>
                <a href="#github" aria-label="GitHub">
                  <GitHub size={20} />
                </a>
                <a href="#twitter" aria-label="Twitter">
                  <Twitter size={15} />
                </a>
                <a href="#email" aria-label="Email">
                  <Mail size={15} />
                </a>
              </div>
            </div>
          </div>
          <div className="wr-footer-bottom">
            <span>© 2026 Wealthra. All Rights Reserved.</span>
            <span>Bank-level encryption. Read-only access.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
