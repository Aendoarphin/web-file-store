import { IconCheck } from "@tabler/icons-react";
import { useState, useEffect } from "react";
import supabaseAdmin from "../utils/supabase-admin";

interface MessageType {
  text: string;
  type: "success" | "error" | null;
}

const UserMetaDataItem = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  return (
    <div className="space-y-1">
      <label className="font-semibold">{label}</label>
      <p className="text-sm">{value}</p>
    </div>
  );
};

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
}) => {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="font-semibold">
        {label}
      </label>
      <input
        type="password"
        id={id}
        value={value}
        onChange={(e) => onChange(id, e.target.value)}
        className="w-full bg-neutral-300 rounded-sm px-3 py-1 focus:outline-none focus:ring-1 focus:ring-neutral-400"
      />
    </div>
  );
};

const MyAccount = () => {
  const [user] = useState({
    name: "John Doe",
    email: "XbH5y@example.com",
    group: "IT",
    role: "Admin",
  });

  const [passwords, setPasswords] = useState({
    newPassword: "",
    confirmedNewPassword: "",
  });

  const [message, setMessage] = useState<MessageType>({
    text: "",
    type: null,
  });

  // Add visible state to control toast animation
  const [toastVisible, setToastVisible] = useState(false);

  // Watch for message changes to trigger animation
  useEffect(() => {
    if (message.text) {
      setToastVisible(true);

      const timer = setTimeout(() => {
        setToastVisible(false);

        const clearTimer = setTimeout(() => {
          setMessage({ text: "", type: null });
        }, 300);

        return () => clearTimeout(clearTimer);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleInputChange = (id: string, value: string) => {
    if (id === "newPassword" || id === "confirmedNewPassword") {
      setPasswords((prev) => ({
        ...prev,
        [id]: value,
      }));
    }
  };

  const handlePasswordChangeSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();

      const newPwInput = document.getElementById(
        "newPassword"
      ) as HTMLInputElement;
      const confirmedPwInput = document.getElementById(
        "confirmedNewPassword"
      ) as HTMLInputElement;

      newPwInput.classList.remove("border", "border-red-500");
      confirmedPwInput.classList.remove("border", "border-red-500");

      if (passwords.newPassword !== passwords.confirmedNewPassword) {
        setMessage({
          text: "Passwords do not match.",
          type: "error",
        });
        newPwInput.classList.add("border", "border-red-500");
        confirmedPwInput.classList.add("border", "border-red-500");
        newPwInput.focus();
        confirmedPwInput.focus();
        return;
      }
      if (
        passwords.newPassword === "" ||
        passwords.confirmedNewPassword === ""
      ) {
        setMessage({
          text: "Please enter a password.",
          type: "error",
        });
        const newPwInput = document.getElementById(
          "newPassword"
        ) as HTMLInputElement;
        const confirmedPwInput = document.getElementById(
          "confirmedNewPassword"
        ) as HTMLInputElement;
        newPwInput.classList.add("border", "border-red-500");
        confirmedPwInput.classList.add("border", "border-red-500");
        newPwInput.focus();
        confirmedPwInput.focus();
        return;
      }

      // Supabase side logic
      const {
        data: { users },
      } = await supabaseAdmin.auth.admin.listUsers();
      const currentUserId: string = JSON.parse(localStorage.getItem("sbuser")!)
        .user.id;

      if (users.find((user) => user.id === currentUserId)?.id) {
        const { error } = await supabaseAdmin.auth.admin.updateUserById(
          currentUserId,
          { password: passwords.confirmedNewPassword }
        );

        if (error) {
          setMessage({ text: error.message, type: "error" });
          return;
        }
      }

      // Show success message
      setMessage({
        text: "Password has been changed successfully.",
        type: "success",
      });
    } catch (error) {
      console.log(error);
    }
    setPasswords({ newPassword: "", confirmedNewPassword: "" });
  };

  return (
    <div className="min-h-screen w-full p-4 flex items-start justify-center">
      <div className="w-full max-w-2xl bg-neutral-200 rounded-sm shadow-sm mt-[5vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 pb-2">
          <h3 className="font-semibold">My Account</h3>
          <p className="text-sm text-neutral-600">
            View and manage your account details
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* User Details Section */}
          <div>
            <h4 className="font-semibold text-lg mb-2">User Details</h4>
            <hr className="mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <UserMetaDataItem label="Name" value={user.name} />
              <UserMetaDataItem label="Email" value={user.email} />
              <UserMetaDataItem label="Group" value={user.group} />
              <UserMetaDataItem label="Role" value={user.role} />
            </div>
          </div>

          {/* Change Password Section */}
          <div>
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
                value="Change Password"
                type="submit"
                className="bg-neutral-700 text-white rounded-sm px-4 py-2 hover:bg-neutral-800 transition-colors"
              />
            </form>
          </div>
        </div>
      </div>

      {/* Toast Notification - Keep in DOM but control opacity with toastVisible */}
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

export default MyAccount;
