"use client";

import { useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import type { Company } from "@/data/companies";

const CompanyMap = dynamic(() => import("./company-map").then((mod) => mod.CompanyMap), {
  ssr: false,
});

function subscribe() {
  return () => {};
}

/**
 * Leaflet needs `window`. The server snapshot stays empty so hydration
 * matches, and the client snapshot mounts the map after paint.
 */
function useClient() {
  return useSyncExternalStore(subscribe, () => true, () => false);
}

export function CompanyMapView({ companies }: { companies: readonly Company[] }) {
  const ready = useClient();

  if (!ready) {
    return <div className="company-map company-map-canvas" aria-hidden="true" />;
  }

  return <CompanyMap companies={companies} />;
}
