import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function CreateUser() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [service, setService] = useState("IAM");
  const [permission, setPermission] = useState("Read Only");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username.trim()) {
      alert("Please enter a username.");
      return;
    }

    setLoading(true);

    try {
      // Send user information to FastAPI backend
      const response = await fetch("http://127.0.0.1:8000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username.trim(),
          service,
          permission,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create user");
      }

      const data = await response.json();
      if (!data.success) {
          alert(data.message);
          return;
      }

      // Save user locally for dashboard display
      const newUser = {
        username: username.trim(),
        service,
        permission,
        status: "Active",
      };

      const existingUsers =
        JSON.parse(localStorage.getItem("cloudIAMUsers")) || [];

      existingUsers.push(newUser);

      localStorage.setItem(
        "cloudIAMUsers",
        JSON.stringify(existingUsers)
      );

      alert(data.message);

      navigate("/users");
    } catch (error) {
      console.error("Error:", error);
      alert(
        "Unable to connect to the backend. Please make sure FastAPI is running."
      );
    } finally {
      setLoading(false);
    }
  };

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

            <Link
              to="/create-user"
              className="text-blue-500"
            >
              Create User
            </Link>

            <Link to="/users" className="hover:text-white">
              Users
            </Link>

          </div>

        </div>
      </nav>

      {/* Page */}
      <main className="mx-auto max-w-3xl px-6 py-16">

        <div className="mb-10">

          <p className="text-sm font-semibold uppercase tracking-widest text-blue-500">
            IAM Management
          </p>

          <h1 className="mt-3 text-4xl font-bold">
            Create IAM User
          </h1>

          <p className="mt-3 text-slate-400">
            Create a new user and define their AWS service permissions.
          </p>

        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-xl"
        >

          {/* Username */}
          <div className="mb-6">

            <label className="mb-2 block text-sm font-medium text-slate-300">
              Username
            </label>

            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter IAM username"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-blue-500"
            />

          </div>

          {/* Service */}
          <div className="mb-6">

            <label className="mb-2 block text-sm font-medium text-slate-300">
              AWS Service
            </label>

            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
            >
              <option>IAM</option>
              <option>EC2</option>
              <option>S3</option>
              <option>Lambda</option>
              <option>CloudWatch</option>
            </select>

          </div>

          {/* Permission */}
          <div className="mb-8">

            <label className="mb-3 block text-sm font-medium text-slate-300">
              Permission
            </label>

            <div className="grid grid-cols-2 gap-4">

              <button
                type="button"
                onClick={() => setPermission("Read Only")}
                className={`rounded-lg border px-4 py-4 text-left transition ${
                  permission === "Read Only"
                    ? "border-blue-500 bg-blue-500/10"
                    : "border-slate-700 bg-slate-950 hover:border-blue-500"
                }`}
              >

                <p className="font-semibold">
                  Read Only
                </p>

                <p className="mt-1 text-sm text-slate-400">
                  View resources without making changes.
                </p>

              </button>

              <button
                type="button"
                onClick={() => setPermission("Full Access")}
                className={`rounded-lg border px-4 py-4 text-left transition ${
                  permission === "Full Access"
                    ? "border-blue-500 bg-blue-500/10"
                    : "border-slate-700 bg-slate-950 hover:border-blue-500"
                }`}
              >

                <p className="font-semibold">
                  Full Access
                </p>

                <p className="mt-1 text-sm text-slate-400">
                  Full permissions for the selected service.
                </p>

              </button>

            </div>

          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-lg px-6 py-3 font-semibold transition ${
              loading
                ? "cursor-not-allowed bg-blue-800"
                : "bg-blue-600 hover:bg-blue-500"
            }`}
          >
            {loading ? "Creating User..." : "Create IAM User"}
          </button>

        </form>

      </main>
    </div>
  );
}

export default CreateUser;