"use client";

import { Button } from "@/components/ui/button";
import { signup, login, logout } from "./auth/auth";

export default function Home() {
  const handleRegister = async () => {
    await signup("admin", "admin@demo.com", "12345678", 1);
    console.log("Register a new user...");
  };

  const handleLogin = async () => {
    await login("admin@demo.com", "12345678");
    console.log("Login a user...");
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="flex flex-col gap-4">
      <Button onClick={handleRegister}>Register</Button>
      <Button onClick={handleLogin}>Login</Button>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
}
