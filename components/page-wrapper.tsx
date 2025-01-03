import React, { ReactNode, FC } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

const PageWrapper: FC<Props> = ({ children, className }) => {
  return (
    <main className={`flex-grow px-4 py-8 w-full ${className ?? ""}`}>
      {children}
    </main>
  );
};

export default PageWrapper;
