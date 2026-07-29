import ClientMap from "@/features/maps/components/ClientMap";

export default function MapPage() {
  return (
    <main className="mx-auto max-w-7xl p-6">
      <h1 className="mb-6 text-3xl font-bold">Udupi District</h1>

      <div className="grid grid-cols-12 gap-6">
        {/* Map */}
        <div className="col-span-8">
          <div className="h-[700px] overflow-hidden rounded-2xl border shadow">
            <ClientMap />
          </div>
        </div>

        {/* Sidebar */}
        <aside className="col-span-4 rounded-2xl border bg-white p-6 shadow">
          <h2 className="text-2xl font-semibold">Select a Taluk</h2>

          <p className="mt-4 text-gray-600">
            Click any taluk on the map to view information.
          </p>

          <div className="mt-8">
            <h3 className="font-semibold">You will see:</h3>

            <ul className="mt-3 space-y-2 text-gray-600">
              <li>📍 Taluk details</li>
              <li>🏖 Beaches</li>
              <li>🍴 Restaurants</li>
              <li>🛕 Temples</li>
              <li>🏥 Hospitals</li>
              <li>🏫 Schools</li>
            </ul>
          </div>
        </aside>
      </div>
    </main>
  );
}