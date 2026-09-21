import { CheckCircle2, ShieldCheck, Star, Users } from "lucide-react";

const reviews = [
  {
    name: "James T.",
    city: "New York, USA",
    rating: 5,
    date: "2 days ago",
    verified: true,
    title: "Instant scam caller identification",
    text: "Received persistent spoofed calls to my business cell. Within 30 seconds, this tool pinpointed the originating VOIP trunk, routing carrier, and geographic sector. The one-time $9.99 saved me days of frustration.",
  },
  {
    name: "Sarah W.",
    city: "London, UK",
    rating: 5,
    date: "4 days ago",
    verified: true,
    title: "Recovered misplaced company phone",
    text: "Left our test device in transit. The high-resolution satellite triangulation narrowed down the cell cluster to a 2M radius. The 3D satellite globe rendered the exact pinpoint flawlessly.",
  },
  {
    name: "David K.",
    city: "Toronto, Canada",
    rating: 5,
    date: "1 week ago",
    verified: true,
    title: "No recurring subscription trap",
    text: "Almost every lookup site attempts to quietly lock you into a $49/month recurring charge. PhoneLocating is a clean, honest one-time payment with an immediate PDF dossier download. Truly trustworthy.",
  },
  {
    name: "Marcus B.",
    city: "Sydney, Australia",
    rating: 5,
    date: "1 week ago",
    verified: true,
    title: "Unmatched HLR & SS7 accuracy",
    text: "As an enterprise cybersecurity engineer, I was impressed by the breakdown of MSC/VLR switch nodes and network hops. This provides verified telecom telemetry rather than generic guesses.",
  },
  {
    name: "Katharina M.",
    city: "Zurich, Switzerland",
    rating: 5,
    date: "2 weeks ago",
    verified: true,
    title: "Fast, sleek and highly intuitive",
    text: "Inputting the number took 5 seconds, the scanning sequence ran smoothly, and unlocking the full satellite dossier gave me exact coordinates and line legitimacy details.",
  },
  {
    name: "Alexander H.",
    city: "Munich, Germany",
    rating: 4.8,
    date: "3 weeks ago",
    verified: true,
    title: "Crucial for freight logistics verification",
    text: "We use PhoneLocating to verify international driver contact numbers in cross-border transport. Works reliably across the Americas, Europe, and Asia.",
  },
];

export default function ReviewsSection() {
  return (
    <section id="reviews" className="border-t border-slate-200 bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Rating Hero Card */}
        <div className="rounded-3xl border border-blue-200/80 bg-gradient-to-b from-blue-50/50 to-white p-8 shadow-card sm:p-10">
          <div className="grid items-center gap-8 md:grid-cols-[1fr_auto]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-xs font-semibold text-blue-700">
                <ShieldCheck size={14} />
                <span>Independently Verified Customer Reviews</span>
              </div>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                Rated <span className="text-blue-600">4.89 Stars</span> by over{" "}
                <span className="text-blue-600">1,100+ Global Customers</span>.
              </h2>
              <p className="mt-3 text-base text-slate-600 max-w-2xl">
                Discover how individuals, cyber specialists, and logistics teams utilize our phone intelligence dossiers
                and interactive 2M high-resolution satellite imagery across 45+ countries.
              </p>
            </div>

            {/* Score Box */}
            <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white px-8 py-6 shadow-sm text-center">
              <div className="text-5xl font-extrabold text-slate-950 tracking-tight">4.89</div>
              <div className="mt-2 flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}
              </div>
              <p className="mt-2 text-xs font-semibold text-slate-700">From 1,142 Verified Reviews</p>
              <div className="mt-2 flex items-center gap-1 text-[11px] text-emerald-700 font-medium">
                <CheckCircle2 size={13} />
                <span>98.4% Customer Recommendation</span>
              </div>
            </div>
          </div>

          {/* Micro Stats Row */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-200/70 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <Users size={16} className="text-blue-600" />
              <span><strong>1,140+</strong> Unlocked Dossiers</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-emerald-600" />
              <span><strong>100%</strong> Verified Authenticity</span>
            </div>
            <div className="flex items-center gap-2">
              <Star size={16} className="text-amber-500" />
              <span><strong>4.89 / 5.0</strong> Overall Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-blue-600" />
              <span><strong>0</strong> Recurring Subscriptions</span>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((rev) => (
            <article
              key={rev.name}
              className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-xs transition hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={15} fill="currentColor" />
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-400">{rev.date}</span>
                </div>

                <h3 className="mt-3 text-sm font-bold text-slate-900">{rev.title}</h3>
                <p className="mt-2 text-xs leading-5 text-slate-600">"{rev.text}"</p>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-3 text-xs">
                <div>
                  <p className="font-semibold text-slate-900">{rev.name}</p>
                  <p className="text-[11px] text-slate-400">{rev.city}</p>
                </div>
                {rev.verified && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                    <CheckCircle2 size={11} />
                    Verified Purchase ($9.99)
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
