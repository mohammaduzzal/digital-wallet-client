import CashIn from "@/pages/agent/CashIn";
import CashOut from "@/pages/agent/CashOut";
import { Profile } from "@/pages/Profile";
import TransactionHistory from "@/pages/TransactionHistory";
import type { ISidebarItem } from "@/types";


export const agentSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Cash in",
        url: "/agent/cash-in",
        component: CashIn
      },
      {
        title: "Cash out",
        url: "/agent/cash-out",
        component: CashOut
      },
    ],
  },
  {
    title: "Transaction History",
    items: [
      {
        title: "History",
        url: "/agent/history",
        component: TransactionHistory
      },
    ]
  },
  {
    title: "Setting",
    items: [
      {
        title: "Profile",
        url: "/agent/profile",
        component: Profile
      },
    ]
  },
]