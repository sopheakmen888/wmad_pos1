"use client";

import { AppInfoContext } from "@/components/app-wrapper";
import React, { useContext, useEffect } from "react";

const NewUserPage = () => {
  const { userId, token } = useContext(AppInfoContext);
  console.log("New User Page...", userId, token);

  useEffect(() => {
    fetch("/api/user/new", { credentials: "same-origin" }).then((res) =>
      console.log(res)
    );
  }, []);

  return <div>NewUserPage </div>;
};

export default NewUserPage;
