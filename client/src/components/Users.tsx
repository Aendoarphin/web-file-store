import {
  IconLoader2,
  IconPencil,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { listAllUsers } from "../utils/actions";
import { User } from "@supabase/supabase-js";
import { Link } from "react-router";

const UserActions = ({ user }: { user: User }) => {
  const encodedData = {
    name: encodeURIComponent(user.user_metadata.name),
    email: encodeURIComponent(user.email as string),
    group: encodeURIComponent(user.user_metadata.group),
    role: encodeURIComponent(user.user_metadata.role),
  };
  return (
    <div className="w-min flex flex-nowrap mx-auto">
      <Link
        to={`/admin/edit-user?email=${encodedData.email}&name=${encodedData.name}&group=${encodedData.group}&role=${encodedData.role}`}
        className="px-2 py-1 rounded-sm hover:scale-90"
        title="Edit user"
        onClick={() => {}}
      >
        <IconPencil />
      </Link>
      <button
        className="px-2 py-1 rounded-sm hover:scale-90 text-red-600"
        title="Delete user"
      >
        <IconTrash />
      </button>
    </div>
  );
};

const UsersTable = ({ users }: { users: User[] }) => {
  if (users.length === 0)
    return (
      <div className="py-20">
        <IconLoader2 className="animate-spin mx-auto" />
      </div>
    );

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-neutral-300">
            <th className="text-left p-3 font-semibold">Name</th>
            <th className="text-left p-3 font-semibold">Email</th>
            <th className="text-left p-3 font-semibold">Group</th>
            <th className="text-left p-3 font-semibold">Role</th>
            <th className="text-center p-3 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr
              key={index}
              className={`border-t border-neutral-300 even:bg-neutral-300 transition-colors`}
            >
              <td className="p-3">{user.user_metadata.name}</td>
              <td className="p-3">{user.email}</td>
              <td className="p-3">{user.user_metadata.group}</td>
              <td className="p-3">{user.user_metadata.role}</td>
              <td className="p-3">
                <UserActions user={user} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Users = () => {
  // User data
  const [users, setusers] = useState<User[]>([]);

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const allUsers = await listAllUsers();
        setusers(allUsers);
      } catch (error) {
        console.error(error);
      }
    };

    getAllUsers();
  }, []);

  return (
    <div className="min-h-screen w-full p-4 flex items-start justify-center">
      <div className="w-full max-w-4xl bg-neutral-200 rounded-sm shadow-sm mt-[5vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 pb-2">
          <h3 className="font-semibold">Users</h3>
          <p className="text-sm text-neutral-600">
            View and manage system users
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Users Table Section */}
          <div>
            <h4 className="font-semibold text-lg mb-2">User List</h4>
            <hr className="mb-4" />
            <UsersTable users={users} />
          </div>

          {/* Action Button */}
          <div>
            <button className="bg-neutral-700 text-white rounded-sm px-4 py-2 hover:bg-neutral-800 transition-colors">
              <IconPlus className="inline" /> Add New User
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
