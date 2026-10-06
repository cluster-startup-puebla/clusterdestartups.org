"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

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
  };
}

export function FilterSidebar({ sections, searchPlaceholder, labels }: FilterSidebarProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const searchValue = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(searchValue);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setQuery(searchValue);
  }, [searchValue]);

  const replaceParams = useCallback(
    (params: URLSearchParams) => {
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
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
    router.replace(pathname, { scroll: false });
  }, [pathname, router]);

  const chips = sections.flatMap((section) =>
    section.options.map((option) => ({
      ...option,
      key: section.key,
      selected: searchParams.getAll(section.key).includes(option.value),
    })),
  );

  return (
    <aside className="w-full shrink-0 lg:w-64">
      <input
        type="search"
        placeholder={searchPlaceholder}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        aria-label={labels.search}
        className="input w-full"
      />

      <div className="mt-4 lg:hidden">
        <div
          className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-1"
          role="group"
          aria-label={labels.filters}
        >
          {chips.map((chip) => (
            <button
              key={`${chip.key}-${chip.value}`}
              type="button"
              aria-pressed={chip.selected}
              onClick={() => createParamUpdate(chip.key, chip.value, !chip.selected)}
              className={`inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border px-4 text-small transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${
                chip.selected
                  ? "border-brand bg-brand text-on-brand"
                  : "border-line bg-surface text-ink"
              }`}
            >
              {chip.label}
              <span className={chip.selected ? "text-on-brand/80" : "text-ink-muted"}>{chip.count}</span>
            </button>
          ))}
        </div>
        {hasActiveFilters && (
          <button type="button" onClick={clearFilters} className="mt-3 text-small text-link">
            {labels.clear}
          </button>
        )}
      </div>

      <div className="mt-6 hidden space-y-6 lg:block">
        {sections.map((section) => (
          <fieldset key={section.key}>
            <legend className="text-body font-display text-ink mb-2">{section.label}</legend>
            <ul className="space-y-1.5">
              {section.options.map((option) => {
                const selected = searchParams.getAll(section.key).includes(option.value);
                return (
                  <li key={option.value}>
                    <label className="flex min-h-11 cursor-pointer items-center gap-2 text-small text-ink-secondary hover:text-ink">
                      <input
                        type="checkbox"
                        checked={selected}
                        onChange={(event) =>
                          createParamUpdate(section.key, option.value, event.target.checked)
                        }
                        className="size-4 rounded border-line accent-brand"
                      />
                      <span className="flex-1">{option.label}</span>
                      <span className="text-micro text-ink-muted">{option.count}</span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </fieldset>
        ))}

        {hasActiveFilters && (
          <button type="button" onClick={clearFilters} className="text-small text-link hover:underline">
            {labels.clear}
          </button>
        )}
      </div>
    </aside>
  );
}
