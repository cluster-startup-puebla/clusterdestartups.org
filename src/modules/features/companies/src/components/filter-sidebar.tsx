"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ChevronDown, X } from "lucide-react";

interface FilterSection {
  key: string;
  label: string;
  options: { value: string; label: string; count: number }[];
}

interface FilterSidebarProps {
  sections: FilterSection[];
  searchPlaceholder: string;
  labels: {
    clear: string;
    search: string;
    filters: string;
    close: string;
    remove: string;
    active: string;
  };
}

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

function replaceWithoutJump(update: () => void) {
  const y = window.scrollY;
  update();
  const restore = () => {
    if (Math.abs(window.scrollY - y) > 2) window.scrollTo(0, y);
  };
  window.requestAnimationFrame(restore);
  window.setTimeout(restore, 60);
  window.setTimeout(restore, 180);
}

export function FilterSidebar({ sections, searchPlaceholder, labels }: FilterSidebarProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [openKey, setOpenKey] = useState<string | null>(null);

  const searchValue = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(searchValue);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setQuery(searchValue);
  }, [searchValue]);

  const replaceParams = useCallback(
    (params: URLSearchParams) => {
      const qs = params.toString();
      replaceWithoutJump(() => {
        router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
      });
    },
    [pathname, router],
  );

  useEffect(() => {
    const next = query;
    if (next === searchValue) return;
    const handle = window.setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (next.trim()) params.set("q", next);
      else params.delete("q");
      replaceParams(params);
    }, 250);
    return () => window.clearTimeout(handle);
  }, [query, searchValue, searchParams, replaceParams]);

  const hasActiveFilters = useMemo(() => {
    return searchValue.length > 0 || sections.some((section) => searchParams.has(section.key));
  }, [sections, searchParams, searchValue]);

  const createParamUpdate = useCallback(
    (key: string, value: string, checked: boolean) => {
      const params = new URLSearchParams(searchParams.toString());
      if (checked) {
        params.append(key, value);
      } else {
        const existing = params.getAll(key);
        params.delete(key);
        existing.filter((entry) => entry !== value).forEach((entry) => params.append(key, entry));
      }
      replaceParams(params);
    },
    [searchParams, replaceParams],
  );

  const clearFilters = useCallback(() => {
    setQuery("");
    setOpenKey(null);
    const params = new URLSearchParams();
    const theme = searchParams.get("theme");
    if (theme === "dark" || theme === "light") params.set("theme", theme);
    const qs = params.toString();
    replaceWithoutJump(() => {
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    });
  }, [pathname, router, searchParams]);

  const isSelected = useCallback(
    (key: string, value: string) => searchParams.getAll(key).includes(value),
    [searchParams],
  );

  const selectedChips = sections.flatMap((section) =>
    section.options
      .filter((option) => isSelected(section.key, option.value))
      .map((option) => ({ ...option, key: section.key })),
  );

  const openSection = sections.find((section) => section.key === openKey && section.options.length > 1);

  useEffect(() => {
    if (!openSection) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      setOpenKey(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [openSection]);

  return (
    <aside aria-label={labels.filters} className="w-full shrink-0 lg:w-64">
      <input
        type="search"
        placeholder={searchPlaceholder}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        aria-label={labels.search}
        className="input min-h-11 w-full"
      />

      <div className="mt-4 lg:hidden">
        <div className="flex flex-wrap gap-2" role="group" aria-label={labels.filters}>
          {sections.map((section) => {
            const selectedCount = section.options.filter((option) =>
              isSelected(section.key, option.value),
            ).length;
            const single = section.options.length === 1;
            const open = openKey === section.key;
            const active = selectedCount > 0;

            if (single) {
              const option = section.options[0];
              return (
                <button
                  key={section.key}
                  type="button"
                  aria-pressed={active}
                  onClick={() => createParamUpdate(section.key, option.value, !active)}
                  className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-small ${focusRing} ${
                    active
                      ? "border-brand bg-brand text-on-brand"
                      : "border-line bg-surface text-ink"
                  }`}
                >
                  {option.label}
                </button>
              );
            }

            return (
              <button
                key={section.key}
                type="button"
                aria-expanded={open}
                onClick={() => setOpenKey(open ? null : section.key)}
                className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-small ${focusRing} ${
                  active
                    ? "border-brand bg-brand text-on-brand"
                    : open
                      ? "border-brand bg-surface text-ink"
                      : "border-line bg-surface text-ink"
                }`}
              >
                {section.label}
                {selectedCount > 0 && (
                  <span className={active ? "text-on-brand" : "text-ink-muted"}>{selectedCount}</span>
                )}
                <ChevronDown
                  aria-hidden="true"
                  strokeWidth={2}
                  className={`size-4 shrink-0 transition ${open ? "rotate-180" : ""}`}
                />
              </button>
            );
          })}
        </div>

        {openSection && (
          <div className="card mt-3 p-2">
            <FilterGroups
              sections={[openSection]}
              isSelected={isSelected}
              onToggle={createParamUpdate}
              hideLegend
            />
          </div>
        )}

        {selectedChips.length > 0 && (
          <ul aria-label={labels.active} className="mt-3 flex flex-wrap gap-2">
            {selectedChips.map((chip) => (
              <li key={`${chip.key}-${chip.value}`}>
                <button
                  type="button"
                  onClick={() => createParamUpdate(chip.key, chip.value, false)}
                  aria-label={`${labels.remove} ${chip.label}`}
                  className={`inline-flex min-h-11 max-w-full items-center gap-2 rounded-full bg-brand px-4 text-left text-small text-on-brand ${focusRing}`}
                >
                  <span className="min-w-0">{chip.label}</span>
                  <X aria-hidden="true" strokeWidth={2} className="size-4 shrink-0" />
                </button>
              </li>
            ))}
          </ul>
        )}

        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className={`mt-3 inline-flex min-h-11 items-center text-small text-link ${focusRing}`}
          >
            {labels.clear}
          </button>
        )}
      </div>

      <div className="mt-6 hidden lg:block">
        <FilterGroups
          sections={sections}
          isSelected={isSelected}
          onToggle={createParamUpdate}
          className="space-y-6"
        />
        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className={`mt-6 inline-flex min-h-11 items-center text-small text-link hover:underline ${focusRing}`}
          >
            {labels.clear}
          </button>
        )}
      </div>
    </aside>
  );
}

