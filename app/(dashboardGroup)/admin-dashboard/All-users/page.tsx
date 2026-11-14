
import SearchBarPage from "@/app/(publicGroup)/Search/page";
import { getAlluser, updateUserStatus } from "../../_actions/adminaction";
import Link from "next/link";

interface IUser {
  id: string;
  email: string;
  name: string;
  role: string;
  status: string;
}

interface userPageProps {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}

const userPage = async ({ searchParams }: userPageProps) => {
  const search = await searchParams;
  const response = await getAlluser(search);

  const users: IUser[] = response.data || [];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-10">

        <div className="flex flex-wrap justify-between gap-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">
              All Users
            </h1>

            <p className="mt-2 text-slate-500">
              Manage your registered users.
            </p>

            <p className="mt-2 text-sm text-slate-600">
              {users.length} users found
            </p>
          </div>

          <div>
            <SearchBarPage />
          </div>
        </div>

        {users.length === 0 ? (
          <div className="rounded-xl border bg-white p-10 text-center">
            <h2 className="text-xl font-semibold text-slate-800">
              No users found
            </h2>

            <p className="mt-2 text-slate-500">
              Try another search term or view all users.
            </p>

            <Link
              href="/admin-dashboard/users"
              className="mt-5 inline-block rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
            >
              Show all users
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border bg-white shadow-sm">
            <table className="w-full text-left">
              <thead className="bg-slate-100">
                <tr>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-700">
                    Name
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-slate-700">
                    Email
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-slate-700">
                    Role
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-slate-700">
                    Status
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-slate-700">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50">

                    <td className="px-6 py-4 font-medium text-slate-900">
                      {user.name}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {user.email}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {user.role}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={
                          user.status === "ACTIVE"
                            ? "rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700"
                            : "rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700"
                        }
                      >
                        {user.status}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <form
                        action={async (formData: FormData) => {
                          "use server";

                          const userId = formData.get("userId");
                          const status = formData.get("status");

                          if (
                            typeof userId === "string" &&
                            (status === "ACTIVE" || status === "SUSPENDED")
                          ) {
                            await updateUserStatus(userId, status);
                          }
                        }}
                      >
                        <input
                          type="hidden"
                          name="userId"
                          value={user.id}
                        />

                        {user.status === "ACTIVE" ? (
                          <>
                            <input
                              type="hidden"
                              name="status"
                              value="SUSPENDED"
                            />

                            <button
                              type="submit"
                              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                            >
                              Suspend
                            </button>
                          </>
                        ) : (
                          <>
                            <input
                              type="hidden"
                              name="status"
                              value="ACTIVE"
                            />

                            <button
                              type="submit"
                              className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
                            >
                              Activate
                            </button>
                          </>
                        )}
                      </form>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default userPage;
