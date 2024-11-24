
import axios from "axios";
import {  useState } from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

import { useNavigate } from "react-router-dom"
import { PulseLoader } from "react-spinners";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import { baseurl } from "./globals/constants";

export default function Login() {
    const form = useForm();
    const { register, control, handleSubmit, formState } = form;
    const { errors } = formState
    // console.log("errors", errors);
    const [loading, setLoading] = useState(false);
  
    const navigate = useNavigate();
    async function handlsubmitData({ email, password }) {
        setLoading(true);
        try {
          

            const response = await axios.post(`${baseurl}/Account/Login/login`, { email, password });
            setLoading(false);
            // console.log(response);
            localStorage.setItem("DisplayName", response.data.data.displayname);
            localStorage.setItem("Department", response.data.data.department);
            localStorage.setItem("Email", response.data.data.email);
            localStorage.setItem("RoleName", response.data.data.roleName);
            localStorage.setItem("Token", response.data.data.token);
            localStorage.setItem("loggedIn", true);
            navigate("/landbank");
        }
        catch (err) {
            setLoading(false);
            console.log(err);
            toast.error(err.response.data.responseException.exceptionMessage[0]);
        }
    }
   


    return (
        <>
            <div className="h-screen flex justify-center items-center">
                <div className=" bg-white font-outfit p-10 rounded-xl ">
                    <h1 className="text-3xl font-bold"> Welcome to AWJ Land Bank Hub</h1>
                    <form onSubmit={handleSubmit(handlsubmitData)}   >
                        <div className="my-4 font-semibold">
                            <label htmlFor="email">Username</label>
                            <input type="text" id="email" {...register("email")} required className="border w-full p-3 rounded-xl my-2 " />
                        </div>


                        {/*
                         <div className="my-4 font-semibold">
                            <label htmlFor="email">Username</label>

                            <input type="text" id="email" {...register("email", {
                                pattern: {
                                    value: /^[A-Za-z0-9_%-]{3,}[@]{1}[a-z]{2,}\.{1}[a-z]{2,}(\.[a-z]{2,})*$/,
                                    message: "email is not valid"
                                },
                                required: {
                                    value: true,
                                    message: "Username is required"
                                }
                            })} className="border w-full p-3 rounded-xl my-2 " />
                        </div>
                        <p>{errors.email?.message}</p> 
                        
                        */}



                        <div className="my-4 font-semibold">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" {...register("password")} required className="border w-full p-3 rounded-xl my-2 "
                            />

                         </div>
{/*                          
                         <div className="my-4 font-semibold">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" {...register("password", {
                                required: {
                                    value: true,
                                    message: "password is required"
                                }
                            })} className="border w-full p-3 rounded-xl my-2 "
                            />

                        </div> 
                        
                        <p>{errors.password?.message}</p>
 */}
                     

                        <div className="submit">
                            <button id="submit" type="submit" value="Login" name="submit"  className="border w-full py-2 rounded bg-primary text-white text-xl text-bold" >{loading ? <PulseLoader color="white" size={12} /> : "Login"}</button>
                        </div>


                    </form>
                    <DevTool control={control} />
                    <Toaster
                    position="top-right"
                    reverseOrder={false}
                />

                </div >
            </div >
        </>
    )
}
