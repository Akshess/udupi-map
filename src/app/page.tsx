import Link from "next/link";
 
const features = [
  {
    icon: "🗺️",
    title: "Maps",
    description: "Temples, beaches, neighbourhoods",
    href: "/map",
  },
  {
    icon: "🚌",
    title: "Getting around",
    description: "Bus, auto, ferry, and more",
    href: "/transport",
  },
  {
    icon: "🏛️",
    title: "History",
    description: "Temple town, Tulu culture",
    href: "/history",
  },
  {
    icon: "🏪",
    title: "Businesses",
    description: "Restaurants, shops, stays",
    href: "/businesses",
    badge: "LOCAL",
  },
  {
    icon: "✨",
    title: "AI guide",
    description: "Ask anything about Udupi",
    href: "/assistant",
  },
];
 
export default function Home() {
  return (
    <main className="min-h-screen bg-white">
 
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-16 border-b border-gray-100">
 
        {/* Eyebrow */}
        <div className="flex items-center gap-2 mb-6">
          <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
          <span className="text-xs font-semibold tracking-widest uppercase text-amber-700">
            Karnataka's coastal gem
          </span>
        </div>
 
        {/* Headline */}
        <h1 className="font-serif text-6xl md:text-7xl font-black leading-[1.07] tracking-tight text-gray-900">
          Discover{" "}
          <span className="relative inline-block text-teal-800">
            Udupi
            <span
              aria-hidden="true"
              className="absolute left-0 bottom-1 w-full h-1 rounded-full bg-amber-400"
            />
          </span>
        </h1>
 
        {/* Tagline */}
        <p className="mt-6 text-lg text-gray-500 leading-relaxed max-w-xl">
          Interactive maps, transport guides, history, local businesses, and an
          AI assistant — everything you need to explore this coastal temple town.
        </p>
 
        {/* CTAs */}
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/map"
            className="inline-flex items-center gap-2 bg-teal-800 hover:bg-teal-900 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
          >
            Explore the map →
          </Link>
          <Link
            href="/history"
            className="inline-flex items-center gap-2 border border-gray-200 hover:bg-gray-50 text-gray-800 text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
          >
            Learn the history
          </Link>
        </div>
      </section>
 
      {/* Feature strip */}
      <section className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 divide-x divide-y divide-gray-100 border-b border-gray-100">
          {features.map((feature) => (
            <Link
              key={feature.title}
              href={feature.href}
              className="group flex flex-col gap-1.5 px-5 py-6 hover:bg-gray-50 transition-colors"
            >
              <span className="text-xl">{feature.icon}</span>
              <span className="text-sm font-semibold text-gray-900 leading-snug">
                {feature.title}
              </span>
              <span className="text-xs text-gray-500 leading-relaxed">
                {feature.description}
              </span>
              {feature.badge && (
                <span className="mt-1 self-start text-[10px] font-bold tracking-wider uppercase bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full">
                  {feature.badge}
                </span>
              )}
            </Link>
          ))}
        </div>
      </section>
 
    </main>
  );
}
 
