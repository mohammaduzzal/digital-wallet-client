import CashIn from "@/pages/agent/CashIn";
import CashOut from "@/pages/agent/CashOut";
import type { ISidebarItem } from "@/types";


export const agentSidebarItems : ISidebarItem[] =  [
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
  ]