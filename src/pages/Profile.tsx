
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
import { Skeleton } from "@/components/ui/skeleton";
import { UpdateProfileModal } from "@/components/modules/UpdateProfileModal";
import { ChangePasswordModal } from "@/components/modules/ChangePasswordModal";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";

export function Profile() {
  const { data: userData, isLoading: isUserLoading } = useUserInfoQuery(undefined);




  if (isUserLoading) {
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



  if (!user) {
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
    <div className="profile flex flex-col items-center my-5 min-h-screen">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <div className="flex justify-center items-center ">
            <Avatar className="h-20 w-20">
              <AvatarFallback>
                {user.name?.charAt(0).toUpperCase() || "A"}
              </AvatarFallback>
            </Avatar>
          </div>
          <CardTitle className="text-3xl">{user.name}</CardTitle>
          <div className="flex justify-center items-center text-center">
            <p className="text-sm text-muted-foreground">Role :</p>
            <p className="text-sm text-muted-foreground ml-1"> {user.role}</p>
          </div>
          <CardDescription>
            <div className="flex flex-col items-center justify-center">
              <p>{user.email}</p>
              <p>{user.phoneNumber}</p>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4 text-center">

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

          {user.role !== "ADMIN" && <div className="border rounded-lg p-6 bg-muted shadow-sm">
            <h3 className="text-lg font-semibold mb-3">Wallet Details</h3>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-sm text-muted-foreground">Current Balance</p>
                <p className="font-bold text-2xl mt-1">{user?.wallet?.balance} <span className="text-lg font-normal">{user?.wallet?.currency}</span></p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <p className="font-semibold text-lg mt-1">{user?.wallet?.isBlocked ? "Blocked" : "Active"}</p>
              </div>
            </div>
          </div>}
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <ChangePasswordModal />
          <UpdateProfileModal />
        </CardFooter>
      </Card>

      {/* <div className="my-5 flex border p-6 justify-center items-center rounded-md shadow-lg">
        <Button
        className="text-foreground"
          onClick={() => {
            localStorage.removeItem("hasSeenTour");
            window.location.reload();
          }}
        >
          Restart Tour
        </Button>

      </div> */}
    </div>
  );
}