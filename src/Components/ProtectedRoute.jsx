import { Navigate } from "react-router-dom";

import LayOut from "./LayOut";

export default function ProtectedRoute(){
    const isLoggedIn=localStorage.getItem("loggedIn");
   
    
    return isLoggedIn? <LayOut/> :<Navigate to={"/"}/>

     
}