"use client";

import React, { createContext, useState } from "react";

interface AppInfo {
  userId?: number;
  token?: string;
}

export const AppInfoContext = createContext<AppInfo>({
  userId: undefined,
  token: undefined,
});

const AppWrapper = ({
  children,
  appInfo,
}: Readonly<{
  children: React.ReactNode;
  appInfo: AppInfo;
}>) => {
  const [info] = useState<AppInfo>(appInfo);

  return (
    <AppInfoContext.Provider value={info}>{children}</AppInfoContext.Provider>
  );
};

export default AppWrapper;
