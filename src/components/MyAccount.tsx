import { useState } from "react";

const UserMetaDataItem = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  return (
    <div className="flex flex-col">
      <label className="font-semibold">{label}</label>
      <p>{value}</p>
    </div>
  );
};

const Input = ({ 
  label, 
  inputType, 
  id, 
  value, 
  onChange 
}: { 
  label: string; 
  inputType: string; 
  id: string;
  value: string;
  onChange: (id: string, value: string) => void;
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-semibold">{label}</label>
      <input 
        type={inputType} 
        id={id}
        value={value}
        onChange={(e) => onChange(id, e.target.value)} 
        className="bg-neutral-300 rounded-sm px-2" 
      />
    </div>
  );
};

const MyAccount = () => {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "XbH5y@example.com",
    group: "IT",
    role: "Admin",
  });

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [newEmail, setNewEmail] = useState("");

  const handleInputChange = (id: string, value: string) => {
    // Handle password changes
    if (id === "currentPassword" || id === "newPassword" || id === "confirmPassword") {
      setPasswords(prev => ({
        ...prev,
        [id]: value
      }));
    }
    // Handle email change
    else if (id === "newEmail") {
      setNewEmail(value);
    }
  };

  // Additional functions for form submissions
  const handlePasswordChange = () => {
    if (passwords.newPassword === passwords.confirmPassword) {
      console.log("Password change submitted");
      // Submit password change logic here
    } else {
      console.log("Passwords don't match");
    }
  };

  const handleEmailChange = () => {
    if (newEmail) {
      console.log("Email change submitted");
      // Submit email change logic here
      setUser(prev => ({
        ...prev,
        email: newEmail
      }));
      setNewEmail("");
    }
  };

  return (
    <div className="h-screen w-full p-4">    
      <div className="mx-auto my-0 w-1/2 h-min bg-neutral-200 rounded-sm p-6 flex flex-col gap-2 mt-[5vh]">
        <h4 className="font-semibold">User Details</h4>
        <hr className="pb-1" />
        <div id="userDetailsContainer" className="flex flex-wrap gap-6">
            <UserMetaDataItem label={"Name"} value={user.name} />
            <UserMetaDataItem label={"Email"} value={user.email} />
            <UserMetaDataItem label={"Group"} value={user.group} />
            <UserMetaDataItem label={"Role"} value={user.role} />
        </div>
        
        <h4 className="font-semibold">Change Password</h4>
        <hr className="pb-1" />
        <div id="changePasswordContainer" className="flex flex-wrap gap-6">
          <Input 
            label="Current Password" 
            inputType="password"
            id="currentPassword"
            value={passwords.currentPassword}
            onChange={handleInputChange}
          />
          <Input 
            label="New Password" 
            inputType="password"
            id="newPassword"
            value={passwords.newPassword}
            onChange={handleInputChange}
          />
          <Input 
            label="Confirm Password" 
            inputType="password"
            id="confirmPassword"
            value={passwords.confirmPassword}
            onChange={handleInputChange}
          />
        </div>
        <button 
            onClick={handlePasswordChange}
            className="mt-2 bg-neutral-700 text-white px-4 py-2 rounded"
          >
            Change My Password
          </button>
        <h4 className="font-semibold">Change Email</h4>
        <hr className="pb-1" />
        <div id="changeEmailContainer" className="flex gap-6">
          <Input 
            label="New Email" 
            inputType="email"
            id="newEmail"
            value={newEmail}
            onChange={handleInputChange}
          />
        </div>
        <button 
            onClick={handleEmailChange}
            className="mt-2 bg-neutral-700 text-white px-4 py-2 rounded h-10 text-nowrap"
          >
            Change My Email
          </button>
      </div>
    </div>
  );
};

export default MyAccount;