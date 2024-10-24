import { useState,useEffect } from "react";

import { ChevronUp,ChevronDown } from "lucide-react";
import axios from "axios";
import { baseurl } from "../globals/constants";

export default function LandUseInput({handleLandUse,landUseName,visibleInput,setVisibleInput}){
    const token = localStorage.getItem("Token");
    const [isLandUseVisible, setIsLandUseVisible] = useState(false);
    const [landUses, setLandUses] = useState([]);
    const getLandUses = async () => {
        try {
            const response = await axios.get(`${baseurl}/Asset/GetLandUses?statusType=landuse`, {
                headers: {
                    Authorization: `Bearer ${token}  `
                }
            });
         
            setLandUses(response?.data.data);
        }
        catch (err) {
            console.log(err);

        }

    }
    useEffect(() => {
        getLandUses();

    }, [])
    return(
        <div className=" border border-primary-input py-3 px-2 rounded-[10px] relative text-left" onClick={() => { setVisibleInput(visibleInput==="LandUse"?null:"LandUse") }} >
        <button className="text-left text-primary font-outfit  w-full  h-full flex justify-between" >
            {landUseName}
            {visibleInput==="LandUse" ? <ChevronUp /> : <ChevronDown />}
        </button>
        {visibleInput==="LandUse" && ((landUses.length) === 0 ? <ul className="bg-white  outline-none rounded-[10px] border border-primary-input text-base text-primary font-outfit  overflow-y-auto absolute top-20 left-0"><li className="p-2">No Data found</li></ul> : <ul name="" id="" className="overflow-x-hidden outline-none border border-primary-input text-base text-primary font-outfit h-52 overflow-y-auto absolute top-20 left-0  bg-white" >



            {landUses?.map((landuse, index) => {
                return (
                    <div key={index}>
                        <li key={index} className="p-2  cursor-pointer hover:bg-slate-50" onClick={() => handleLandUse(landuse.id, landuse.status)}>
                            {
                                (landuse.status)


                            }
                            {console.log(landuse.children)
                            }



                        </li>
                        {(landuse.children)?.map((ele, i) => { return (<li key={i} className="py-2 px-4 cursor-pointer hover:bg-slate-100" onClick={() => handleLandUse(ele.id, ele.status)} >{ele.status}</li>) })}
                    </div>

                )
            })}
        </ul>)}
    </div>

    )
}