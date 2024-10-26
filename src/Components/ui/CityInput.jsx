import { ChevronDown, ChevronUp } from "lucide-react";

import { useState, useEffect } from "react";
import axios from "axios";
import { baseurl } from "../globals/constants";
import { Search } from "lucide-react";


export default function Cityinput({ handleCity, cityName, visibleInput, setVisibleInput, assetId }) {

    const [isCityVisible, setIsCityVisible] = useState(false);
    const token = localStorage.getItem("Token");
    const [cities, setCities] = useState([]);
    const [orginalCities, setOrginalCities] = useState([]);


    async function getCities() {

        try {
            const response = await axios.get(`${baseurl}/Asset/GetAllCities?assetId=${assetId}`, {
                headers: {
                    Authorization: `Bearer ${token}  `
                }
            });
            setCities(response?.data.data);
            setOrginalCities(response?.data?.data);
        }
        catch (err) {
            console.log(err);

        }

    }
    useEffect(() => {
        getCities()
    }, [assetId])
    const handleChange = (e) => {
        const searchValue = e.target.value.toUpperCase();
        if (searchValue) {
            setCities(orginalCities.filter((city) =>city.cityName.toUpperCase().startsWith(searchValue)));
        } else {
            setCities(orginalCities);
        }
     
        setVisibleInput("City");
    };




    return (

        <div className=" border border-primary-input py-3 px-2 rounded-[10px] relative text-left" onClick={() => { setVisibleInput(visibleInput === "City" ? null : "City") }} >
            <button className="text-left text-primary font-outfit  w-full  h-full flex justify-between" >
                {cityName}
                {visibleInput === "City" ? <ChevronUp /> : <ChevronDown />}
            </button>
            {visibleInput === "City" &&
                <div className="absolute top-20 left-0 p-2 outline-none border border-primary-input text-base text-primary font-outfit w-max h-52 overflow-y-auto overflow-hidden bg-white"
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
                    <ul name="" >

                        {cities?.map((city, index) => {
                            return (
                                <li value={city.id} key={index} className="p-2 cursor-pointer hover:bg-slate-50" 
                                
                                onClick={() => {
                                    handleCity(city.id, city.cityName)
                                    setVisibleInput(null); 
                                }}
                                >
                                    {city.cityName}</li>
                            )
                        })}
                    </ul>
                </div>}
                </div>

    )
}