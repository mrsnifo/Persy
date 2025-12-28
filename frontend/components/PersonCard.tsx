import { type Person } from "../lib/api/index.ts";

interface PersonCardProps {
  person: Person;
  onEdit: (person: Person) => void;
  onDelete: (id: number) => void;
}

export function PersonCard({ person, onEdit, onDelete }: PersonCardProps) {
  return (
    <div class="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
      <div class="card-body">
        <div class="flex items-start justify-between">
          <h2 class="card-title text-xl">
            {person.firstName} {person.lastName}
          </h2>
          <div class="dropdown dropdown-end">
            <label tabIndex={0} class="btn btn-ghost btn-sm btn-circle">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </label>
            <ul
              tabIndex={0}
              class="dropdown-content menu p-2 shadow-lg bg-base-100 rounded-box w-52 z-10"
            >
              <li>
                <a onClick={() => onEdit(person)}>
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  Edit
                </a>
              </li>
              <li>
                <a onClick={() => onDelete(person.id!)} class="text-error">
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  Delete
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div class="divider my-2"></div>

        <div class="space-y-3">
          {person.email && (
            <div class="flex items-center gap-3">
              <svg
                class="w-5 h-5 opacity-60"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span class="text-sm truncate">{person.email}</span>
            </div>
          )}

          {person.phoneNumber && (
            <div class="flex items-center gap-3">
              <svg
                class="w-5 h-5 opacity-60"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <span class="text-sm">{person.phoneNumber}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
