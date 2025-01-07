"use client";

import React, { useState } from "react";

interface UserModel {
  id: number;
  username: string;
  email: string;
  imageUrl?: string;
  isActive: boolean;
  role: string;
}

const UserPage = () => {
  const [users, setUsers] = useState<UserModel[]>([]);

  return <div>UserPage</div>;
};

export default UserPage;
