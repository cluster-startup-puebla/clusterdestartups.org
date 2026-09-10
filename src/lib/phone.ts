export function toTelHref(phone: string) {
  return phone.replace(/(?!^\+)[^\d]/g, "");
}
