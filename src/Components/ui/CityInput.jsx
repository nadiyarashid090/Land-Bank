import { ChevronDown,ChevronUp } from "lucide-react";

import { useState,useEffect } from "react";
import axios from "axios";
import { baseurl } from "../globals/constants";


export default function Cityinput({handleCity,cityName,visibleInput,setVisibleInput,assetId}){
    
    const [isCityVisible, setIsCityVisible] = useState(false);
    const token=localStorage.getItem("Token");
    const [cities,setCities]=useState([]);
    
    
  async function getCities(){
    
        try {
            const response = await axios.get(`${baseurl}/Asset/GetAllCities?assetId=${assetId}`, {
                headers: {
                    Authorization:`Bearer ${token}  `
                 }
            });
            setCities(response?.data.data);
        }
        catch (err) {
            console.log(err);

        }

    }
    useEffect(()=>{
        getCities()
    },[assetId])

    
 
   
    
    return(
        
        <div className=" border border-primary-input py-3 px-2 rounded-[10px] relative text-left" onClick={() => { setVisibleInput(visibleInput==="City"?null:"City") }} >
                    <button className="text-left text-primary font-outfit  w-full  h-full flex justify-between" >
                        {cityName}
                        {visibleInput==="City" ? <ChevronUp /> : <ChevronDown />}
                    </button>
                    {visibleInput==="City" && <ul name="" id="" className="w-max outline-none border border-primary-input text-base text-primary font-outfit  overflow-y-auto overflow-x-hidden absolute top-20 left-0  bg-white" >

                        {cities?.map((city, index) => {
                            return (
                                <li value={city.id} key={index} className="p-2 cursor-pointer hover:bg-slate-50" onClick={() => handleCity(city.id, city.cityName)}>{city.cityName}</li>
                            )
                        })}
                    </ul>}
                </div>

    )
}