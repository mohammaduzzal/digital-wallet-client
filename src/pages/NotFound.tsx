import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function NotFound() {
  return (
     <div className="flex flex-col justify-center items-center min-h-screen">
        <h1 className="text-2xl my-1">Route not found</h1>
        <Button><Link to="/">Home</Link></Button>
    </div>
  )
}
