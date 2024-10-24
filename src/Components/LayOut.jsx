import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";





export default function LayOut() {
    return (
        <>

            <div className="container  ">

                <Header />
                <Outlet />
            </div>

        </>
    )
}
