import {
  IconAlertTriangle,
  IconCheck,
  IconChevronLeft,
} from "@tabler/icons-react";
import { FormErrors, FormData } from "../../types/types";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link } from "react-router";
import { useToast } from "../../hooks/useToast"; // adjust path as needed
import { createNewUser } from "../../utils/actions";

const CreateUserForm = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    name: "",
    role: "user",
    group: "collections",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { message, setMessage, toastVisible } = useToast();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.name) {
      newErrors.name = "Name is required";
    }

    return newErrors;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);

      // Call the create function
      const response = await createNewUser(
        formData.email,
        formData.password,
        formData.name,
        formData.group,
        formData.role
      );

      if (!response) {
        setMessage({
          text: "Something went wrong. Please try again.",
          type: "error",
        });
        setIsSubmitting(false);
        return;
      }

      setTimeout(() => {
        setMessage({
          text: "User created successfully!",
          type: "success",
        });

        setFormData({
          email: "",
          password: "",
          name: "",
          role: "user",
          group: "collections",
        });

        setIsSubmitting(false);
      }, 1000);
    } else {
      setMessage({
        text: "Please fix the errors before submitting.",
        type: "error",
      });
    }
  };

  return (
    <div className="min-h-screen w-full p-4 flex items-start justify-center">
      <div className="w-full max-w-4xl bg-neutral-200 rounded-sm shadow-sm mt-[5vh] overflow-hidden">
        {/* Toast */}
        {message.text && (
          <div
            className={`fixed top-2 right-2 transition-opacity duration-300 ease-in-out ${
              toastVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className={`flex items-center gap-2 rounded-sm px-4 py-3 text-white shadow-md ${
                message.type === "error" ? "bg-red-700" : "bg-green-700"
              }`}
            >
              {message.type === "error" ? <IconAlertTriangle /> : <IconCheck />}
              <p>{message.text}</p>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="p-6 pb-2">
          <h3 className="font-semibold">Create New User</h3>
          <p className="text-sm text-neutral-600">
            Add a new user to the system
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Form Fields */}
            <div className="space-y-4">
              <h4 className="font-semibold text-lg mb-2">User Details</h4>
              <hr className="mb-4" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full p-2 border rounded-sm bg-neutral-300 ${
                      errors.email ? "border-red-500" : "border-neutral-300"
                    }`}
                  />
                  {errors.email && (
                    <span className="text-red-500 text-xs">{errors.email}</span>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full p-2 border rounded-sm bg-neutral-300 ${
                      errors.password ? "border-red-500" : "border-neutral-300"
                    }`}
                  />
                  {errors.password && (
                    <span className="text-red-500 text-xs">
                      {errors.password}
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full p-2 border rounded-sm bg-neutral-300 ${
                      errors.name ? "border-red-500" : "border-neutral-300"
                    }`}
                  />
                  {errors.name && (
                    <span className="text-red-500 text-xs">{errors.name}</span>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="role" className="block text-sm font-medium">
                    Role
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full p-2 border border-neutral-300 rounded-sm bg-neutral-300"
                  >
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="group" className="block text-sm font-medium">
                    Group
                  </label>
                  <select
                    id="group"
                    name="group"
                    value={formData.group}
                    onChange={handleChange}
                    className="w-full p-2 border border-neutral-300 rounded-sm bg-neutral-300"
                  >
                    <option value="Collections">Collections</option>
                    <option value="Accounting">Accounting</option>
                    <option value="Operations">Operations</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="Compliance">Compliance</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-8">
              <Link
                to="/admin/users"
                className="flex items-center text-neutral-600 hover:text-neutral-800"
              >
                <IconChevronLeft className="mr-1 h-4 w-4" />
                Back to Users
              </Link>

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-neutral-700 text-white rounded-sm px-4 py-2 hover:bg-neutral-800 transition-colors flex items-center disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateUserForm;
