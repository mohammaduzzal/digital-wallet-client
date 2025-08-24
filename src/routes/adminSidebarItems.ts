import AllTransaction from "@/pages/admin/AllTransaction";
import { Profile } from "@/pages/Profile";
import type { ISidebarItem } from "@/types";
import { lazy } from "react";

const Analytics = lazy(() => import("@/pages/admin/Analytics"))





export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "analytics",
        url: "/admin/analytics",
        component: Analytics
      },
      {
        title: "Profile",
        url: "/admin/profile",
        component: Profile
      },
    ],
  },
  {
    title: "Transaction-management",
    items: [

      {
        title: "All Transaction",
        url: "/admin/all-transaction",
        component: AllTransaction
      },
      
    ],
  },
]