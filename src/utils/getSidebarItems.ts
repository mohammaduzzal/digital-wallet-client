import { role } from "@/constant/role";
import { adminSidebarItems } from "@/routes/adminSidebarItems";
import { agentSidebarItems } from "@/routes/agentSidebarItems";
import { userSidebarItems } from "@/routes/userSidebarItems";
import type { IRole } from "@/types";

export const getSidebarItems = (userRole: IRole) => {
    switch (userRole) {
        case role.admin:
            return [...adminSidebarItems];
        case role.agent:
            return [...agentSidebarItems];
        case role.user:
            return [...userSidebarItems];

        default:
            return [];
    }
}