import Deposit from "@/pages/user/Deposit";
import SendMoney from "@/pages/user/SendMoney";
import WithDraw from "@/pages/user/WithDraw";
import type { ISidebarItem } from "@/types";


export const userSidebarItems : ISidebarItem[] =  [
    {
      title: "Dashboard",
      items: [
        {
          title: "Deposit Money",
          url: "/user/deposit",
          component: Deposit
        },
        {
          title: "Send Money",
          url: "/user/send-money",
          component: SendMoney
        },
        {
          title: "Withdraw Money",
          url: "/user/withdraw-money",
          component: WithDraw
        },
      ],
    },
  ]