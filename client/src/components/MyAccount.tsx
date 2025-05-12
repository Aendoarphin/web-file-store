import { IconCheck, IconAlertTriangle } from "@tabler/icons-react";
import { useState } from "react";
import { listAllUsers, updateUserPassword } from "../utils/actions";
import { User } from "@supabase/supabase-js";
import { useToast } from "../hooks/useToast";

// UI components
const UserMetaDataItem = ({ label, value }: { label: string; value: string }) => (
  <div className="space-y-1">
    <label className="font-semibold">{label}</label>
    <p className="text-sm">{value}</p>
  </div>
);

const PasswordInput = ({
  label,
  id,
  value,
  onChange,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (id: string, value: string) => void;
}) => (
  <div className="space-y-2">
    <label htmlFor={id} className="font-semibold">{label}</label>
    <input
      type="password"
      id={id}
      value={value}
      onChange={(e) => onChange(id, e.target.value)}
      className="w-full bg-neutral-300 rounded-sm px-3 py-1 focus:outline-none focus:ring-1 focus:ring-neutral-400"
    />
  </div>
);

// Main component
const MyAccount = () => {
  const [user] = useState(JSON.parse(localStorage.getItem("sbuser")!).user);
  const [passwords, setPasswords] = useState({ newPassword: "", confirmedNewPassword: "" });
  const { message, setMessage, toastVisible } = useToast();

  const handleInputChange = (id: string, value: string) => {
    setPasswords((prev) => ({ ...prev, [id]: value }));
  };

  const showInputError = (...ids: string[]) => {
    ids.forEach((id) => {
      const input = document.getElementById(id);
      input?.classList.add("border", "border-red-500");
    });
  };

  const validatePassword = () => {
    const { newPassword, confirmedNewPassword } = passwords;

    const pattern = /^(?=.*[A-Z])(?=.*[^a-zA-Z0-9\s])[\S]{6,}$/;

    if (!newPassword && !confirmedNewPassword) {
      setMessage({ text: "Please enter a password.", type: "error" });
      showInputError("newPassword", "confirmedNewPassword");
      return false;
    }

    if (newPassword !== confirmedNewPassword ) {
      setMessage({ text: "Passwords do not match.", type: "error" });
      showInputError("newPassword", "confirmedNewPassword");
      return false;
    }

    if (!pattern.test(confirmedNewPassword)) {
      setMessage({
        text: "Password must be at least 6 characters long, contain at least one uppercase letter and one special character.",
        type: "error",
      });
      showInputError("newPassword", "confirmedNewPassword");
      return false;
    }

    return true;
  };

  const handlePasswordChangeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset input borders
    ["newPassword", "confirmedNewPassword"].forEach((id) =>
      document.getElementById(id)?.classList.remove("border", "border-red-500")
    );

    if (!validatePassword()) return;

    try {
      const users = await listAllUsers();
      const currentUser = users.find((u: User) => u.id === user.id);

      if (!currentUser) throw new Error("User not found.");

      const response = await updateUserPassword(user.id, passwords.confirmedNewPassword);

      if (response?.error) {
        setMessage({ text: response.error, type: "error" });
        return;
      }

      setMessage({ text: "Password has been changed successfully.", type: "success" });
      setPasswords({ newPassword: "", confirmedNewPassword: "" });
    } catch (error) {
      console.error(error);
      setMessage({ text: "An unexpected error occurred.", type: "error" });
    }
  };

  return (
    <div className="min-h-screen w-full p-4 flex items-start justify-center">
      <div className="w-full max-w-2xl bg-neutral-200 rounded-sm shadow-sm mt-[5vh] overflow-hidden">
        <div className="p-6 pb-2">
          <h3 className="font-semibold">My Account</h3>
          <p className="text-sm text-neutral-600">View and manage your account details</p>
        </div>

        <div className="p-6 space-y-6">
          <section>
            <h4 className="font-semibold text-lg mb-2">User Details</h4>
            <hr className="mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <UserMetaDataItem label="Name" value={user.user_metadata.name} />
              <UserMetaDataItem label="Email" value={user.user_metadata.email} />
              <UserMetaDataItem label="Group" value={user.user_metadata.group.charAt(0).toUpperCase() + user.user_metadata.group.slice(1)} />
              <UserMetaDataItem label="Role" value={user.user_metadata.role} />
            </div>
          </section>

          <section>
            <h4 className="font-semibold text-lg mb-2">Change Password</h4>
            <hr className="mb-4" />
            <form onSubmit={handlePasswordChangeSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <PasswordInput
                  label="New Password"
                  id="newPassword"
                  value={passwords.newPassword}
                  onChange={handleInputChange}
                />
                <PasswordInput
                  label="Confirm Password"
                  id="confirmedNewPassword"
                  value={passwords.confirmedNewPassword}
                  onChange={handleInputChange}
                />
              </div>
              <input
                type="submit"
                value="Change Password"
                className="bg-neutral-700 text-white rounded-sm px-4 py-2 hover:bg-neutral-800 transition-colors"
              />
            </form>
          </section>
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
            {message.type === "error" ? <IconAlertTriangle /> : <IconCheck />}
            <p>{message.text}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAccount;
