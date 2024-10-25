import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import axios from "axios";
import { baseurl } from "../globals/constants";
import { Search } from "lucide-react";
export default function AssetssInput({ handleAsset, assetName, visibleInput, setVisibleInput }) {
    const token = localStorage.getItem("Token");
    const [allAssets, setAllAssets] = useState([]);
    const[orginalAssets,setOrginalassets]=useState([]);

    // const [isAssetsVisible, setIsAssetsVisible] = useState(false);

    async function getAllAssets() {
        try {
            const response = await axios.get(`${baseurl}/Asset/GetAllAssets`, {
                headers: {
                    Authorization: `Bearer ${token}  `
                }
            });


            setAllAssets(response?.data.data);
            setOrginalassets(response?.data?.data);

        } catch (err) {
            console.log(err);

        }
    }


    useEffect(() => {
        getAllAssets();

    }, []);
   

    const handleChange = (e) => {
      
        if (e.target.value) {

           setAllAssets( orginalAssets.filter((asset) => {


            return (asset.assetName.toUpperCase().startsWith(e.target.value.toUpperCase()));
        }))
        }else{
            setAllAssets(orginalAssets);
        }
    }
    
    

    return (
        <>
            <div className="border w-[95%] flex justify-between rounded p-3 m-2 "> <input type="text" onChange={(e) => { handleChange(e) }} placeholder="Search..." className="outline-none placeholder:text-primary  " /> <Search /></div>
            <div className=" border border-primary-input py-3 px-2 rounded-[10px] relative text-left " onClick={() => { setVisibleInput(visibleInput === "Assets" ? null : "Assets") }} >
                <button className="text-left text-primary font-outfit  w-full  h-full flex justify-between" >
                    {assetName}
                    {visibleInput === "Assets" ? <ChevronUp /> : <ChevronDown />}
                </button>
                {visibleInput === "Assets" &&
                    <div className="absolute top-20 left-0 p-2 outline-none border border-primary-input text-base text-primary font-outfit w-max h-52 overflow-y-auto overflow-hidden  bg-white">

                        <ul name="" id="" className=" " >
                        {/* <div className="border w-[95%] flex justify-between rounded p-3 m-2 "> <input type="text" onChange={(e) => { handleChange(e) }} placeholder="Search..." className="outline-none placeholder:text-primary  " /> <Search /></div> */}

                            {allAssets?.map((asset, index) => {
                                
                                return (
                                    <li value={asset.id} key={index} className="p-2 cursor-pointer hover:bg-slate-50" onClick={() => handleAsset(asset.id, asset.assetName)}>{asset.assetName}</li>
                                )
                            })}
                        </ul>


                    </div>

                }

                {/* { console.log(visibleInput)} */}
            </div>
        </>
    )
}