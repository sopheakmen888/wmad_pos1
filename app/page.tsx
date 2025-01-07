"use client";

import { Button } from "@/components/ui/button";
import { signup, login, logout } from "./auth/auth";

export default function Home() {
  const handleRegister = async () => {
    const mockUsers = [
      { "username": "Vuthy", "email": "vuthy917@cambodia.com" },
      { "username": "Vuthy", "email": "vuthy269@mail.com" },
      { "username": "Sokchea", "email": "sokchea186@khmermail.com" },
      { "username": "Sophea", "email": "sophea915@cambodia.com" },
      { "username": "Kanha", "email": "kanha521@example.com" },
      { "username": "Kanha", "email": "kanha579@khmermail.com" },
      { "username": "Sophea", "email": "sophea909@cambodia.com" },
      { "username": "Sina", "email": "sina77@example.com" },
      { "username": "Sreyneang", "email": "sreyneang812@example.com" },
      { "username": "Sreyneang", "email": "sreyneang979@example.com" },
      { "username": "Sreyneang", "email": "sreyneang585@example.com" },
      { "username": "Sokha", "email": "sokha768@example.com" },
      { "username": "Socheata", "email": "socheata975@cambodia.com" },
      { "username": "Malis", "email": "malis164@mail.com" },
      { "username": "Sokha", "email": "sokha267@mail.com" }
    ]
      ;
    mockUsers.forEach(async (u) => {
      await signup(u.username, u.email, "12345678", 3);
      console.log("Register a new user", u.username, u.email);
    })
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
