import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { role } from "@/constant/role";
import About from "@/pages/About";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import type { IRole } from "@/types";
import { withAuth } from "@/utils/withAuth";
import { adminSidebarItems } from "./adminSidebarItems";
import { generateRoutes } from "@/utils/generateRoutes";
import { agentSidebarItems } from "./agentSidebarItems";
import { userSidebarItems } from "./userSidebarItems";
import { createBrowserRouter } from "react-router";
import UnAuthorized from "@/pages/UnAuthorized";
import NotFound from "@/pages/NotFound";
import HomePage from "@/pages/HomePage";
import Feature from "@/pages/Feature";
import FAQ from "@/pages/FAQ";
import Contact from "@/pages/Contact";
import AgentDetails from "@/components/modules/admin/AgentDetails";
import UserDetails from "@/components/modules/admin/UserDetails";

export const router = createBrowserRouter([
    {
        Component: App,
        path: "/",
        children: [
            {
                Component: HomePage,
                index: true
            },
            {
                Component: About,
                path: "about"
            },
            {
                Component: Feature,
                path: "feature"
            },
            {
                Component: FAQ,
                path: "faq"
            },
            {
                Component: Contact,
                path: "contact"
            },
        ]
    },
    {
        Component: withAuth(DashboardLayout, role.admin as IRole),
        path: "/admin",
        children: [
            {
                index: true, 
                Component: adminSidebarItems[0].items[0].component, 
            },
            ...generateRoutes(adminSidebarItems),
            {

                path: "agent-management/:agentId",
                Component: AgentDetails
            },
            {

                path: "user-management/:userId",
                Component: UserDetails
            },
        ]
    },
    {
        Component: withAuth(DashboardLayout, role.agent as IRole),
        path: "/agent",
        children: [
            {
                index: true, 
                Component: agentSidebarItems[0].items[0].component, 
            },
            ...generateRoutes(agentSidebarItems)
        ]
    },
    {
        Component: withAuth(DashboardLayout, role.user as IRole),
        path: "/user",
        children: [
            {
                index: true, 
                Component: userSidebarItems[0].items[0].component, 
            },
            ...generateRoutes(userSidebarItems)
        ]
    },
    {
        Component: Login,
        path: "/login"
    },
    {
        Component: Register,
        path: "/register"
    },
    {
        Component: UnAuthorized,
        path: "/unAuthorized"
    },
    {
        Component: NotFound,
        path: "*"
    }
]);