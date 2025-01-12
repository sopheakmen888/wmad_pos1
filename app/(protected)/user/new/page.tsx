"use client";

import { AppInfoContext } from "@/components/app-wrapper";
import PageWrapper from "@/components/page-wrapper";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React, { useContext, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserApiReqModel } from "@/models/api/userModel";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters." }),
  email: z.string().email("Email is invalid."),
  password: z
    .string()
    .min(6, { message: "Username must be at least 6 characters." }),
  isActive: z.boolean(),
  roleId: z.string(),
  file: z.any().optional(),
});

const NewUserPage = () => {
  const { toast } = useToast();
  const { userId, token } = useContext(AppInfoContext);
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [roles, setRoles] = useState<{ id: number; name: string }[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      email: "",
      isActive: true,
      file: null,
    },
  });

  useEffect(() => {
    const runAsync = async () => {
      await loadRole();
    };

    runAsync();
  }, []);

  const loadRole = async () => {
    const response = await fetch("/api/user/role", {
      credentials: "same-origin",
    });
    const data = await response.json();
    setRoles(data.data);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("file", values.file[0]);

      const res = await fetch("/api/upload", {
        credentials: "same-origin",
        method: "POST",
        body: formData,
      });

      if (res.status === 200) {
        toast({
          title: "Success",
          description: "Upload successfully.",
          variant: "success",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed upload.",
          variant: "error",
        });
      }

      console.log(res);

      // const data: UserApiReqModel = {
      //   username: values.username,
      //   password: values.password,
      //   email: values.email,
      //   roleId: parseInt(values.roleId),
      //   isActive: values.isActive,
      //   imageUrl: null,
      // };

      // const res = await fetch("/api/user", {
      //   credentials: "same-origin",
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(data),
      // });

      // if (res.status === 200) {
      //   toast({
      //     title: "Success",
      //     description: "Created a new user account successfully.",
      //     variant: "success",
      //   });
      // } else {
      //   toast({
      //     title: "Error",
      //     description: "Failed creating a new user account.",
      //     variant: "error",
      //   });
      // }

      // console.log(res);
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Something went wrong.",
        variant: "error",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <PageWrapper>
      <h1 className="text-3xl font-bold mb-4">New User</h1>
      <Card className="w-full bg-sidebar">
        <CardContent className="p-6 grid gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-8">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="Username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Email Address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Password"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="roleId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a role" />
                          </SelectTrigger>
                          <SelectContent>
                            {roles.map((item) => (
                              <SelectItem
                                key={item.id}
                                value={item.id.toString()}
                              >
                                {item.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="file"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Profile Image</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/png, image/jpeg"
                          onChange={(e) => field.onChange(e.target.files)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <FormControl>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            id="isActive"
                          />
                          <FormLabel htmlFor="isActive">Active</FormLabel>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex gap-2">
                <Button disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save"}
                </Button>
                <Button variant="outline" onClick={() => router.back()}>
                  Cancel
                </Button>
              </div>
            </form>
          </Form>

          {/* Username */}
          {/* Email */}
          {/* Password */}
          {/* Role */}
          {/* IsActive */}
          {/* ImageURL */}
        </CardContent>
      </Card>
    </PageWrapper>
  );
};

export default NewUserPage;
