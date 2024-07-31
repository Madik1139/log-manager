import { Ban } from "lucide-react";

function Unauthorized() {
  return (
    <div>
        <h1 className="text-center mt-20 font-bold text-2xl">You are not authorized</h1>
        <Ban size={100} className="mx-auto mt-3 text-red-500" />
    </div>
  )
}

export default Unauthorized;