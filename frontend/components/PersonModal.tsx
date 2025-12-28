import { Signal } from "@preact/signals";
import { type Person } from "../lib/api/index.ts";

interface PersonModalProps {
  isOpen: Signal<boolean>;
  isLoading: Signal<boolean>;
  editingPerson: Signal<Person | null>;
  formData: Signal<Partial<Person>>;
  toastMessage: Signal<string>;
  toastType: Signal<"success" | "error" | "">;
  onClose: () => void;
  onSubmit: (e: Event) => void;
}

export function PersonModal({
  isOpen,
  isLoading,
  editingPerson,
  formData,
  toastMessage,
  toastType,
  onClose,
  onSubmit,
}: PersonModalProps) {
  if (!isOpen.value) return null;

  return (
    <div class="modal modal-open">
      <div class="modal-box max-w-2xl">
        <h3 class="font-bold text-2xl mb-6">
          {editingPerson.value ? "Edit Person" : "Add New Person"}
        </h3>

        {toastMessage.value && (
          <div class={`alert alert-${toastType.value} mb-4`}>
            <span>{toastMessage.value}</span>
          </div>
        )}

        <div class="space-y-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text font-semibold">First Name *</span>
            </label>
            <input
              type="text"
              placeholder="John"
              class="input input-bordered w-full"
              value={formData.value.firstName}
              onInput={(e) => (formData.value = {
                ...formData.value,
                firstName: (e.target as HTMLInputElement).value,
              })}
            />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text font-semibold">Last Name *</span>
            </label>
            <input
              type="text"
              placeholder="Doe"
              class="input input-bordered w-full"
              value={formData.value.lastName}
              onInput={(e) => (formData.value = {
                ...formData.value,
                lastName: (e.target as HTMLInputElement).value,
              })}
            />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text font-semibold">Email *</span>
            </label>
            <input
              type="email"
              placeholder="john@example.com"
              class="input input-bordered w-full"
              value={formData.value.email}
              onInput={(e) => (formData.value = {
                ...formData.value,
                email: (e.target as HTMLInputElement).value,
              })}
            />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text font-semibold">Phone Number</span>
            </label>
            <input
              type="tel"
              placeholder="+1 (555) 123-4567"
              class="input input-bordered w-full"
              value={formData.value.phoneNumber}
              onInput={(e) => (formData.value = {
                ...formData.value,
                phoneNumber: (e.target as HTMLInputElement).value,
              })}
            />
          </div>
        </div>

        <div class="modal-action">
          <button
            type="button"
            onClick={onClose}
            class="btn btn-ghost"
            disabled={isLoading.value}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onSubmit}
            class="btn btn-primary"
            disabled={isLoading.value}
          >
            {isLoading.value
              ? <span class="loading loading-spinner loading-sm"></span>
              : editingPerson.value
              ? "Update Person"
              : "Add Person"}
          </button>
        </div>
      </div>
      <div class="modal-backdrop" onClick={onClose}></div>
    </div>
  );
}
