import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";
import { Provider } from "react-redux";
import store from "./ui/Store.jsx";





export default function LayOut() {
    return (
        <>

            <div className="container  ">
                <Provider store={store} >

                <Header />
                <Outlet />

                </Provider>
            </div>

        </>
    )
}
