import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { useGetMyWalletQuery } from "@/redux/features/wallet/wallet.api";
import { Skeleton } from "@/components/ui/skeleton";
import { UpdateProfileModal } from "@/components/modules/UpdateProfileModal";
import { ChangePasswordModal } from "@/components/modules/ChangePasswordModal";

export function Profile() {
  const { data: userData, isLoading: isUserLoading } = useUserInfoQuery(undefined);
  const { data: walletData, isLoading: isWalletLoading } = useGetMyWalletQuery(undefined);

  if (isUserLoading || isWalletLoading) {
    return (
      <div className="flex flex-col items-center my-5 min-h-screen">
        <Card className="w-full max-w-lg">
          <CardHeader>
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  const user = userData?.data;
  const wallet = walletData?.data;

  if (!user || !wallet) {
    return (
      <div className="flex flex-col items-center my-5 min-h-screen">
        <Card className="w-full max-w-lg text-center p-6">
          <p>No user or wallet data found. Please log in.</p>
        </Card>
      </div>
    );
  }

  // Determine badge style for approval status
  const approvalStatus = user?.isApproved ? "Approved" : "Pending";
  const approvalVariant = user?.isApproved ? "default" : "destructive";

  return (
    <div className="flex flex-col items-center my-5 min-h-screen">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">{user.name}</CardTitle>
          <CardDescription>
            <div className="flex flex-col items-center justify-center">
                <p>{user.email}</p>
                <p>{user.phoneNumber}</p>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-sm text-muted-foreground">Role</p>
              <p className="font-semibold text-lg">{user.role}</p>
            </div>
            {user.role === "AGENT" && (
              <>
                <div>
                  <p className="text-sm text-muted-foreground">Approval Status</p>
                  <Badge variant={approvalVariant} className="font-semibold text-base mt-1">
                    {approvalStatus}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Commission Rate</p>
                  <p className="font-semibold text-lg">{user.commissionRate * 100}%</p>
                </div>
              </>
            )}
          </div>
          
          {user.role !== "ADMIN" &&  <div className="border rounded-lg p-6 bg-muted shadow-sm">
            <h3 className="text-lg font-semibold mb-3">Wallet Details</h3>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-sm text-muted-foreground">Current Balance</p>
                <p className="font-bold text-2xl mt-1">{wallet.balance} <span className="text-lg font-normal">{wallet.currency}</span></p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <p className="font-semibold text-lg mt-1">{wallet.isBlocked ? "Blocked" : "Active"}</p>
              </div>
            </div>
          </div>}
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <ChangePasswordModal/>
          <UpdateProfileModal/>
        </CardFooter>
      </Card>
    </div>
  );
}