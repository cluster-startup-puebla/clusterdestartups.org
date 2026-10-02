export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://clusterdestartups.org";

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

/** Absolute localized URL with the trailing slash `trailingSlash: true` expects. */
export function localeUrl(locale: string, route = "/") {
  const bare = route === "/" || route === "" ? "" : route.replace(/\/$/, "");
  const path = bare.startsWith("/") || bare === "" ? bare : `/${bare}`;
  return `${SITE_URL}/${locale}${path}/`;
}

/** Single source for the cluster office. Do not duplicate this address in copy. */
export const OFFICE = {
  place: "Jobs Coworking Cholula | Gran Pirámide Plaza",
  streetAddress: "C. 14 Pte. 111-Loc 11, San Juan Aquiahuac",
  postalCode: "72810",
  locality: "San Andrés Cholula",
  region: "Puebla",
  regionShort: "Pue.",
  country: "México",
  countryCode: "MX",
  plusCode: "3P42+VQ",
  phoneDisplay: "+52 1 222 102 1354",
  phoneTel: "+5212221021354",
  whatsappHref: "https://wa.me/5212221021354",
} as const;

export const OFFICE_ADDRESS_LINE = `${OFFICE.streetAddress}, ${OFFICE.postalCode} ${OFFICE.locality}, ${OFFICE.regionShort}`;

export const OFFICE_ADDRESS_LEGAL = `${OFFICE.streetAddress}, ${OFFICE.postalCode} ${OFFICE.locality}, ${OFFICE.region}, ${OFFICE.country}`;

export const OFFICE_ADDRESS_WITH_PLACE = `${OFFICE.place}, ${OFFICE_ADDRESS_LINE}`;

export const OFFICE_MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${OFFICE.place}, ${OFFICE.streetAddress}, ${OFFICE.postalCode} ${OFFICE.locality}, ${OFFICE.region}`,
)}`;

export const OFFICE_ADDRESS_TOKEN = "{officeAddress}";

export function withOfficeAddress(text: string, address = OFFICE_ADDRESS_LEGAL) {
  return text.replaceAll(OFFICE_ADDRESS_TOKEN, address);
}
