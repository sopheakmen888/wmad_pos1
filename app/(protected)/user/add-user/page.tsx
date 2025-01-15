"use client";
import React, { useState, useEffect } from "react";
import PageWrapper from "@/components/page-wrapper";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

interface Role {
  id: number;
  name: string;
}

const AddUserPage = () => {
  const { toast } = useToast();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roleId, setRoleId] = useState<number | undefined>();
  const [isActive, setIsActive] = useState(true);
  const [imageFile, setImageFile] = useState<File | undefined>();
  const [roles, setRoles] = useState<Role[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch("/api/user/role", { credentials: "same-origin" })
      .then((response) => response.json())
      .then((data) => setRoles(data.data))
      .catch((error) => console.error("Error fetching roles:", error));
  }, []);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!username) newErrors.username = "Username is required";
    if (!email || !/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Valid email is required";
    if (!password) newErrors.password = "Password is required";
    if (!roleId) newErrors.roleId = "Role is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    if (!validate()) {
      setIsLoading(false);
      return;
    }
    let imageUrl: string | null = "";
    if (imageFile) {
      const formData = new FormData();
      formData.append("file", imageFile);

      try {
        const uploadResponse = await fetch("/api/upload", {
          method: "POST",
          credentials: "same-origin",
          body: formData,
        });
        const uploadData = await uploadResponse.json();
        imageUrl = uploadData.secure_url
          ? uploadData.secure_url.toString()
          : null;
        console.log(uploadData, imageUrl);
        toast({
          title: "Success",
          description: "Cloudinary Upload.",
        });
      } catch (error) {
        console.error("Error uploading image:", error);
        setMessage("File upload failed");
        toast({
          title: "Falied",
          description: "Error uploading image.",
        });
        return;
      }
    }

    const userData = { username, email, password, roleId, isActive, imageUrl };

    try {
      const response = await fetch("/api/user", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      if (response.ok) {
        setMessage("User added successfully");
        toast({
          title: "Success",
          description: "New user added.",
        });
        router.back();
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message}`);
        toast({
          title: "Falied",
          description: `Error: ${errorData.message}`,
        });
      }
    } catch (error) {
      console.error("Error user creation:", error);
      setMessage("User creation failed");
      toast({
        title: "Falied",
        description: `User Creation.`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageWrapper>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Add User</h1>
        {message && <p>{message}</p>}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label htmlFor="username">Username</label>
              <input
                className="border p-1"
                type="text"
                name="username"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
              />
              {errors.username && (
                <p className="text-sm text-red-600">{errors.username}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="email">Email</label>
              <input
                className="border p-1"
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="password">Password</label>
              <input
                className="border p-1"
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
              {errors.password && (
                <p className="text-sm text-red-600">{errors.password}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="roleId">Role</label>
              <select
                className="border p-1"
                name="roleId"
                id="roleId"
                value={roleId}
                onChange={(e) => setRoleId(Number(e.target.value))}
              >
                <option value="">Select Role</option>
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </select>
              {errors.roleId && (
                <p className="text-sm text-red-600">{errors.roleId}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="isActive">Active</label>
              <input
                type="checkbox"
                name="isActive"
                id="isActive"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="imageFile">Profile Image</label>
              <input
                type="file"
                name="imageFile"
                id="imageFile"
                onChange={(e) => setImageFile(e.target.files?.[0])}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button className="bg-blue-500" type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save"}
            </Button>
            <Button
              variant="outline"
              type="button"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </PageWrapper>
  );
};

export default AddUserPage;
