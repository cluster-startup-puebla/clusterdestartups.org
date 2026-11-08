"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Link } from "@/modules/cores/i18n/src/config/routing";
import type { Company } from "@/data/companies";

const PUEBLA: [number, number] = [19.0438, -98.1982];
/** Startups fuera de este radio (Monterrey, Playa del Carmen) no mueven el encuadre. */
const PUEBLA_RADIUS_KM = 45;

const TILES = {
  light:
    "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}",
  dark:
    "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}",
} as const;

function kmFromPuebla(lat: number, lng: number) {
  const dLat = (lat - PUEBLA[0]) * 111;
  const dLng = (lng - PUEBLA[1]) * 111 * Math.cos((PUEBLA[0] * Math.PI) / 180);
  return Math.hypot(dLat, dLng);
}

function useDarkTheme() {
  return useSyncExternalStore(
    (onStoreChange) => {
      const observer = new MutationObserver(onStoreChange);
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["data-theme"],
      });
      return () => observer.disconnect();
    },
    () => document.documentElement.dataset.theme === "dark",
    () => false,
  );
}

const LOGO_SIZE = 44;
/** Solo se agrupan los que de verdad se enciman. En México, Puebla cabe en este radio. */
const CLUSTER_PX = 18;
const CLUSTER_SIZE = 52;

type Pin = { company: Company; lat: number; lng: number };
type SpiderPin = Pin & { dx: number; dy: number };

function logoFilter(company: Company, dark: boolean) {
  if (company.logoDark && !dark) return "brightness(0)";
  if (company.logoInk && dark) return "invert(1) hue-rotate(180deg)";
  return "none";
}

function logoHtml(company: Company, dark: boolean) {
  if (!company.logo) {
    return `<span class="company-map-logo company-map-logo-fallback">${company.name.charAt(0)}</span>`;
  }
  return `<span class="company-map-logo"><img src="${company.logo}" alt="" style="filter:${logoFilter(company, dark)}" /></span>`;
}

function logoIcon(company: Company, dark: boolean, fan?: { dx: number; dy: number }) {
  const inner = logoHtml(company, dark);
  const html = fan
    ? `<span class="company-map-fan" style="--fan-x:${-fan.dx}px;--fan-y:${-fan.dy}px">${inner}</span>`
    : inner;
  return L.divIcon({
    className: "company-map-marker",
    html,
    iconSize: [LOGO_SIZE, LOGO_SIZE],
    iconAnchor: [LOGO_SIZE / 2, LOGO_SIZE / 2],
    popupAnchor: [0, -LOGO_SIZE / 2],
  });
}

function clusterIcon(count: number) {
  return L.divIcon({
    className: "company-map-marker",
    html: `<span class="company-map-cluster">${count}</span>`,
    iconSize: [CLUSTER_SIZE, CLUSTER_SIZE],
    iconAnchor: [CLUSTER_SIZE / 2, CLUSTER_SIZE / 2],
  });
}

function fanOffset(index: number, count: number) {
  const gap = 56;
  const radius = count === 2 ? gap / 2 : gap / (2 * Math.sin(Math.PI / count));
  const angle = (2 * Math.PI * index) / count - Math.PI / 2;
  return {
    dx: Math.round(radius * Math.sin(angle)),
    dy: Math.round(-radius * Math.cos(angle)),
  };
}

function clusterPins(pins: readonly Pin[], map: L.Map, open: ReadonlySet<string>) {
  const clusters: { lat: number; lng: number; pins: Pin[] }[] = [];
  if (map.getSize().x === 0) {
    return pins.filter((pin) => !open.has(pin.company.slug)).map((pin) => ({
      lat: pin.lat,
      lng: pin.lng,
      pins: [pin],
    }));
  }

  for (const pin of pins) {
    if (open.has(pin.company.slug)) continue;
    const point = map.latLngToContainerPoint([pin.lat, pin.lng]);
    const hit = clusters.find((cluster) => {
      const center = map.latLngToContainerPoint([cluster.lat, cluster.lng]);
      return center.distanceTo(point) <= CLUSTER_PX;
    });
    if (!hit) {
      clusters.push({ lat: pin.lat, lng: pin.lng, pins: [pin] });
      continue;
    }
    hit.pins.push(pin);
  }
  return clusters.map((cluster) => ({
    lat: cluster.pins.reduce((sum, pin) => sum + pin.lat, 0) / cluster.pins.length,
    lng: cluster.pins.reduce((sum, pin) => sum + pin.lng, 0) / cluster.pins.length,
    pins: cluster.pins,
  }));
}

