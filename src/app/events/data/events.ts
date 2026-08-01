import { UdupiEvent } from "../types/event";

export const events: UdupiEvent[] = [
  {
    id: "malpe-beach-cleanup-aug",
    title: "Malpe Beach Cleanup Drive",
    category: "cleanup",
    ward: "Malpe",
    date: "2026-08-09",
    time: "6:30 AM",
    location: "Malpe Beach, near the fishing harbour",
    description:
      "Monthly cleanup along the Malpe shoreline. Gloves and bags provided. Join residents and the local fishing community to keep the beach clean.",
    organizer: "Go Udupi Community",
    points: 50,
    attendeeCount: 34,
    capacity: 60,
  },
  {
    id: "manipal-heritage-walk",
    title: "Manipal Heritage Walk",
    category: "walk",
    ward: "Manipal",
    date: "2026-08-15",
    time: "7:00 AM",
    location: "Starts at End Point, Manipal",
    description:
      "A guided walk through Manipal's older lanes with a local historian, followed by breakfast at a 40-year-old family-run darshini.",
    organizer: "Manipal Walkers Collective",
    points: 20,
    attendeeCount: 18,
    capacity: 30,
  },
  {
    id: "udupi-town-cycle-rally",
    title: "Udupi Town Cycle Rally",
    category: "cycling",
    ward: "Udupi Town",
    date: "2026-08-23",
    time: "6:00 AM",
    location: "Assemble at Ajjarkad Ground",
    description:
      "A 12km community cycle rally through Udupi town to raise awareness about safer cycling lanes and last-mile connectivity.",
    organizer: "Udupi Cycling Club",
    points: 30,
    attendeeCount: 41,
    capacity: 80,
  },
  {
    id: "kaup-footpath-audit-walk",
    title: "Kaup Footpath Awareness Walk",
    category: "walk",
    ward: "Kaup",
    date: "2026-08-30",
    time: "5:30 PM",
    location: "Kaup Lighthouse Road",
    description:
      "Walk the stretch near Kaup Lighthouse Road, document broken footpaths and street lighting gaps, and share findings with the community.",
    organizer: "Go Udupi Civic Team",
    points: 40,
    attendeeCount: 12,
    capacity: 25,
  },
];

export function getEventById(id: string): UdupiEvent | undefined {
  return events.find((event) => event.id === id);
}
