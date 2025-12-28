import { Signal } from "@preact/signals";

interface SearchBarProps {
  searchQuery: Signal<string>;
  isLoading: Signal<boolean>;
  onSearch: () => void;
  onClear: () => void;
}

export function SearchBar(
  { searchQuery, isLoading, onSearch, onClear }: SearchBarProps,
) {
  return (
    <div class="mb-8 -mt-6">
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body p-4">
          <div class="flex gap-2">
            <div class="relative flex-1">
              <input
                type="text"
                placeholder="Search by name, email, or phone..."
                class="input input-bordered w-full"
                value={searchQuery.value}
                onInput={(
                  e,
                ) => (searchQuery.value = (e.target as HTMLInputElement).value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") onSearch();
                }}
              />
            </div>
            <button
              type="button"
              onClick={onSearch}
              class="btn btn-primary"
              disabled={isLoading.value}
            >
              {isLoading.value
                ? <span class="loading loading-spinner loading-sm"></span>
                : "Search"}
            </button>
            {searchQuery.value && (
              <button
                type="button"
                onClick={onClear}
                class="btn btn-ghost"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} // components/Header.tsx