function FilterGroups({
  sections,
  isSelected,
  onToggle,
  hideLegend = false,
  className,
}: {
  sections: FilterSection[];
  isSelected: (key: string, value: string) => boolean;
  onToggle: (key: string, value: string, checked: boolean) => void;
  hideLegend?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      {sections.map((section) => (
        <fieldset key={section.key} className="min-w-0 border-0 p-0">
          {hideLegend ? (
            <legend className="sr-only">{section.label}</legend>
          ) : (
            <legend className="mb-2 px-2 text-body font-display text-ink">{section.label}</legend>
          )}
          <ul className="space-y-1">
            {section.options.map((option) => {
              const selected = isSelected(section.key, option.value);
              return (
                <li key={option.value}>
                  <label
                    className={`flex min-h-11 cursor-pointer items-center gap-3 rounded-sm px-2 text-small ${
                      selected
                        ? "bg-surface-subtle text-ink"
                        : "text-ink-secondary hover:bg-surface-subtle hover:text-ink"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selected}
                      onChange={(event) =>
                        onToggle(section.key, option.value, event.target.checked)
                      }
                      className={`size-5 shrink-0 accent-brand ${focusRing}`}
                    />
                    <span className="min-w-0 flex-1">{option.label}</span>
                    <span className="text-micro text-ink-muted">{option.count}</span>
                  </label>
                </li>
              );
            })}
          </ul>
        </fieldset>
      ))}
    </div>
  );
}
