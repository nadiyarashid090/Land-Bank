import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import axios from "axios";
import { baseurl } from "../globals/constants";
export default function AssetssInput({ handleAsset, assetName,visibleInput,setVisibleInput }) {
    const token = localStorage.getItem("Token");
    const [allAssets, setAllAssets] = useState([]);
   
    // const [isAssetsVisible, setIsAssetsVisible] = useState(false);
  
    async function getAllAssets() {
        try {
            const response = await axios.get(`${baseurl}/Asset/GetAllAssets`, {
                headers: {
                    Authorization: `Bearer ${token}  `
                }
            });


            setAllAssets(response?.data.data);

        } catch (err) {
            console.log(err);

        }
    }
   

    useEffect(() => {
        getAllAssets();

    }, []);

    return (
        <div className=" border border-primary-input py-3 px-2 rounded-[10px] relative text-left " onClick={() => { setVisibleInput(visibleInput==="Assets"?null:"Assets") }} >
            <button className="text-left text-primary font-outfit  w-full  h-full flex justify-between" >
                {assetName}
                {visibleInput==="Assets" ? <ChevronUp /> : <ChevronDown />}
            </button>
            {visibleInput==="Assets" && <ul name="" id="" className=" outline-none border border-primary-input text-base text-primary font-outfit w-max h-52 overflow-y-auto absolute top-20 left-0  bg-white" >

                {allAssets?.map((asset, index) => {
                    return (
                        <li value={asset.id} key={index} className="p-2 cursor-pointer hover:bg-slate-50" onClick={() => handleAsset(asset.id, asset.assetName)}>{asset.assetName}</li>
                    )
                })}
            </ul>}
        </div>
    )
}