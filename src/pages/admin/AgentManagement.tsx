import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useGetAllUserQuery, useUpdateUserMutation } from "@/redux/features/auth/auth.api";

import LoadingSpinner from "@/utils/LoadingSpinner";
import { useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"


export default function AgentManagement() {
  const [currentPage, setCurrentPage] = useState(1)
  const [limit] = useState(10)

  const { data: allUserData, isLoading: allUserLoading } = useGetAllUserQuery({ role: "AGENT", page: currentPage, limit })

  const [updateAgent] = useUpdateUserMutation()



  const handleAgentUpdate = async (walletId: string, isBlocked: boolean) => {

    const toastId = toast.loading(isBlocked ? "Unblocking..." : "Blocking...");
    try {
      const payload = { isBlocked: !isBlocked }


      const res = await updateAgent({ walletId, payload }).unwrap()
      if (res.success) {
        toast.success(isBlocked ? "Agent Unblocked successfully" : "Agent Blocked successfully", { id: toastId });
      }

    } catch (error) {
      console.error(error)
      toast.error("Failed to update agent status.", { id: toastId });
    }

  }


  const handleApproveSuspend = async (userId: string, isApproved: boolean) => {

    const toastId = toast.loading(isApproved ? "Unblocking..." : "Blocking...");
    try {
      const payload = { isApproved: !isApproved }


      const res = await updateAgent({ userId, payload }).unwrap()
      if (res.success) {
        toast.success(isApproved ? "Agent Unblocked successfully" : "Agent Blocked successfully", { id: toastId });
      }

    } catch (error) {
      console.error(error)
      toast.error("Failed to update agent status.", { id: toastId });
    }

  }

  const totalPage = allUserData?.meta?.totalPage || 1;

  if (allUserLoading) return <LoadingSpinner />


  return (
    <div className="w-full max-w-7xl mx-auto px-5">
      <div className="flex justify-between my-5">
        <h1 className="text-xl font-semibold">Agent Management</h1>
      </div>

      <div className="border border-muted rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Name</TableHead>
              <TableHead className="text-center">Approval</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Action</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allUserData?.data?.map((item: {
              name: string,
              isApproved: boolean, _id: string, wallet: { isBlocked: boolean, _id: string }
            }) => (
              <TableRow>
                <TableCell className="font-medium w-full"><Link to={`/admin/agent-management/${item._id}`}>{item.name}</Link></TableCell>

                   <TableCell className="text-center">
                  <span className={cn(
                    "px-2 py-1 rounded-md  font-medium",
                    {
                      "text-blue-500": item?.isApproved, // Blocked
                      "text-red-500": !item?.isApproved, // Active
                    }
                  )}>
                    {item?.isApproved === true ? "approved" : "pending"}
                  </span>
                </TableCell>

                <TableCell className="text-center">
                  <span className={cn(
                    "px-2 py-1 rounded-md  font-medium",
                    {
                      "text-red-500": item?.wallet?.isBlocked, // Blocked
                      "text-blue-500": !item?.wallet?.isBlocked, // Active
                    }
                  )}>
                    {item?.wallet?.isBlocked === true ? "Blocked" : "Active"}
                  </span>
                </TableCell>

                {item?.wallet?.isBlocked === true && <TableCell><Button onClick={() => handleAgentUpdate(item.wallet._id, item.wallet.isBlocked)} variant="outline">Unblock</Button></TableCell>}

                {item?.wallet?.isBlocked === false && <TableCell><Button onClick={() => handleAgentUpdate(item.wallet._id, item.wallet.isBlocked)} variant="outline">Block</Button></TableCell>}

                {item?.isApproved === true && <TableCell><Button onClick={() => handleApproveSuspend(item._id, item.isApproved)} variant="outline">Approve</Button></TableCell>}

                {item?.isApproved === false && <TableCell><Button onClick={() => handleApproveSuspend(item._id, item.isApproved)} variant="outline">Suspend</Button></TableCell>}

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {totalPage > 1 && <div className="flex justify-end mt-4">
        <div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious onClick={() => setCurrentPage(pre => pre - 1)}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
              {
                Array.from({ length: totalPage }, (_, idx) => idx + 1).map((page) => (
                  <PaginationItem key={page} onClick={() => setCurrentPage(page)}>
                    <PaginationLink isActive={currentPage === page}>{page}</PaginationLink>
                  </PaginationItem>
                ))
              }
              <PaginationItem>
                <PaginationNext onClick={() => setCurrentPage(pre => pre + 1)}
                  className={currentPage === totalPage ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>}
    </div>
  )
}

