"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback, useMemo } from "react";

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
  };
}

export function FilterSidebar({ sections, searchPlaceholder, labels }: FilterSidebarProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const searchValue = searchParams.get("q") ?? "";

  const hasActiveFilters = useMemo(() => {
    return sections.some((s) => searchParams.has(s.key));
  }, [sections, searchParams]);

  const createParamUpdate = useCallback(
    (key: string, value: string, checked: boolean) => {
      const params = new URLSearchParams(searchParams.toString());
      if (checked) {
        params.append(key, value);
      } else {
        const existing = params.getAll(key);
        params.delete(key);
        existing.filter((v) => v !== value).forEach((v) => params.append(key, v));
      }
      const qs = params.toString();
      router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [searchParams, pathname, router]
  );

  const clearFilters = useCallback(() => {
    router.push(pathname, { scroll: false });
  }, [pathname, router]);

  const handleSearch = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set("q", value);
      } else {
        params.delete("q");
      }
      const qs = params.toString();
      router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [searchParams, pathname, router]
  );

  return (
    <aside className="w-full shrink-0 space-y-6 lg:w-64">
      <div>
        <input
          type="search"
          placeholder={searchPlaceholder}
          defaultValue={searchValue}
          onChange={(e) => handleSearch(e.target.value)}
          className="input w-full"
        />
      </div>

      {sections.map((section) => (
        <fieldset key={section.key}>
          <legend className="text-body font-display text-ink mb-2">{section.label}</legend>
          <ul className="space-y-1.5">
            {section.options.map((option) => {
              const params = new URLSearchParams(searchParams.toString());
              const selected = params.getAll(section.key).includes(option.value);
              return (
                <li key={option.value}>
                  <label className="flex cursor-pointer items-center gap-2 text-small text-ink-secondary hover:text-ink">
                    <input
                      type="checkbox"
                      checked={selected}
                      onChange={(e) => createParamUpdate(section.key, option.value, e.target.checked)}
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
        <button
          onClick={clearFilters}
          className="text-small text-link hover:underline"
        >
          {labels.clear}
        </button>
      )}
    </aside>
  );
}
