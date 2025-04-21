import { IconPlus } from "@tabler/icons-react";
import { useState } from "react";

interface User {
  name: string
  email: string
  group: string
  role: string
}

const UsersTable = ({ users }: { users: User[] }) => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-neutral-300">
            <th className="text-left p-3 font-semibold">Name</th>
            <th className="text-left p-3 font-semibold">Email</th>
            <th className="text-left p-3 font-semibold">Group</th>
            <th className="text-left p-3 font-semibold">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index} className={`border-t border-neutral-300 hover:bg-neutral-300/50 transition-colors`}>
              <td className="p-3">{user.name}</td>
              <td className="p-3">{user.email}</td>
              <td className="p-3">{user.group}</td>
              <td className="p-3">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const Users = () => {
  // Fictitious user data
  const [users] = useState<User[]>([
    {
      name: "John Doe",
      email: "john.doe@example.com",
      group: "IT",
      role: "Admin",
    },
    {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      group: "HR",
      role: "Manager",
    },
    {
      name: "Robert Johnson",
      email: "robert.j@example.com",
      group: "Finance",
      role: "User",
    },
    {
      name: "Emily Davis",
      email: "emily.d@example.com",
      group: "Marketing",
      role: "Editor",
    },
    {
      name: "Michael Wilson",
      email: "michael.w@example.com",
      group: "IT",
      role: "Developer",
    },
    {
      name: "Sarah Brown",
      email: "sarah.b@example.com",
      group: "Sales",
      role: "User",
    },
  ])

  return (
    <div className="min-h-screen w-full p-4 flex items-start justify-center">
      <div className="w-full max-w-4xl bg-neutral-200 rounded-sm shadow-sm mt-[5vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 pb-2">
          <h3 className="font-semibold">Users</h3>
          <p className="text-sm text-neutral-600">View and manage system users</p>
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
  )
}

export default Users
