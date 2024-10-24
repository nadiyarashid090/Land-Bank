
import { useState,useEffect } from "react";
import { ChevronDown,ChevronUp } from "lucide-react";
import axios from "axios";
import { baseurl } from "../globals/constants"; 
export default function BusinessPlanInput({handleBusinessPlan,businessPlanName,visibleInput,setVisibleInput}){
    const token = localStorage.getItem("Token");
    const [businessPlans, setBusinessPlan] = useState([]);
    // const [isBusinessPlanVisible, setIsBusinessPlanVisible] = useState(false);
    const getBusinessPlan = async () => {
        try {
            const response = await axios(`${baseurl}/Asset/GetStatus?&statusType=businessPlan`, {
                headers: {
                    Authorization: `Bearer ${token}  `
                }

            }


            );
           
            setBusinessPlan(response?.data.data);

        } catch (err) {
            console.log(err);

        }
    }
    useEffect(() => {
        getBusinessPlan();
    }, [])
    return(
        <div className=" border border-primary-input py-3 px-2 rounded-[10px] relative text-left " onClick={() => { setVisibleInput(visibleInput==="BusinessPlan"? null: "BusinessPlan") }} >
        <button className="text-left text-primary font-outfit  w-full  h-full flex justify-between" >
            {businessPlanName}
            {visibleInput==="BusinessPlan" ? <ChevronUp /> : <ChevronDown />}
        </button>
        {visibleInput==="BusinessPlan" && ((businessPlans.length) === 0 ? <ul className="bg-white  w-max outline-none rounded-[10px] border border-primary-input text-base text-primary font-outfit   overflow-y-auto absolute top-20 left-0"><li className="p-2">No Data found</li></ul> : <ul name="" id="" className="w-full outline-none border border-primary-input text-base text-primary font-outfit h-52 overflow-y-auto absolute top-20 left-0  bg-white" >



            {businessPlans?.map((businessPlan, index) => {
                return (
                    <li value={businessPlan.id} key={index} className="p-2 cursor-pointer hover:bg-slate-50" onClick={() => handleBusinessPlan(businessPlan.id, businessPlan.status)}>{businessPlan.status}</li>
                )
            })}
        </ul>)}
    </div>

    )
}