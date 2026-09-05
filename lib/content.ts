export const features = [
  {
    icon: "shield",
    title: "Validation engine",
    description: "Normalize numbers, verify country patterns and flag malformed input before a report is generated.",
  },
  {
    icon: "map",
    title: "Location confidence",
    description: "Show regional proximity, confidence scoring and coordinate estimates without overstating precision.",
  },
  {
    icon: "database",
    title: "Carrier context",
    description: "Surface carrier, line type, timezone and routing context in a consistent report schema.",
  },
  {
    icon: "lock",
    title: "License-gated reports",
    description: "Keep sensitive report sections locked until the server validates a signed license token.",
  },
  {
    icon: "clock",
    title: "Operational controls",
    description: "Rate limiting, server-side secrets and provider interfaces make the API ready for controlled expansion.",
  },
  {
    icon: "file",
    title: "Structured output",
    description: "Return report data in an export-ready format for case notes, support tickets or downstream systems.",
  },
] as const;

export const navLinks = [
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/legal-notice", label: "Legal Notice" },
  { href: "/privacy", label: "Privacy" },
];

export const footerLinks = [
  { href: "/legal-notice", label: "Legal Notice" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/cookies", label: "Cookies" },
  { href: "/refund", label: "Refund" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];
