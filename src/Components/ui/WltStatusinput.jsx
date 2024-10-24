import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import axios from "axios";
import { baseurl } from "../globals/constants";
export default function WltStatusInput({ handleWltStatus, wltStatusName,visibleInput,setVisibleInput }) {
    const token = localStorage.getItem("Token");
    const [wltStatus, setWltStatus] = useState([]);
    const [isWltStatusVisible, setIsWltStatusVisible] = useState(false);
    const getWltStatus = async () => {
        try {
            const response = await axios(`${baseurl}/Asset/GetStatus?&statusType=wltstatus`, {
                headers: {
                    Authorization: `Bearer ${token}  `
                }

            }


            );
            setWltStatus(response?.data.data);
            
            
           


        } catch (err) {
            console.log(err);

        }

    }
    useEffect(() => {
        getWltStatus();
    }, [])

    return (
        <div className=" border border-primary-input py-3 px-2 rounded-[10px] relative text-left " onClick={() => { setVisibleInput(visibleInput==="WltStatus"?null:"WltStatus") }} >
            <button className="text-left text-primary font-outfit  w-full  h-full flex justify-between" >
                {wltStatusName}
                {visibleInput==="WltStatus" ? <ChevronUp /> : <ChevronDown />}
            </button>
            {visibleInput==="WltStatus" && ((wltStatus.length) === 0 ? <ul className="bg-white w-full outline-none rounded-[10px] border border-primary-input text-base text-primary font-outfit  overflow-y-auto absolute top-20 left-0"><li className="p-2">No Data found</li></ul> : <ul name="" id="" className="w-full outline-none border border-primary-input text-base text-primary font-outfit  overflow-y-auto absolute top-20 left-0  bg-white" >



                {wltStatus?.map((wltSt, index) => {
                    return (
                        <li value={wltSt.id} key={index} className="p-2 cursor-pointer hover:bg-slate-50" onClick={() => handleWltStatus(wltSt.id, wltSt.status)}>{wltSt.status}</li>
                    )
                })}
            </ul>)}
        </div>

    )
}