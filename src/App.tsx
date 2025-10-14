import { useEffect, useState } from "react";
import Header from "./components/ui/Header";
import RegisterForm from "./components/RegisterForm/RegisterForm";
import UsersList from "./components/users/UsersList";
import type { User } from "./types";
import { loadUsers, saveUsers } from "./lib/storage";

export default function App() {
  const [page, setPage] = useState<"register" | "users">("register");
  const [users, setUsers] = useState<User[]>([]);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    setUsers(loadUsers());
  }, []);

  function handleAddUser(newUser: User) {
    const updated = [newUser, ...users];
    setUsers(updated);
    saveUsers(updated);
  }

  function handleDeleteUser(id: string) {
    if (id === "__CLEAR_ALL__") {
      setUsers([]);
      return;
    }
    const updated = users.filter((u) => u.id !== id);
    setUsers(updated);
    saveUsers(updated);
  }

  function gotoRegister() {
    setPage("register");
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#E7EAFA]">
      <Header />

      <main className="flex flex-1 items-center justify-center">
        <div className="w-full">
          {page === "register" && (
            <RegisterForm
              users={users}
              onAddUser={handleAddUser}
              onGoToUsers={() => setPage("users")}
              successMsg={successMsg}
              setSuccessMsg={setSuccessMsg}
            />
          )}

          {page === "users" && (
            <UsersList
              users={users}
              onDeleteUser={handleDeleteUser}
              onAddUserClick={gotoRegister}
            />
          )}
        </div>
      </main>
    </div>
  );
}