function CompanyMarkers({ pins, dark }: { pins: readonly Pin[]; dark: boolean }) {
  const map = useMap();
  const t = useTranslations("Companies");
  const [revision, setRevision] = useState(0);
  const [spider, setSpider] = useState<SpiderPin[] | null>(null);
  const open = useMemo(() => new Set(spider?.map((pin) => pin.company.slug) ?? []), [spider]);

  useMapEvents({
    zoomend() {
      setSpider(null);
      setRevision((value) => value + 1);
    },
    moveend() {
      setRevision((value) => value + 1);
    },
    click() {
      setSpider(null);
    },
  });

  const clusters = useMemo(() => {
    if (revision < 0) return [];
    return clusterPins(pins, map, open);
  }, [pins, map, open, revision]);

  const icons = useMemo(() => {
    const cache = new Map<string, L.DivIcon>();
    for (const pin of pins) cache.set(pin.company.slug, logoIcon(pin.company, dark));
    for (const pin of spider ?? []) cache.set(`fan:${pin.company.slug}`, logoIcon(pin.company, dark, pin));
    return cache;
  }, [pins, spider, dark]);

  const badgeKey = clusters
    .filter((cluster) => cluster.pins.length > 1)
    .map((cluster) => cluster.pins.length)
    .sort((a, b) => a - b)
    .join(",");

  const badges = useMemo(() => {
    const cache = new Map<number, L.DivIcon>();
    for (const count of badgeKey.split(",").filter(Boolean).map(Number)) {
      cache.set(count, clusterIcon(count));
    }
    return cache;
  }, [badgeKey]);

  const openCluster = (members: readonly Pin[]) => {
    const bounds = L.latLngBounds(members.map((pin) => [pin.lat, pin.lng]));
    const span = bounds.getNorthEast().distanceTo(bounds.getSouthWest());
    const fitted = map.getBoundsZoom(bounds, false, L.point(64, 64));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (span >= 150 && fitted > map.getZoom() + 0.4) {
      map.flyToBounds(bounds, {
        padding: [64, 64],
        maxZoom: 14,
        duration: reduce ? 0 : 0.9,
      });
      return;
    }
    const sorted = [...members].sort((a, b) =>
      a.company.name.localeCompare(b.company.name, "es", { sensitivity: "base" }),
    );
    setSpider(
      sorted.map((pin, index) => {
        const { dx, dy } = fanOffset(index, sorted.length);
        const origin = map.latLngToContainerPoint([pin.lat, pin.lng]);
        const next = map.containerPointToLatLng(origin.add([dx, dy]));
        return { ...pin, lat: next.lat, lng: next.lng, dx, dy };
      }),
    );
  };

  return (
    <>
      {clusters.map((cluster) => {
        if (cluster.pins.length === 1) {
          const pin = cluster.pins[0];
          return (
            <Marker
              key={pin.company.slug}
              position={[pin.lat, pin.lng]}
              icon={icons.get(pin.company.slug)}
            >
              <Popup>
                <Link href={`/empresas/${pin.company.slug}`} className="text-link">
                  {pin.company.name}
                </Link>
                {pin.company.location ? (
                  <p className="text-small text-ink-secondary">{pin.company.location.address}</p>
                ) : null}
              </Popup>
            </Marker>
          );
        }
        const key = cluster.pins.map((pin) => pin.company.slug).join("-");
        return (
          <Marker
            key={key}
            position={[cluster.lat, cluster.lng]}
            icon={badges.get(cluster.pins.length)}
            title={t("clusterLabel", { count: cluster.pins.length })}
            zIndexOffset={400}
            eventHandlers={{
              click: (event) => {
                L.DomEvent.stopPropagation(event.originalEvent);
                openCluster(cluster.pins);
              },
            }}
          />
        );
      })}
      {spider?.map((pin) => (
        <Marker
          key={`fan-${pin.company.slug}`}
          position={[pin.lat, pin.lng]}
          icon={icons.get(`fan:${pin.company.slug}`)}
          zIndexOffset={600}
        >
          <Popup>
            <Link href={`/empresas/${pin.company.slug}`} className="text-link">
              {pin.company.name}
            </Link>
            {pin.company.location ? (
              <p className="text-small text-ink-secondary">{pin.company.location.address}</p>
            ) : null}
          </Popup>
        </Marker>
      ))}
    </>
  );
}

function FramePuebla({ points }: { points: readonly (readonly [number, number])[] }) {
  const map = useMap();
  const key = points.map((point) => point.join(",")).join("|");

  useEffect(() => {
    map.attributionControl.setPrefix(false);
    if (points.length === 0) return;
    const nearby = points.filter(([lat, lng]) => kmFromPuebla(lat, lng) <= PUEBLA_RADIUS_KM);
    const frame = nearby.length > 0 ? nearby : points;
    const bounds = frame.map(([lat, lng]): [number, number] => [lat, lng]);
    if (bounds.length === 1) {
      map.setView(bounds[0], 12);
      return;
    }
    map.fitBounds(L.latLngBounds(bounds), {
      padding: [48, 48],
      maxZoom: 12,
    });
  }, [map, key, points]);

  return null;
}

export function CompanyMap({ companies }: { companies: readonly Company[] }) {
  const pins = useMemo(
    () =>
      companies.flatMap((company) =>
        company.location
          ? [{ company, lat: company.location.lat, lng: company.location.lng }]
          : [],
      ),
    [companies],
  );

  const points = useMemo(
    () => pins.map((pin) => [pin.lat, pin.lng] as const),
    [pins],
  );

  const dark = useDarkTheme();

  if (points.length === 0) return null;

  return (
    <div className="company-map">
      <MapContainer
        center={PUEBLA}
        zoom={12}
        minZoom={5}
        maxZoom={14}
        scrollWheelZoom={false}
        zoomControl
        className="company-map-canvas"
      >
        <TileLayer
          key={dark ? "dark" : "light"}
          attribution='&copy; <a href="https://www.esri.com/">Esri</a>, HERE, Garmin, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url={dark ? TILES.dark : TILES.light}
        />
        <FramePuebla points={points} />
        <CompanyMarkers pins={pins} dark={dark} />
      </MapContainer>
    </div>
  );
}
