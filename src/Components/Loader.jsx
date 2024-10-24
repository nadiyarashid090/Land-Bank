import { ClipLoader } from "react-spinners";

export default function Loader() {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <ClipLoader color="#82744f" />
      </div>
    )
  }