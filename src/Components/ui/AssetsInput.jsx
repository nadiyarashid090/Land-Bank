import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import axios from "axios";
import { baseurl } from "../globals/constants";

export default function AssetssInput({ handleAsset, assetName, visibleInput, setVisibleInput }) {
    const token = localStorage.getItem("Token");
    const [allAssets, setAllAssets] = useState([]);
    const [orginalAssets, setOrginalassets] = useState([]);

    async function getAllAssets() {
        try {
            const response = await axios.get(`${baseurl}/Asset/GetAllAssets`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setAllAssets(response?.data?.data);
            setOrginalassets(response?.data?.data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getAllAssets();
    }, []);

    const handleChange = (e) => {
        const searchValue = e.target.value.toUpperCase();
        if (searchValue) {
            setAllAssets(orginalAssets.filter((asset) => asset.assetName.toUpperCase().startsWith(searchValue)));
        } else {
            setAllAssets(orginalAssets);
        }
     
        setVisibleInput("Assets");
    };

    return (
        <>
            <div className="border border-primary-input py-3 px-2 rounded-[10px] relative text-left" 
                onClick={() => setVisibleInput(visibleInput === "Assets" ? null : "Assets")}>
                
                <button className="text-left text-primary font-outfit w-full h-full flex justify-between">
                    {assetName}
                    {visibleInput === "Assets" ? <ChevronUp /> : <ChevronDown />}
                </button>
                
                {visibleInput === "Assets" && (
                    <div className="absolute  top-20 left-0 p-2 outline-none border border-primary-input text-base text-primary font-outfit w-max h-52 overflow-y-auto overflow-hidden bg-white" 
                         onClick={(e) => e.stopPropagation()} 
                    >
                        <div className="border w-[95%] flex justify-between rounded p-3 m-2">
                            <input
                                type="text"
                                placeholder="Search..."
                                onChange={handleChange} 
                                className="outline-none placeholder:text-primary"
                            />
                            <Search />
                        </div>
                        <ul>
                            {allAssets?.map((asset, index) => (
                                <li
                                    key={index}
                                    className="p-2 cursor-pointer hover:bg-slate-50"
                                    onClick={() => {
                                        handleAsset(asset.id, asset.assetName);
                                        setVisibleInput(null); 
                                    }}
                                >
                                    {asset.assetName}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </>
    );
}
