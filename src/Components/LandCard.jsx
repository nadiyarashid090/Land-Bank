import {  useNavigate } from "react-router-dom";

import { useState,useEffect } from "react";

import axios from "axios";
import Loader from "./Loader";
import { baseurl } from "./globals/constants";


export default function LandCard() {
    const token=localStorage.getItem("Token")
   
    const [landCards, setLandCards] = useState([]);
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()
    async function getLandCardData() {
        setLoading(true)
        try {
            const response = await axios.get(`${baseurl}/Asset/GetAssets?Pageno=1&Pagesize=10`,
                {
                    headers: {
                        Authorization:`Bearer ${token}  `
                     }
                }
            );
            // console.log(response);
            setLandCards(response?.data.data);
            setLoading(false)
           
        }
        catch (err) {
            console.log(err)
            setLoading(false)
        }
    }
    
    useEffect( () => {
       
      
         getLandCardData();
        

    }, []);

    const handlelandCardClick=(landCard)=>{
        navigate("/analytics",{state:landCard});  
    }
    function truncate(str, maxlength) {
        return (str.length > maxlength) ?
          str.slice(0, maxlength - 1) + '…' : str;
      }
   

const handleNavigate = (landCardsData) => {

    navigate('/view-all', { state: { landCardsData } })

}
    return (
        <>
        
            {loading ? <Loader/>: <div className=" grid grid-cols-4   gap-6  my-9 ">{landCards?.slice(0, 8).map((landCard,index) => {
                return (
                    <div onClick={()=>handlelandCardClick(landCard)}  key={index} className="cursor-pointer flex flex-col gap-[15px]  bg-white rounded-xl shadow-md py-4">
                        <div className="flex items-center gap-6  mx-8">
                            <img src="src/assets/Group 1.png" alt="" />
                            <div className=" text-primary font-outfit  "><h4 className="w-max  text-base leading-6  font-semibold">{truncate(landCard.assetName,10)}</h4><p className="text-xs font-medium leading-[19.2px]">{landCard.assetCode}</p></div>
                        </div>
                        <div className="flex items-center  bg-primary-50 px-8 py-2  gap-6">
                            <div className="border pt-4 pb-5 px-2 rounded-[50%] bg-primary-100">
                                <img src="src/assets/Group.svg" alt="" />
                            </div>
                            <div className=""><p className="font-normal font-outfit text-base leading-6 text-neutral-600 ">Total Lands</p><p className="font-semibold text-[22px] font-outfit leading-[26.4px] text-neutral-700  ">{landCard.landCount}</p></div>
                        </div>
                        <div className="flex gap-3  px-8"><img src="src/assets/Group 18.svg" alt="" /><p className="text-neutral-700 text-lg leading-[21.6px] font-semibold font-outfit">{landCard.totalArea} m2</p></div>
                        <div className="flex gap-3 px-8"> <img src="src/assets/Group 6.svg" alt="" /><p  className="text-neutral-700 text-lg leading-[21.6px] font-semibold font-outfit">{landCard.cityName}</p></div>
                    </div>


                )
            })}
            
            </div>
            }
         { (landCards!="") && <div className="flex justify-center my-9">
                <button  onClick={()=>handleNavigate(landCards)} className="py-4 px-10 rounded-lg bg-primary text-white font-bold text-base font-outfit">View all</button>
            </div>}
            





        </>
    )
}

