import {
  LayoutDashboard,
  ShoppingCart,
  Settings,
  PackagePlus,
  Users,
  User2,
  BadgePercent,
  BadgeDollarSign,
} from "lucide-react";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";

const homeMenus = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
];

const items = [
  {
    title: "Users",
    url: "/user",
    icon: User2,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

const saleManagementMenus = [
  {
    title: "Customer",
    url: "#",
    icon: Users,
  },
  {
    title: "Promotion",
    url: "/promotion",
    icon: BadgePercent,
  },
  {
    title: "Product Pricing",
    url: "#",
    icon: BadgeDollarSign,
  },
  {
    title: "Sale Item Master",
    url: "/pos",
    icon: BadgeDollarSign,
  },
];

const stockManagementMenus = [
  {
    title: "Product",
    url: "/product",
    icon: ShoppingCart,
  },
  {
    title: "Supplier",
    url: "#",
    icon: PackagePlus,
  },
  {
    title: "Purchase Item Master",
    url: "/stockin",
    icon: PackagePlus,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Home</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {homeMenus.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
          <Separator className="h-[1rem]" />
          <SidebarGroupLabel>Stock Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {stockManagementMenus.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
          <Separator className="h-[1rem]" />
          <SidebarGroupLabel>Sale Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {saleManagementMenus.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
          <Separator className="h-[1rem]" />
          <SidebarGroupLabel>Admin</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
