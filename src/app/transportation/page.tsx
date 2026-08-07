import Link from "next/link";

const TRANSPORT_OPTIONS = [
  {
    icon: "🚌",
    title: "Bus Routes",
    description: "KSRTC and city bus routes across Udupi district.",
    href: "/transportation/bus-route",
    status: "available",
  },
  {
    icon: "🛺",
    title: "Auto Rickshaw",
    description: "Shared and private autos — stands and approximate fares.",
    href: "#",
    status: "coming-soon",
  },
  {
    icon: "⛵",
    title: "Ferry",
    description: "Backwater ferry crossings along the coast.",
    href: "#",
    status: "coming-soon",
  },
  {
    icon: "🚲",
    title: "Cycling",
    description: "Safe cycling routes and community rides.",
    href: "#",
    status: "coming-soon",
  },
];

export default function TransportationPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <h1 className="text-5xl font-bold">Getting Around</h1>

      <p className="mt-6 text-xl text-gray-600">
        Everything you need to move through Udupi — by bus, auto, ferry, or
        bicycle.
      </p>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {TRANSPORT_OPTIONS.map((opt) =>
          opt.status === "available" ? (
            <Link
              key={opt.title}
              href={opt.href}
              className="group rounded-2xl border bg-white p-6 shadow transition-shadow hover:shadow-md"
            >
              <span className="text-3xl">{opt.icon}</span>
              <h2 className="mt-4 text-lg font-semibold group-hover:text-teal-800">
                {opt.title}
              </h2>
              <p className="mt-2 text-sm text-gray-600">{opt.description}</p>
            </Link>
          ) : (
            <div
              key={opt.title}
              className="rounded-2xl border border-dashed bg-gray-50 p-6 opacity-60"
            >
              <span className="text-3xl">{opt.icon}</span>
              <h2 className="mt-4 text-lg font-semibold text-gray-500">
                {opt.title}
              </h2>
              <p className="mt-2 text-sm text-gray-400">{opt.description}</p>
              <span className="mt-3 inline-block rounded-full bg-gray-200 px-2.5 py-0.5 text-xs font-medium text-gray-500">
                Coming soon
              </span>
            </div>
          )
        )}
      </div>
    </main>
  );
}
