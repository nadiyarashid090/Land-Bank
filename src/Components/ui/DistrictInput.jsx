import { useState,useEffect } from "react";
import { ChevronUp,ChevronDown } from "lucide-react";
import axios from "axios";
import { baseurl } from "../globals/constants";

 function DistricInput({handleDistrict,districtName,cityId,visibleInput,setVisibleInput,assetId}){
   
    const [districts,setDistricts]=useState([]);
    const [isDistrictVisible, setIsDistrictVisible] = useState(false); 
    const token=localStorage.getItem("Token");
    
     async function getdistricts() {
        try {
            if (cityId) {
                const response = await axios.get(`${baseurl}/Asset/GetDistrictsByCityId?cityId=${cityId}&assetId=${assetId}`, {
                    headers: {
                        Authorization:`Bearer ${token}  `
                     }
                });
                setDistricts(response?.data.data);
                
                
            } else {
                setDistricts([]);

            }
        } catch (err) {

            console.log(err);
        }
    }
     useEffect(() => {
        getdistricts();
    }, [cityId]);
  
    
    return(
        
         <div className=" border border-primary-input py-3 px-2 rounded-[10px] relative text-left" onClick={() => { setVisibleInput(visibleInput==="District"?null:"District") }} >
                    <button className="text-left text-primary font-outfit  w-full  h-full flex justify-between" >
                        {districtName}
                        {visibleInput==="District"? <ChevronUp /> : <ChevronDown />}
                    </button>
                    {visibleInput==="District" && ((districts.length) === 0 ? <ul className="bg-white  outline-none rounded-[10px] border border-primary-input text-base w-max text-primary font-outfit  overflow-y-auto absolute top-20 left-0"><li className="p-2">No Data found</li></ul> : <ul name="" id="" className="w-max outline-none border border-primary-input text-base text-primary font-outfit overflow-y-auto absolute top-20 left-0  bg-white" >



                        {districts?.map((district, index) => {
                            return (
                                <li value={district.id} key={index} className="p-2 cursor-pointer hover:bg-slate-50" onClick={() => handleDistrict(district.id, district.districtName)}>{district.districtName}</li>
                            )
                        })}
                    </ul>)}
                </div> 
                
        
    )
}
export default DistricInput;