"use client";
import React, { useState, useEffect } from "react";
import PageWrapper from "@/components/page-wrapper";
import { Button } from "@/components/ui/button";
import { useRouter, useParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { UserResponseModel } from "@/app/api/user/info/route";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Role {
  id: number;
  name: string;
}

const UserInfoPage = () => {
  const { toast } = useToast();
  const router = useRouter();
  const params = useParams<{ id: string }>();

  if (!params.id) router.back();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [roleId, setRoleId] = useState<number | undefined>();
  const [isActive, setIsActive] = useState(true);
  const [imageFile, setImageFile] = useState<File | undefined>();
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const [roles, setRoles] = useState<Role[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFirstLoaded, setIsFirstLoaded] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    setIsFirstLoaded(true);
    const fetchData = async () => {
      await fetchRoles();
      await fetchUser(parseInt(params.id));
    };

    fetchData().finally(() => setIsFirstLoaded(false));
  }, [params.id]);

  async function fetchRoles() {
    try {
      const response = await fetch("/api/user/role", {
        credentials: "same-origin",
      });
      const data = await response.json();
      setRoles(data.data);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  }

  async function fetchUser(id: number) {
    try {
      const response = await fetch(`/api/user/info?id=${id}`, {
        credentials: "same-origin",
      });
      const data = await response.json();
      const info = data.data as UserResponseModel;
      setUsername(info.username);
      setRoleId(info.roleId);
      setIsActive(info.isActive);
      setEmail(info.email);
      setImageUrl(info.imageUrl);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  }

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!username) newErrors.username = "Username is required";
    if (!email || !/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Valid email is required";
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

    const userData = {
      id: parseInt(params.id),
      username,
      email,
      roleId,
      isActive,
      imageUrl: imageUrl ? imageUrl : undefined,
    };

    try {
      const response = await fetch("/api/user/info", {
        method: "PUT",
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
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message}`);
        toast({
          title: "Falied",
          description: `Error: ${errorData.message}`,
        });
      }
    } catch (error) {
      console.error("Error user update:", error);
      setMessage("User update failed");
      toast({
        title: "Falied",
        description: `User Update.`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/user/info?id=${params.id}`, {
        method: "DELETE",
        credentials: "same-origin",
      });
      if (response.ok) {
        setMessage("User deleted successfully");
        toast({
          title: "Success",
          description: "User has been deleted.",
        });
        router.replace("/user");
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message}`);
        toast({
          title: "Falied",
          description: `Error: ${errorData.message}`,
        });
      }
    } catch (error) {
      console.error("Error user delete:", error);
      setMessage("User delete failed");
      toast({
        title: "Falied",
        description: `User Delete.`,
      });
    } finally {
      setIsLoading(false);
      setIsDialogOpen(false);
    }
  };

  return (
    <PageWrapper>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">User Info</h1>
        {message && <p>{message}</p>}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4">
            <div className="flex flex-col gap-4">
              {imageUrl && (
                <Image
                  loader={() => imageUrl || ""}
                  className="rounded-full shadow-md"
                  src={"https://null"}
                  alt={username}
                  onError={() => setImageUrl("https://github.com/shadcn.png")}
                  width={300}
                  height={300}
                />
              )}
              <label htmlFor="imageFile">Update Profile Image</label>
              <input
                type="file"
                name="imageFile"
                id="imageFile"
                onChange={(e) => {
                  const file = e.target.files?.[0];

                  if (file) {
                    setImageFile(file);
                    const imageUrl = URL.createObjectURL(file);
                    setImageUrl(imageUrl);
                  }
                }}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="username">Username</label>
              {isFirstLoaded ? (
                <Skeleton className="h-4 w-full" />
              ) : (
                <input
                  className="border p-1"
                  type="text"
                  name="username"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                />
              )}

              {errors.username && (
                <p className="text-sm text-red-600">{errors.username}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="email">Email</label>
              {isFirstLoaded ? (
                <Skeleton className="h-4 w-full" />
              ) : (
                <input
                  className="border p-1"
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
              )}
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="roleId">Role</label>
              {isFirstLoaded ? (
                <Skeleton className="h-4 w-full" />
              ) : (
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
              )}
              {errors.roleId && (
                <p className="text-sm text-red-600">{errors.roleId}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="isActive">Active</label>
              {isFirstLoaded ? (
                <Skeleton className="h-4 w-full" />
              ) : (
                <input
                  type="checkbox"
                  name="isActive"
                  id="isActive"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                />
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <Button className="bg-blue-500" type="submit" disabled={isLoading}>
              {isLoading ? "Updating..." : "Save"}
            </Button>
            {!isLoading && (
              <>
                <Button
                  type="button"
                  variant="destructive"
                  disabled={isLoading}
                  onClick={() => setIsDialogOpen(true)}
                >
                  Delete
                </Button>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger />
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Confirm Delete</DialogTitle>
                    </DialogHeader>
                    <p>
                      Are you sure you want to delete this item? This action
                      cannot be undone.
                    </p>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setIsDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button variant="destructive" onClick={handleDelete}>
                        Delete
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </>
            )}

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

export default UserInfoPage;
