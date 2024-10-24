import { Link} from "react-router-dom"

export default function LogOut(){
    const handleLogOut=()=>{
        localStorage.clear()
       
       
    }
    return(
        <>
        <Link onClick={handleLogOut} to={"/"}>Logout</Link>
        </>
    )
}