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
    <div className="mx-auto w-full max-w-[920px] py-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">
          Зарегистрированные пользователи
        </h2>
        <div className="flex gap-2">
          <button
            onClick={onAddUserClick}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition cursor-pointer"
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
            className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-md hover:bg-gray-50 transition cursor-pointer"
            type="button"
          >
            Очистить всё
          </button>
        </div>
      </div>

      {users.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          Пользователей пока нет.
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <ul>
            {users.map((u) => (
              <li
                key={u.id}
                className="flex items-center justify-between px-4 py-3 border-b last:border-b-0"
              >
                <div>
                  <div className="font-medium">{u.email}</div>
                  <div className="text-sm text-gray-500">
                    {u.name} • {new Date(u.createdAt).toLocaleString()}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (!confirm("Удалить пользователя?")) return;
                      onDeleteUser(u.id);
                    }}
                    className="px-3 py-1 rounded-md bg-red-50 text-red-600 text-sm hover:bg-red-100 transition cursor-pointer"
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
