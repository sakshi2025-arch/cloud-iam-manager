import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Home() {
const [users, setUsers] = useState([]);
const [usersLoading, setUsersLoading] = useState(true);

const totalUsers = users.length;

const activeUsers = users.filter(
  (user) => user.status === "Active"
).length;

const readOnlyUsers = users.filter(
  (user) => user.permission === "Read Only"
).length;

const fullAccessUsers = users.filter(
  (user) => user.permission === "Full Access"
).length;
  // Backend connection status
  const [backendStatus, setBackendStatus] = useState("Checking...");
  

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
      console.error("Error fetching AWS users:", error);
    })
    .finally(() => {
      setUsersLoading(false);
    });
}, []);
  useEffect(() => {
    fetch("http://127.0.0.1:8000/health")
      .then((response) => response.json())
      .then((data) => {
        setBackendStatus(data.status);
      })
      .catch(() => {
        setBackendStatus("Backend Offline");
      });
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Navbar */}
      <nav className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <Link to="/" className="text-2xl font-bold">
            Cloud<span className="text-blue-500">IAM</span>
          </Link>

          <div className="flex gap-8 text-sm text-slate-300">

            <Link
              to="/"
              className="text-blue-500"
            >
              Dashboard
            </Link>

            <Link
              to="/create-user"
              className="transition hover:text-white"
            >
              Create User
            </Link>

            <Link
              to="/users"
              className="transition hover:text-white"
            >
              Users
            </Link>

          </div>

        </div>
      </nav>

      {/* Main */}
      <main className="mx-auto max-w-7xl px-6 py-12">

        {/* Header */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">

          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-500">
              AWS IAM Dashboard
            </p>

            <h1 className="mt-3 text-4xl font-bold md:text-5xl">
              Cloud Access Overview
            </h1>

            <p className="mt-3 max-w-2xl text-slate-400">
              Manage IAM users, permissions and AWS service access
              from one centralized dashboard.
            </p>
          </div>

          <Link
            to="/create-user"
            className="rounded-lg bg-blue-600 px-6 py-3 text-center font-semibold transition hover:bg-blue-500"
          >
            + Create IAM User
          </Link>

        </div>

        {/* Statistics */}
        <section className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {/* Total Users */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

            <p className="text-sm text-slate-400">
              Total Users
            </p>

            <h2 className="mt-3 text-4xl font-bold">
              {totalUsers}
            </h2>

            <p className="mt-2 text-sm text-blue-400">
              IAM users created
            </p>

          </div>

          {/* Active Users */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

            <p className="text-sm text-slate-400">
              Active Users
            </p>

            <h2 className="mt-3 text-4xl font-bold">
              {activeUsers}
            </h2>

            <p className="mt-2 text-sm text-green-400">
              Currently active
            </p>

          </div>

          {/* Read Only */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

            <p className="text-sm text-slate-400">
              Read Only
            </p>

            <h2 className="mt-3 text-4xl font-bold">
              {readOnlyUsers}
            </h2>

            <p className="mt-2 text-sm text-yellow-400">
              Limited permissions
            </p>

          </div>

          {/* Full Access */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

            <p className="text-sm text-slate-400">
              Full Access
            </p>

            <h2 className="mt-3 text-4xl font-bold">
              {fullAccessUsers}
            </h2>

            <p className="mt-2 text-sm text-red-400">
              Elevated permissions
            </p>

          </div>

        </section>

        {/* Backend Connection */}
        <section className="mt-8">

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

            <div className="flex items-center justify-between">

              <div>
                <h2 className="text-xl font-bold">
                  Backend Connection
                </h2>

                <p className="mt-2 text-sm text-slate-400">
                  FastAPI backend connection status
                </p>
              </div>

              <div className="flex items-center gap-3">

                <span
                  className={`h-3 w-3 rounded-full ${
                    backendStatus === "healthy"
                      ? "bg-green-500"
                      : backendStatus === "Checking..."
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                ></span>

                <span
                  className={`font-semibold ${
                    backendStatus === "healthy"
                      ? "text-green-400"
                      : backendStatus === "Checking..."
                      ? "text-yellow-400"
                      : "text-red-400"
                  }`}
                >
                  {backendStatus}
                </span>

              </div>

            </div>

          </div>

        </section>

        {/* Services */}
        <section className="mt-12">

          <div>
            <h2 className="text-2xl font-bold">
              AWS Services
            </h2>

            <p className="mt-2 text-slate-400">
              Services available for IAM permission management.
            </p>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">

            <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 transition hover:border-blue-500">
              <h3 className="text-lg font-semibold">
                IAM
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                Identity and access management.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 transition hover:border-blue-500">
              <h3 className="text-lg font-semibold">
                EC2
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                Compute resource access.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 transition hover:border-blue-500">
              <h3 className="text-lg font-semibold">
                S3
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                Cloud storage permissions.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 transition hover:border-blue-500">
              <h3 className="text-lg font-semibold">
                Lambda
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                Serverless resource access.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 transition hover:border-blue-500">
              <h3 className="text-lg font-semibold">
                CloudWatch
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                Monitoring and logging.
              </p>
            </div>

          </div>

        </section>

        {/* Quick Actions */}
        <section className="mt-12">

          <h2 className="text-2xl font-bold">
            Quick Actions
          </h2>

          <div className="mt-6 grid gap-5 md:grid-cols-2">

            <Link
              to="/create-user"
              className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-blue-500"
            >
              <h3 className="text-xl font-semibold">
                Create IAM User
              </h3>

              <p className="mt-2 text-slate-400">
                Create a new user and configure AWS permissions.
              </p>

              <span className="mt-5 inline-block text-blue-400">
                Create User →
              </span>
            </Link>

            <Link
              to="/users"
              className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-blue-500"
            >
              <h3 className="text-xl font-semibold">
                View IAM Users
              </h3>

              <p className="mt-2 text-slate-400">
                View all users created through the dashboard.
              </p>

              <span className="mt-5 inline-block text-blue-400">
                View Users →
              </span>
            </Link>

          </div>

        </section>

      </main>

    </div>
  );
}

export default Home;