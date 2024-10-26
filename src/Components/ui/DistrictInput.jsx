import { useState, useEffect } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import axios from "axios";
import { baseurl } from "../globals/constants";
import { Search } from "lucide-react";

function DistricInput({ handleDistrict, districtName, cityId, visibleInput, setVisibleInput, assetId }) {

    const [districts, setDistricts] = useState([]);
    const [isDistrictVisible, setIsDistrictVisible] = useState(false);
    const token = localStorage.getItem("Token");
    const [orginalDistricts, setOrginalDistricts] = useState([]);


    async function getdistricts() {
        try {
            if (cityId) {
                const response = await axios.get(`${baseurl}/Asset/GetDistrictsByCityId?cityId=${cityId}&assetId=${assetId}`, {
                    headers: {
                        Authorization: `Bearer ${token}  `
                    }
                });
                setDistricts(response?.data.data);
                setOrginalDistricts(response?.data.data)


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
    const handleChange = (e) => {
        const searchValue = e.target.value.toUpperCase();
        if (searchValue) {
            setDistricts(orginalDistricts.filter((asset) => asset.assetName.toUpperCase().startsWith(searchValue)));
        } else {
            setDistricts(orginalDistricts);
        }
     
        setVisibleInput("District");
    };


    return (

        <div className=" border border-primary-input py-3 px-2 rounded-[10px] relative text-left" onClick={() => { setVisibleInput(visibleInput === "District" ? null : "District") }} >
            <button className="text-left text-primary font-outfit  w-full  h-full flex justify-between" >
                {districtName}
                {visibleInput === "District" ? <ChevronUp /> : <ChevronDown />}
            </button>
            {visibleInput === "District" && ((districts.length) === 0 ? <ul className="bg-white  outline-none rounded-[10px] border border-primary-input text-base w-max text-primary font-outfit  overflow-y-auto absolute top-20 left-0"><li className="p-2">No items found</li></ul> :
                <div className="w-max outline-none border border-primary-input text-base text-primary font-outfit overflow-y-auto overflow-x-hidden absolute top-20 left-0  bg-white"
                    onClick={(e) => e.stopPropagation()}  >
                    <div className="border w-[95%] flex justify-between rounded p-3 m-2">
                        <input
                            type="text"
                            placeholder="Search..."
                            onChange={handleChange}
                            className="outline-none placeholder:text-primary"
                        />
                        <Search />
                    </div>
                    <ul name="" id="">
                        {districts?.map((district, index) => {
                            return (
                                <li value={district.id} key={index} className="p-2 cursor-pointer hover:bg-slate-50"
                                    onClick={() => {
                                        handleDistrict(district.id, district.districtName)
                                        setVisibleInput(null);
                                    }} >{district.districtName}</li>
                            )
                        })}
                    </ul>
                </div>
            )}
        </div>


    )
}
export default DistricInput;