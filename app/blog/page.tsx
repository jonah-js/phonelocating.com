import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Calendar, Clock, Search, ShieldCheck, Sparkles, User } from "lucide-react";
import { getAllArticles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Articles & Research | PhoneLocating",
  description:
    "Explore in-depth technical guides, anti-scam tutorials, satellite geolocation research, and telecom intelligence insights from PhoneLocating.",
  openGraph: {
    title: "Articles & Research | PhoneLocating",
    description:
      "Explore technical guides, anti-scam tutorials, and satellite triangulation research from PhoneLocating.",
    type: "website",
  },
};

export default function BlogIndexPage() {
  const articles = getAllArticles();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 lg:px-8 lg:py-24">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-xs font-semibold text-blue-700">
          <BookOpen size={13} className="text-blue-600" />
          <span>Knowledge Base & Research Center</span>
        </div>

        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl">
          Articles & Telecom Guides
        </h1>

        <p className="mt-4 text-base sm:text-lg text-slate-600">
          Expert insights into 2M orbital satellite triangulation, scam call detection, mobile device recovery, and
          telecommunications privacy laws.
        </p>
      </div>

      {/* Featured Articles Grid */}
      <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article, idx) => (
          <article
            key={article.slug}
            className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl"
          >
            <div>
              {/* Category & Time */}
              <div className="flex items-center justify-between gap-2 text-xs">
                <span className="rounded-full bg-blue-50 px-2.5 py-0.5 font-semibold text-blue-700 border border-blue-100">
                  {article.category}
                </span>
                <span className="flex items-center gap-1 text-slate-400">
                  <Clock size={12} />
                  <span>{article.readTime}</span>
                </span>
              </div>

              {/* Title */}
              <h2 className="mt-4 text-xl font-bold tracking-tight text-slate-950 group-hover:text-blue-600 transition-colors line-clamp-2">
                <Link href={`/blog/${article.slug}`}>{article.title}</Link>
              </h2>

              {/* Excerpt */}
              <p className="mt-3 text-xs sm:text-sm leading-6 text-slate-600 line-clamp-3">{article.excerpt}</p>
            </div>

            {/* Footer / Author & Link */}
            <div className="mt-6 border-t border-slate-100 pt-4">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <User size={13} className="text-slate-400" />
                  <span className="font-medium text-slate-700">{article.author.name}</span>
                </div>
                <div className="flex items-center gap-1 text-slate-400">
                  <Calendar size={12} />
                  <span>{article.publishDate}</span>
                </div>
              </div>

              <Link
                href={`/blog/${article.slug}`}
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800"
              >
                <span>Read Full Guide</span>
                <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* Bottom CTA Box */}
      <div className="mt-16 rounded-3xl border border-blue-200/80 bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white shadow-xl sm:p-12 text-center sm:text-left">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
              <Sparkles size={13} />
              Try Live Tool
            </span>
            <h3 className="mt-3 text-2xl font-bold">Have a Number You Need to Locate?</h3>
            <p className="mt-2 text-sm text-blue-100">
              Put our 2M orbital satellite triangulation engine to the test. Full reports unlocked for a one-time $9.99
              fee with zero subscriptions.
            </p>
          </div>

          <Link
            href="/#report"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-blue-700 shadow-md transition hover:bg-blue-50"
          >
            <span>Track Number Now</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
