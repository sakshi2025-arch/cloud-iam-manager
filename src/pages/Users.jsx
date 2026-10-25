import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

const fetchUsers = () => {
  setLoading(true);
  setError("");

  fetch("http://127.0.0.1:8000/users")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      return response.json();
    })
    .then((data) => {
      if (!data.success) {
        throw new Error(data.message);
      }

      setUsers(data.users);
    })
    .catch((error) => {
      console.error("Error:", error);
      setError(error.message);
    })
    .finally(() => {
      setLoading(false);
    });
};

  useEffect(() => {
    fetch("http://127.0.0.1:8000/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        return response.json();
      })
      .then((data) => {
        if (!data.success) {
          throw new Error(data.message);
        }

        setUsers(data.users);
      })
      .catch((error) => {
        console.error("Error:", error);
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Navbar */}
      <nav className="border-b border-slate-800">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <Link to="/" className="text-2xl font-bold">
            Cloud<span className="text-blue-500">IAM</span>
          </Link>

          <div className="flex gap-8 text-sm text-slate-300">

            <Link to="/" className="hover:text-white">
              Home
            </Link>

            <Link to="/create-user" className="hover:text-white">
              Create User
            </Link>

            <Link to="/users" className="text-blue-500">
              Users
            </Link>

          </div>

        </div>
      </nav>

      {/* Page */}
      <main className="mx-auto max-w-7xl px-6 py-16">

        {/* Header */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">

          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-500">
              AWS IAM Management
            </p>

            <h1 className="mt-3 text-4xl font-bold">
              IAM Users
            </h1>

            <p className="mt-3 text-slate-400">
              View users directly from your AWS IAM account.
            </p>
          </div>

<button
  onClick={fetchUsers}
  className="rounded-lg border border-slate-700 bg-slate-900 px-5 py-3 font-semibold transition hover:bg-slate-800"
>
  ↻ Refresh
</button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900 px-6 py-16 text-center">
            <p className="text-slate-400">
              Loading AWS IAM users...
            </p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="mt-10 rounded-2xl border border-red-500/30 bg-red-500/10 px-6 py-10 text-center">

            <h2 className="text-xl font-semibold text-red-400">
              Unable to load IAM users
            </h2>

            <p className="mt-2 text-slate-400">
              {error}
            </p>

          </div>
        )}

        {/* Empty */}
        {!loading && !error && users.length === 0 && (
          <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900 px-6 py-16 text-center">

            <h2 className="text-xl font-semibold">
              No IAM Users Found
            </h2>

            <p className="mt-2 text-slate-400">
              No users were found in your AWS IAM account.
            </p>

          </div>
        )}

        {/* Users Table */}
        {!loading && !error && users.length > 0 && (
          <div className="mt-10 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">

            <div className="overflow-x-auto">

              <table className="w-full text-left">

                <thead className="border-b border-slate-800 bg-slate-950">

                  <tr>

                    <th className="px-6 py-4 text-sm font-semibold text-slate-300">
                      Username
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold text-slate-300">
                      User ID
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold text-slate-300">
                      Service
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold text-slate-300">
                      Permission
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold text-slate-300">
                      Created
                      </th>
                    <th className="px-6 py-4 text-sm font-semibold text-slate-300">
                      Status
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {users.map((user) => (

                    <tr
                      key={user.user_id}
                      className="border-b border-slate-800 last:border-b-0"
                    >

                      <td className="px-6 py-5 font-medium">
                        {user.username}
                      </td>

                      <td className="px-6 py-5 text-slate-300">
                        {user.user_id}
                      </td>

                    <td className="px-6 py-5">
  <span className="rounded-full bg-blue-500/10 px-3 py-1 text-sm text-blue-400">
    {user.service}
  </span>
</td>
                    <td className="px-6 py-5">
  <span
    className={`rounded-full px-3 py-1 text-sm ${
      user.permission === "Full Access"
        ? "bg-red-500/10 text-red-400"
        : "bg-green-500/10 text-green-400"
    }`}
  >
    {user.permission}
  </span>
</td>

                      <td className="px-6 py-5 text-slate-300">
                      {new Date(user.created).toLocaleString()}
                        </td>
                      <td className="px-6 py-5">

                        <span className="rounded-full bg-green-500/10 px-3 py-1 text-sm text-green-400">
                          Active
                        </span>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>
        )}

      </main>
    </div>
  );
}

export default Users;