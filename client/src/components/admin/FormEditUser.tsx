import { IconArrowLeft, IconDeviceFloppy, IconCheck } from "@tabler/icons-react";
import { Link, useSearchParams } from "react-router";
import { useState } from "react";
import { updateUserMetadata } from "../../utils/actions";
import { useToast } from "../../hooks/useToast";

const FormEditUser = () => {
  const [searchParams] = useSearchParams();
  const [name, setName] = useState(searchParams.get("name"));
  const [email, setEmail] = useState(searchParams.get("email"));
  const [group, setGroup] = useState(searchParams.get("group"));
  const [role, setRole] = useState(searchParams.get("role"));
  const [userId] = useState(searchParams.get("userId"));

  const { message, setMessage, toastVisible } = useToast();

  const handleEditUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await updateUserMetadata(userId, name, email, role, group);

      if (result?.error) {
        setMessage({ text: result.error, type: "error" });
      } else {
        setMessage({ text: "User updated successfully.", type: "success" });
      }
    } catch (err: any) {
      console.error(err);
      setMessage({ text: "An unexpected error occurred.", type: "error" });
    }
  };

  return (
    <div className="min-h-screen w-full p-4 flex items-start justify-center">
      <div className="w-full max-w-4xl bg-neutral-200 rounded-sm shadow-sm mt-[5vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 pb-2">
          <h3 className="font-semibold">Edit User</h3>
          <p className="text-sm text-neutral-600">Update user information</p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <form id="edit-user-form" onSubmit={handleEditUserSubmit}>
            <div className="space-y-4">
              <h4 className="font-semibold text-lg mb-2">User Details</h4>
              <hr className="mb-4" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium">Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    defaultValue={name ?? ""}
                    className="w-full p-2 border border-neutral-300 rounded-sm bg-neutral-300"
                    required
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    defaultValue={email ?? ""}
                    className="w-full p-2 border border-neutral-300 rounded-sm bg-neutral-300"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="group" className="block text-sm font-medium">Group</label>
                  <select
                    name="group"
                    id="group"
                    defaultValue={group ?? ""}
                    className="w-full p-2 border border-neutral-300 rounded-sm bg-neutral-300"
                    onChange={(e) => setGroup(e.target.value)}
                  >
                    <option value="IT">IT</option>
                    <option value="Accounting">Accounting</option>
                    <option value="Collections">Collections</option>
                    <option value="Operations">Operations</option>
                    <option value="Compliance">Compliance</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="role" className="block text-sm font-medium">Role</label>
                  <select
                    name="role"
                    id="role"
                    defaultValue={role ?? ""}
                    className="w-full p-2 border border-neutral-300 rounded-sm bg-neutral-300"
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="Admin">Admin</option>
                    <option value="User">User</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-8">
              <Link
                to="/admin/users"
                className="flex items-center text-neutral-600 hover:text-neutral-800"
              >
                <IconArrowLeft className="mr-1 h-4 w-4" />
                Back to Users
              </Link>

              <button
                type="submit"
                className="bg-neutral-700 text-white rounded-sm px-4 py-2 hover:bg-neutral-800 transition-colors flex items-center"
              >
                <IconDeviceFloppy className="mr-2 h-4 w-4" />
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Toast Notification */}
      {message.text && (
        <div
          className={`fixed top-2 right-2 transition-opacity duration-300 ease-in-out ${
            toastVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className={`flex items-center gap-2 rounded-sm px-4 py-3 text-white shadow-md ${
              message.type === "error" ? "bg-red-500" : "bg-green-700"
            }`}
          >
            <IconCheck />
            <p>{message.text}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormEditUser;
