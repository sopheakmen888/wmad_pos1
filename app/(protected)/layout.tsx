import React from "react";
import { cookies } from "next/headers";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Footer from "@/components/footer";
import Header from "@/components/header";

const Layout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <section className="h-screen flex flex-col w-full">
        <nav className="w-full flex items-center border-b ">
          <SidebarTrigger className="ml-4 bg-red-100" />
          <Header />
        </nav>
        {children}
        <Footer />
      </section>
    </SidebarProvider>
  );
};

export default Layout;
