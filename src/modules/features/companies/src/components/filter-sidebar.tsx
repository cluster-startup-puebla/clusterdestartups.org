"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";

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
  const panelId = useId();

  const searchValue = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(searchValue);
  const [open, setOpen] = useState(false);
  const asideRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelWasOpen = useRef(false);

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
    replaceWithoutJump(() => {
      router.replace(pathname, { scroll: false });
    });
  }, [pathname, router]);

  const selectedChips = sections.flatMap((section) =>
    section.options
      .filter((option) => searchParams.getAll(section.key).includes(option.value))
      .map((option) => ({ ...option, key: section.key })),
  );

  const activeCount = selectedChips.length;

  useEffect(() => {
    if (!open) {
      if (panelWasOpen.current) triggerRef.current?.focus();
      panelWasOpen.current = false;
      return;
    }

    panelWasOpen.current = true;
    asideRef.current?.scrollIntoView({ block: "start", behavior: "auto" });
    closeRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <aside ref={asideRef} aria-label={labels.filters} className="w-full shrink-0 scroll-mt-20 lg:w-64">
      <input
        type="search"
        placeholder={searchPlaceholder}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        aria-label={labels.search}
        className="input min-h-11 w-full"
      />

      <div className="mt-3 lg:hidden">
        <div className="flex flex-wrap items-center gap-2">
          {sections.length > 0 && (
            <button
              ref={triggerRef}
              type="button"
              className={`btn btn-secondary min-h-11 min-w-44 flex-1 px-4 text-small ${focusRing}`}
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpen((value) => !value)}
            >
              <SlidersHorizontal aria-hidden="true" strokeWidth={2} className="size-5 shrink-0" />
              {labels.filters}
              {activeCount > 0 && (
                <span className="inline-flex min-h-6 min-w-6 items-center justify-center rounded-full bg-brand px-1.5 text-micro text-on-brand">
                  {activeCount}
                </span>
              )}
            </button>
          )}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className={`inline-flex min-h-11 items-center px-3 text-small text-link ${focusRing}`}
            >
              {labels.clear}
            </button>
          )}
        </div>

        {selectedChips.length > 0 && (
          <ul aria-label={labels.active} className="mt-3 flex flex-wrap gap-2">
            {selectedChips.map((chip) => (
              <li key={`${chip.key}-${chip.value}`} className="max-w-full">
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

        {open && (
          <div
            id={panelId}
            role="region"
            aria-label={labels.filters}
            className="card mt-3"
          >
            <div className="flex items-center justify-between gap-2 border-b border-line ps-4">
              <h2 className="text-body font-display text-ink">{labels.filters}</h2>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpen(false)}
                aria-label={labels.close}
                className={`inline-flex size-11 shrink-0 items-center justify-center rounded-full text-ink ${focusRing}`}
              >
                <X aria-hidden="true" strokeWidth={2} />
              </button>
            </div>
            <div className="max-h-[min(12rem,34dvh)] overflow-y-auto overscroll-contain px-2 py-2">
              <FilterGroups
                sections={sections}
                isSelected={(key, value) => searchParams.getAll(key).includes(value)}
                onToggle={createParamUpdate}
                stickyLabels
                className="space-y-5"
              />
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 hidden lg:block">
        <FilterGroups
          sections={sections}
          isSelected={(key, value) => searchParams.getAll(key).includes(value)}
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
  stickyLabels = false,
  className,
}: {
  sections: FilterSection[];
  isSelected: (key: string, value: string) => boolean;
  onToggle: (key: string, value: string, checked: boolean) => void;
  stickyLabels?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      {sections.map((section) => (
        <fieldset key={section.key} className="min-w-0 border-0 p-0">
          <legend
            className={`text-body font-display text-ink px-2 ${
              stickyLabels ? "sticky top-0 z-10 bg-elevated py-2" : "mb-2"
            }`}
          >
            {section.label}
          </legend>
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
