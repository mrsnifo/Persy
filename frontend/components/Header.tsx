import { Signal } from "@preact/signals";

interface HeaderProps {
  onAddClick: () => void;
  isLoading: Signal<boolean>;
}

export function Header({ onAddClick, isLoading }: HeaderProps) {
  return (
    <div class="navbar bg-linear-to-br shadow-lg">
      <div class="flex-1">
        <a class="text-xl font-bold">Persy</a>
      </div>
      <div class="flex-none">
        <button
          type="button"
          onClick={onAddClick}
          class="btn btn-primary"
          disabled={isLoading.value}
        >
          Add Person
        </button>
      </div>
    </div>
  );
}
