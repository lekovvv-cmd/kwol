import { LS_KEY } from "../../lib/storage";
import type { User } from "../../types";

type Props = {
  users: User[];
  onDeleteUser: (id: string) => void;
  onAddUserClick: () => void;
};

export default function UsersList({
  users,
  onDeleteUser,
  onAddUserClick,
}: Props) {
  return (
    <div className="mx-auto w-full max-w-[920px] px-4 sm:px-8 py-6 sm:py-10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 text-center sm:text-left">
          Зарегистрированные пользователи
        </h2>

        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <button
            onClick={onAddUserClick}
            className="flex-1 sm:flex-none px-4 py-3 bg-blue-600 text-white rounded-xl font-medium text-sm hover:bg-blue-700 transition active:scale-[0.98]"
            type="button"
          >
            Добавить пользователя
          </button>

          <button
            onClick={() => {
              if (!confirm("Очистить весь список пользователей?")) return;
              localStorage.removeItem(LS_KEY);
              onDeleteUser("__CLEAR_ALL__");
            }}
            className="flex-1 sm:flex-none px-4 py-3 bg-gray-100 border border-gray-200 text-gray-700 rounded-xl font-medium text-sm hover:bg-gray-200 transition active:scale-[0.98]"
            type="button"
          >
            Очистить всё
          </button>
        </div>
      </div>

      {users.length === 0 ? (
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm text-center text-gray-600">
          Пользователей пока нет.
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden divide-y divide-gray-100">
          <ul className="divide-y divide-gray-100">
            {users.map((u) => (
              <li
                key={u.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 sm:px-6 py-3 hover:bg-gray-50 transition"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 w-full">
                  <div className="font-medium text-gray-900 text-sm sm:text-base break-all">
                    {u.email}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-0">
                    {u.name} • {new Date(u.createdAt).toLocaleString()}
                  </div>
                </div>

                <div className="flex justify-end sm:justify-start">
                  <button
                    onClick={() => {
                      if (!confirm("Удалить пользователя?")) return;
                      onDeleteUser(u.id);
                    }}
                    className="px-3 py-2 rounded-lg bg-red-50 text-red-600 text-sm font-medium hover:bg-red-100 transition cursor-pointer"
                    type="button"
                  >
                    Удалить
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
