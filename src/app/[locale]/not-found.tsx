import { getTranslations } from "next-intl/server";

export default async function NotFound() {
  const t = await getTranslations("Home");

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-h1 font-display text-ink">404</h1>
      <p className="text-body-lg text-ink-secondary">{t("metaTitle")}</p>
    </main>
  );
}
