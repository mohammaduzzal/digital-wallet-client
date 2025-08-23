import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function UnAuthorized() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
        <h1 className="text-2xl my-1">You are not authorized</h1>
        <Button><Link to="/">Home</Link></Button>
    </div>
  )
}
