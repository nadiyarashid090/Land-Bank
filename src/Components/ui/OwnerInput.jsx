import axios from "axios";
import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { baseurl } from "../globals/constants";
import { Search } from "lucide-react";
export default function OwnerInput({ handleOwner, ownerName, visibleInput, setVisibleInput, assetId, cityId }) {



    const [ownerStatus, setOwnerStatus] = useState([]);
    const token = localStorage.getItem("Token");
    const [orginalOwnerStatus, setOrginalOwnerStatus] = useState([]);
    const [Url] = useState(new URL(`${baseurl}/Asset/OwnerFilter`));
    const setParams = () => {
        if (assetId) {

            Url.searchParams.set("assetId", assetId);
        } else {
            Url.searchParams.delete("assetId");
        }
        if (cityId) {

            Url.searchParams.set("cityId", cityId);
        } else {
            Url.searchParams.delete("cityId");
        }


    }
    useEffect(() => {

        setParams();

    }, [assetId, cityId]);
    const getOwner = async () => {
        try {

            const response = await axios(Url.href, {
                headers: {
                    Authorization: `Bearer ${token}  `
                }

            }


            );



            setOwnerStatus(response?.data.data);
            setOrginalOwnerStatus(response?.data.data);



        } catch (err) {
            console.log(err);

        }

    }
    useEffect(() => {
        getOwner();
    }, [assetId, cityId]);
    const handleChange = (e) => {
        const searchValue = e.target.value.toUpperCase();
        if (searchValue) {
            setOwnerStatus(orginalOwnerStatus.filter((owner) => owner.ownerName.toUpperCase().startsWith(searchValue)));
        } else {
            setOwnerStatus(orginalOwnerStatus);
        }

        setVisibleInput("Owner");
    };
    return (
        <div className=" border border-primary-input py-3 px-2 rounded-[10px] relative text-left" onClick={() => { setVisibleInput(visibleInput === "Owner" ? null : "Owner") }} >
            <button className="text-left text-primary font-outfit  w-full  h-full flex justify-between" >
                {ownerName}
                {visibleInput === "Owner" ? <ChevronUp /> : <ChevronDown />}
            </button>
            {visibleInput === "Owner" && ((ownerStatus.length) === 0 ? <ul className="bg-white w-max outline-none rounded-[10px] border border-primary-input text-base text-primary font-outfit  overflow-y-auto absolute top-20 left-0"><li className="p-2">No Data found</li></ul> :
                <div className="w-max outline-none border border-primary-input text-base text-primary font-outfit h-52 overflow-y-auto  overflow-x-hidden absolute top-20 left-0  bg-white"
                onClick={(e) => e.stopPropagation()}>
                    <div className="border w-[95%] flex justify-between rounded p-3 m-2">
                            <input
                                type="text"
                                placeholder="Search..."
                                onChange={handleChange} 
                                className="outline-none placeholder:text-primary"
                            />
                            <Search />
                        </div>
                    <ul name="" id=""  >
                        {ownerStatus?.map((owner, index) => {
                            return (
                                <li value={owner.id} key={index} className="p-2 cursor-pointer hover:bg-slate-50" 
                              
                                onClick={() => {
                                    handleOwner(owner.id, owner.ownerName)
                                    setVisibleInput(null); 
                                }}
                                >{owner.ownerName}</li>
                            )
                        })}
                    </ul>
                </div>
            )}
        </div>

    )
}