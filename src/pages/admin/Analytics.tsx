/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetTransactionStatsQuery, useGetUserStatsQuery } from "@/redux/features/stats/stats.api";
import LoadingSpinner from "@/utils/LoadingSpinner";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

const COLORS = ["#4CAF50", "#2196F3", "#FFC107", "#FF5722", "#9C27B0"];

export default function Analytics() {
  const { data: transactionStats, isLoading: isTransactionLoading } = useGetTransactionStatsQuery(undefined);
  const { data: userStats, isLoading: isUserLoading } = useGetUserStatsQuery(undefined);

  if (isTransactionLoading || isUserLoading) return <LoadingSpinner />;

  return (
    <div className="p-2 md:p-6 space-y-6">
      {/* Title */}
      <h2 className="text-2xl font-bold mb-4">📊 Admin Analytics Dashboard</h2>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Transactions</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-semibold">{transactionStats?.totalTransaction}</CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-semibold">{userStats?.totalUsers}</CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>New Users (Last 7 days)</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-semibold">{userStats?.newUserInLast7}</CardContent>
        </Card>
      </div>

      {/* Wallet Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Wallets</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl">{userStats?.totalWallet}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Active Wallets</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl text-green-600">{userStats?.totalActiveWallet}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Inactive Wallets</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl text-red-600">{userStats?.totalInActiveWallet}</CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
        {/* Transaction Types */}
        <Card>
          <CardHeader>
            <CardTitle>Transactions by Type</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={transactionStats?.transactionByTypes}
                  dataKey="count"
                  nameKey="_id"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {transactionStats?.transactionByTypes?.map((_: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Users by Role */}
        <Card>
          <CardHeader>
            <CardTitle>Users by Role</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={userStats?.usersByRole}
                  dataKey="count"
                  nameKey="_id"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {userStats?.usersByRole?.map((_: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
