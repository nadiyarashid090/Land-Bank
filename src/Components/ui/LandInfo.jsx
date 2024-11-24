import Cityinput from "./CityInput";
import { useState } from "react";
import DistricInput from "./DistrictInput";
import { useSelector, useDispatch } from "react-redux";
import { addArea } from "./Slice";
import store from "./Store";



export default function LandInfo(
    { landDetails,
        status,
        landType,
        edit,
        setEdit,
        handleCity,
        cityName,
        cityId,
        visibleInput,
        setVisibleInput,
        assetId,
        handleDistrict,
        districtName,
        area,
        setArea ,
        department}) {
            console.log(status,landType);
            
    console.log("landDetails", landDetails);

    const RoleName = localStorage.getItem("RoleName");
    const dispatch = useDispatch();
    // console.log("dispatch",dispatch);

    // const selector = useSelector(store => store.LandOverView.details);
    // console.log("selector",selector);






    const handleArea = (e) => {
        setArea(e.target.value);

        dispatch(addArea(e.target.value));

        
    }
 
    return (
        <>

            <div className="grid  grid-cols-[20%_50%] grid-rows-1 font-outfit bg-primary-50 p-8 rounded-2xl">
                <div>
                    <img src="src/assets/landDetailimg.png" alt="" />
                </div>
                <div>
                    <div className="flex justify-between">
                        <h1 className="font-semibold text-primary text-[32px] leading-[38.4px]">{landDetails.referenceId}</h1>

                        {(RoleName === "Editor" && landType === "Transactable" && status === "Data Not Submitted") && <button className="bg-primary  text-base font-bold rounded-lg px-6 py-3 text-white" onClick={() => setEdit(!edit)}>{edit ? "Cancel" : "Edit"}</button>}
                    </div>

                    <p className="flex gap-1"> <span className="font-medium text-base text-neutral-600">Asset Name:</span> <span className="font-bold text-primary-600">{landDetails.assetName}</span></p>
                    <p className="flex gap-1"><span className="font-medium text-base text-neutral-600">Sub Asset Name:</span><span className="font-bold text-primary-600">{landDetails.subAssetName}</span></p>
                    <div className=" flex justify-between  mt-4">
                        {(!edit && department!=="landoverview") && <p className="flex flex-col"><span className="font-normal text-base text-[#7b7b7b] mb-1">Business Plan</span><span className="font-semibold text-base leading-[19.2px] text-neutral-700">{landDetails.businessPlan}</span></p>}
                        <div className="flex flex-col">
                            <span className="font-normal text-base text-[#7b7b7b] mb-1">City</span>
                            {(edit && department==="landoverview") ?
                                <Cityinput
                                    handleCity={handleCity}
                                    cityName={cityName}
                                    visibleInput={visibleInput}
                                    setVisibleInput={setVisibleInput}
                                    assetId={assetId} />
                                : <span className="font-semibold text-base leading-[19.2px] text-neutral-700">{landDetails.city}</span>}
                        </div>
                        <div className="flex flex-col">
                            <span className="font-normal text-base text-[#7b7b7b] mb-1">District</span>
                            {(edit && department==="landoverview") ? <DistricInput 
                                handleDistrict={handleDistrict}
                                districtName={districtName}
                                cityId={cityId}
                                assetId={assetId}
                                visibleInput={visibleInput}
                                setVisibleInput={setVisibleInput} /> : <span className="font-semibold text-base leading-[19.2px] text-neutral-700">{landDetails.district}</span>
                            }
                        </div>
                        <p className="flex flex-col"><span className="font-normal text-base text-[#7b7b7b] mb-1">WLT Status</span><span className="font-semibold text-base leading-[19.2px] text-neutral-700">{landDetails.isWlt}</span></p>
                        <p className="flex flex-col"><span className="font-normal text-base text-[#7b7b7b] mb-1">Area</span>
                            {(edit && department==="landoverview") ? <input type="text" value={area} onChange={(e) => handleArea(e)} className="border border-primary-200 p-2 outline-none rounded-lg" /> : <span className="font-semibold text-base leading-[19.2px] text-neutral-700">{landDetails?.area} {landDetails?.area && <span>sqft</span>} </span>}</p>
                    </div>
                </div>
            </div>

        </>
    )
}