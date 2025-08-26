import { useGetSingleUserQuery } from "@/redux/features/auth/auth.api"
import LoadingSpinner from "@/utils/LoadingSpinner"
import { useParams } from "react-router"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Phone, Mail, Wallet, ShieldCheck, ShieldX } from "lucide-react"

export default function AgentDetails() {
  const { agentId } = useParams()
  const { data, isLoading } = useGetSingleUserQuery(agentId)

  const agent = data?.data
  if (isLoading) return <LoadingSpinner />

  if (!agent) return <div className="p-6 text-center">Agent not found</div>

  return (
    <div className="p-6 flex justify-center">
      <Card className="w-full max-w-2xl shadow-lg rounded-2xl">
        <CardHeader className="flex flex-col items-center gap-3">
          <Avatar className="h-20 w-20">
            <AvatarFallback>
              {agent.name?.charAt(0).toUpperCase() || "A"}
            </AvatarFallback>
          </Avatar>
          <CardTitle className="text-xl">{agent.name}</CardTitle>
          <Badge variant="secondary" className="uppercase tracking-wide">
            {agent.role}
          </Badge>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Contact Info */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Phone size={18} /> <span>{agent.phoneNumber}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={18} /> <span>{agent.email}</span>
            </div>
          </div>

          {/* Wallet */}
          <div className="flex items-center gap-2 text-lg font-semibold text-richGreen">
            <Wallet size={20} />
            Balance: {agent.wallet?.balance ?? 0} ৳
          </div>

          {/* Status */}
          <div className="flex flex-wrap gap-2">
            {agent.isApproved ? (
              <Badge className="bg-green-100 text-green-700 flex items-center gap-1">
                <ShieldCheck size={14} /> Approved
              </Badge>
            ) : (
              <Badge className="bg-yellow-100 text-yellow-700 flex items-center gap-1">
                Pending Approval
              </Badge>
            )}

            {agent.wallet?.isBlocked ? (
              <Badge className="bg-red-100 text-red-700 flex items-center gap-1">
                <ShieldX size={14} /> Blocked
              </Badge>
            ) : (
              <Badge className="bg-blue-100 text-blue-700">Active</Badge>
            )}
          </div>

          {/* Dates */}
          <div className="text-sm text-gray-500 space-y-1">
            <p>Joined: {new Date(agent.createdAt).toLocaleDateString()}</p>
            <p>Last Updated: {new Date(agent.updatedAt).toLocaleDateString()}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

