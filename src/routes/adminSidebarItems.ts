import AgentManagement from "@/pages/admin/AgentManagement";
import AllTransaction from "@/pages/admin/AllTransaction";
import UserManagement from "@/pages/admin/UserManagement";
import { Profile } from "@/pages/Profile";
import type { ISidebarItem } from "@/types";
import { lazy } from "react";

const Analytics = lazy(() => import("@/pages/admin/Analytics"))





export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Analytics",
        url: "/admin/analytics",
        component: Analytics
      },
       {
        title: "Transactions",
        url: "/admin/all-transaction",
        component: AllTransaction
      },
    ],
  },
  {
    title: "Management",
    items: [
      {
        title: "User Management",
        url: "/admin/user-management",
        component: UserManagement
      },
      {
        title: "Agent Management",
        url: "/admin/agent-management",
        component: AgentManagement
      },
      
    ],
  },
  {
    title: "Setting",
    items: [

      {
        title: "Profile",
        url: "/admin/profile",
        component: Profile
      },
      
    ],
  },
]