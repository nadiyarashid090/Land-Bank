import { Link } from "react-router-dom";
import { User } from "lucide-react"
import LogOut from "./LogOut";
export default function Header() {
    const user=localStorage.getItem("DisplayName");
    return (
        <>
            <header  >
                <nav className="py-6 ">
                <div className="flex items-center justify-between  ">
                    <div className="flex items-center">
                        <div>
                            <img src="src/assets/Group 1707478171.svg" alt="" />
                        </div>
                        <img src="src/assets/L.svg" alt="logo" className="" />
                    </div>
                    <div className="flex gap-16 ">
                        <Link to={"/landbank"} className="font-bold text-primary  text-base leading-[26px]">Land Bank</Link>
                        <Link to={"/moreanalysis"} className="font-bold text-primary  text-base leading-[26px]">More Analysis</Link>
                        <Link to={"/reports"} className="font-bold text-primary  text-base leading-[26px]">Reports</Link>
                    </div>
                    <div className="flex gap-2 ">
                        <User className="text-primary" />
                        <span className="font-outfit font-bold">{user}</span>
                         <LogOut/>
                    </div>
                </div>
                </nav>
                <h1 className="font-Messiri text-primary my-8 leading-[48px] font-bold text-[40px]">AWJ Land Bank Hub</h1>
            </header>
           
        </>
    )
}