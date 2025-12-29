import { useEffect } from "preact/hooks";
import { signal } from "@preact/signals";
import { type Person, PersonService } from "../lib/api/index.ts";
import { PersonCard } from "../components/PersonCard.tsx";
import { EmptyState } from "../components/EmptyState.tsx";
import { PersonModal } from "../components/PersonModal.tsx";

const persons = signal<Person[]>([]);
const searchQuery = signal("");
const isModalOpen = signal(false);
const editingPerson = signal<Person | null>(null);
const isLoading = signal(false);
const toastMessage = signal("");
const toastType = signal<"success" | "error" | "">("");
const formData = signal<Partial<Person>>({
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
});

export default function App() {
  useEffect(() => {
    loadPersons();
  }, []);

  const loadPersons = async () => {
    isLoading.value = true;
    try {
      const data = await PersonService.getAll();
      persons.value = data;
    } catch (error) {
      console.error("Failed to load persons:", error);
    } finally {
      isLoading.value = false;
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.value.trim()) {
      await loadPersons();
      return;
    }

    isLoading.value = true;
    try {
      const data = await PersonService.search(searchQuery.value);
      persons.value = data;
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      isLoading.value = false;
    }
  };

  const handleClearSearch = () => {
    searchQuery.value = "";
    loadPersons();
  };

  const showToast = (message: string, type: "success" | "error") => {
    toastMessage.value = message;
    toastType.value = type;
    setTimeout(() => {
      toastMessage.value = "";
      toastType.value = "";
    }, 3000);
  };

  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    if (
      !formData.value.firstName || !formData.value.lastName ||
      !formData.value.email
    ) {
      showToast("Please fill in all required fields", "error");
      return;
    }

    isLoading.value = true;
    try {
      let result;
      if (editingPerson.value) {
        result = await PersonService.update({
          ...formData.value,
          id: editingPerson.value.id,
        } as Person);
      } else {
        result = await PersonService.add(formData.value as Person);
      }

      if (result.state === "ok") {
        await loadPersons();
        closeModal();
      } else {
        showToast("Operation failed", "error");
      }
    } catch (error) {
      console.error("Failed to save person:", error);
      showToast("Failed to save person. Please try again.", "error");
    } finally {
      isLoading.value = false;
    }
  };

  const handleEdit = (person: Person) => {
    editingPerson.value = person;
    formData.value = {
      firstName: person.firstName || "",
      lastName: person.lastName || "",
      email: person.email || "",
      phoneNumber: person.phoneNumber || "",
    };
    isModalOpen.value = true;
  };

  const handleDelete = async (id: number) => {
    isLoading.value = true;
    try {
      const result = await PersonService.delete(id);
      if (result.state === "ok") {
        await loadPersons();
      }
    } catch (error) {
      console.error("Failed to delete person:", error);
    } finally {
      isLoading.value = false;
    }
  };

  const openModal = () => {
    editingPerson.value = null;
    formData.value = {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
    };
    isModalOpen.value = true;
  };

  const closeModal = () => {
    isModalOpen.value = false;
    editingPerson.value = null;
    formData.value = {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
    };
    toastMessage.value = "";
    toastType.value = "";
  };

  return (
    <>
      {/* Header Card */}
      <div class="card bg-base-100 shadow-2xl">
        <div class="card-body p-8">
          <div class="flex items-start justify-between mb-6">
            <div>
              <h1 class="text-4xl font-bold mb-2">Persy</h1>
              <p class="text-base-content/70">
                Simple and elegant person management system. Keep track of your
                contacts with ease.
              </p>
            </div>
            <button
              type="button"
              onClick={openModal}
              class="btn btn-primary"
              disabled={isLoading.value}
            >
              Add Person
            </button>
          </div>

          {/* Search Section */}
          <div class="flex gap-2">
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              class="input input-bordered w-full"
              value={searchQuery.value}
              onInput={(
                e,
              ) => (searchQuery.value = (e.target as HTMLInputElement).value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
            />
            <button
              type="button"
              onClick={handleSearch}
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
                onClick={handleClearSearch}
                class="btn btn-ghost"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Body Card */}
      <div class="card bg-base-100 shadow-2xl">
        <div class="card-body p-8">
          <h2 class="text-xl font-semibold mb-4">People</h2>

          {isLoading.value
            ? (
              <div class="text-center py-16">
                <span class="loading loading-spinner loading-lg text-primary">
                </span>
                <p class="mt-4 text-base-content/60">Loading...</p>
              </div>
            )
            : persons.value.length === 0
            ? (
              <EmptyState
                hasSearch={!!searchQuery.value}
                onAddClick={openModal}
              />
            )
            : (
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                {persons.value.map((person) => (
                  <PersonCard
                    key={person.id}
                    person={person}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            )}
        </div>
      </div>

      {/* Footer */}
      <div class="text-center">
        <p class="text-base-content/50 text-sm">
          Powered by Persy
        </p>
      </div>

      <PersonModal
        isOpen={isModalOpen}
        isLoading={isLoading}
        editingPerson={editingPerson}
        formData={formData}
        toastMessage={toastMessage}
        toastType={toastType}
        onClose={closeModal}
        onSubmit={handleSubmit}
      />
    </>
  );
}
