/* eslint-disable @typescript-eslint/no-unused-vars */
import TransactionFilter from "@/components/modules/TransactionFilter";
import { Card, CardContent } from "@/components/ui/card";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { useGetMyTransactionQuery } from "@/redux/features/transaction/transaction.api";
import LoadingSpinner from "@/utils/LoadingSpinner";
import { useState } from "react";
import { useSearchParams } from "react-router";



export default function TransactionHistory() {
  const [searchParams] = useSearchParams()
  const [currentPage, setCurrentPage] = useState(1)
  const [limit] = useState(10)

  const types = searchParams.get("types") || undefined;

  const { data: transactionsResponse, isLoading } = useGetMyTransactionQuery({ page: currentPage, limit, types })

  if (isLoading) {
    return <LoadingSpinner />
  }
  const transactions = transactionsResponse?.data || [];
  const meta = transactionsResponse?.meta;


  const totalPage = meta?.totalPage || 1;


  return (
    <div className="p-6 space-y-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
        <h1 className="text-2xl font-bold">Transaction History</h1>
        <div className="w-full md:w-1/3">
          <TransactionFilter />
        </div>
      </div>

      {!transactions || transactions.length === 0 ? (
        <p className="text-gray-500">No transactions found.</p>
      ) : (
        <div className="space-y-4">
          {transactions.map((tx) => (
            <Card key={tx._id} className="shadow-md rounded-xl border">
              <CardContent className="p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">{tx.types}</span>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${tx.status === "COMPLETED"
                      ? "bg-green-100 text-green-600"
                      : tx.status === "PENDING"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-red-100 text-red-600"
                      }`}
                  >
                    {tx.status}
                  </span>
                </div>

                <p className="text-lg font-bold">৳ {tx.amount.toLocaleString()}</p>
                <p className="text-sm text-gray-600">{tx.description}</p>

                <div className="flex md:justify-between text-xs text-gray-500 mt-2">
                  <span>ID: {tx._id}</span>
                  <span className="ml-1">{new Date(tx.createdAt).toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}


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
  );
}

