import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  HelpCircle,
  Lock,
  Radio,
  Share2,
  ShieldCheck,
  Sparkles,
  User,
} from "lucide-react";
import { getAllArticles, getArticleBySlug } from "@/lib/articles";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Article Not Found | PhoneLocating",
    };
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://phonelocating.com";
  const canonicalUrl = `${appUrl}/blog/${article.slug}`;

  return {
    title: `${article.metaTitle} | PhoneLocating`,
    description: article.description,
    keywords: article.keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      publishedTime: article.publishDate,
      authors: [article.author.name],
      url: canonicalUrl,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://phonelocating.com";

  // Google JSON-LD Article Schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.description,
    datePublished: article.publishDate,
    author: {
      "@type": "Person",
      name: article.author.name,
      jobTitle: article.author.role,
    },
    publisher: {
      "@type": "Organization",
      name: "PhoneLocating",
      url: appUrl,
      logo: {
        "@type": "ImageObject",
        url: `${appUrl}/icon.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${appUrl}/blog/${article.slug}`,
    },
    keywords: article.keywords.join(", "),
  };

  // Google FAQ Schema
  const faqSchema =
    article.faqs && article.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: article.faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: f.answer,
            },
          })),
        }
      : null;

  return (
    <>
      {/* Structured Data Script for Google Search Bots */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <article className="mx-auto max-w-4xl px-4 sm:px-6 py-12 lg:px-8 lg:py-16">
        {/* Back navigation */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 transition"
          >
            <ArrowLeft size={14} />
            <span>Back to All Articles</span>
          </Link>
        </div>

        {/* Article Header */}
        <header className="border-b border-slate-200 pb-8">
          <div className="flex flex-wrap items-center gap-2.5 text-xs">
            <span className="rounded-full bg-blue-50 px-3 py-1 font-semibold text-blue-700 border border-blue-100">
              {article.category}
            </span>
            <span className="text-slate-400">·</span>
            <span className="flex items-center gap-1 text-slate-500 font-medium">
              <Clock size={13} />
              <span>{article.readTime}</span>
            </span>
            <span className="text-slate-400">·</span>
            <span className="flex items-center gap-1 text-slate-500 font-medium">
              <Calendar size={13} />
              <span>{article.publishDate}</span>
            </span>
          </div>

          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl leading-tight">
            {article.title}
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            {article.excerpt}
          </p>

          {/* Author Byline */}
          <div className="mt-6 flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-full bg-slate-900 text-white font-bold text-sm">
              {article.author.name.charAt(0)}
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">{article.author.name}</div>
              <div className="text-xs text-slate-500">{article.author.role}</div>
            </div>
          </div>
        </header>

        {/* Key Takeaways Callout Box */}
        <div className="my-8 rounded-2xl border border-blue-200 bg-blue-50/60 p-5 sm:p-6">
          <div className="flex items-center gap-2 font-bold text-sm text-blue-950">
            <Sparkles size={16} className="text-blue-600" />
            <span>Key Takeaways & Summary</span>
          </div>
          <ul className="mt-3 space-y-2 text-xs sm:text-sm text-slate-700">
            <li className="flex items-start gap-2">
              <CheckCircle2 size={16} className="text-blue-600 shrink-0 mt-0.5" />
              <span>Operates entirely on telecom carrier signaling networks without software installation.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 size={16} className="text-blue-600 shrink-0 mt-0.5" />
              <span>Combines HLR switch registers with 2-meter orbital satellite aerial photography.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 size={16} className="text-blue-600 shrink-0 mt-0.5" />
              <span>Single-target focus with transparent one-time pricing of $9.99 (no recurring subscriptions).</span>
            </li>
          </ul>
        </div>

        {/* Main Article Body */}
        <div className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-950 prose-p:leading-7 prose-p:text-slate-700 prose-li:text-slate-700">
          <div className="whitespace-pre-line text-sm sm:text-base leading-7 text-slate-700">
            {article.content}
          </div>
        </div>

        {/* Embedded Interactive CTA Widget */}
        <div className="my-12 rounded-3xl border border-blue-200 bg-gradient-to-r from-blue-600 to-indigo-700 p-6 sm:p-10 text-white shadow-xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
                <Radio size={13} />
                Live Satellite Tool
              </div>
              <h3 className="mt-3 text-xl sm:text-2xl font-bold">Verify Any Phone Number in Seconds</h3>
              <p className="mt-1 text-xs sm:text-sm text-blue-100 max-w-md">
                Uncover telecom carrier registers, line classification, and interactive 3D satellite optics accurate to
                2M.
              </p>
            </div>

            <Link
              href="/#report"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3 text-xs sm:text-sm font-bold text-blue-700 shadow-md transition hover:bg-blue-50 cursor-pointer"
            >
              <span>Test Number Now</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>

        {/* Article FAQ Section */}
        {article.faqs && article.faqs.length > 0 && (
          <section className="mt-12 border-t border-slate-200 pt-8">
            <h2 className="text-2xl font-bold text-slate-950 flex items-center gap-2">
              <HelpCircle size={20} className="text-blue-600" />
              <span>Frequently Asked Questions</span>
            </h2>

            <div className="mt-6 space-y-4">
              {article.faqs.map((faq) => (
                <div
                  key={faq.question}
                  className="rounded-xl border border-slate-200/80 bg-slate-50/70 p-4 sm:p-5"
                >
                  <h3 className="text-sm sm:text-base font-bold text-slate-900">{faq.question}</h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-6">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Footer Navigation */}
        <div className="mt-12 flex items-center justify-between border-t border-slate-200 pt-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-blue-600"
          >
            <ArrowLeft size={14} />
            <span>More Articles</span>
          </Link>

          <Link
            href="/#report"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:underline"
          >
            <span>Track a Phone Number</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </article>
    </>
  );
}
