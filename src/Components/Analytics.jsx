import { useState, useEffect } from "react";
import axios from "axios";
import SearchInput from "./ui/SearchInput";
import AssetssInput from "./ui/AssetsInput";
import Cityinput from "./ui/CityInput";
import DistricInput from "./ui/DistrictInput";
import LandUseInput from "./ui/LandUseInput";
import BusinessPlanInput from "./ui/BusinessPlanInput"
import OwnerInput from "./ui/OwnerInput";
import WltStatusInput from "./ui/WltStatusinput";
import { useLocation } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Loader from "./Loader";
import { Check } from "lucide-react";
import { Circle } from "lucide-react";
import { X } from "lucide-react";
import { baseurl } from "./globals/constants";
import Approver from "./Approver";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addLandId } from "./ui/Slice";
export default function Analytics() {
    const roleName = localStorage.getItem("RoleName");

    const location = useLocation();

    const [searchText, setSearchText] = useState('');

    const [assetName, setAssetName] = useState(location.state.assetName);
    const [assetId, setAssetId] = useState(location.state.assetId);

    const [cityName, setCityName] = useState(location.state.cityName);
    const [cityId, setCityId] = useState(location.state.cityId);



    const [districtId, setDistrictId] = useState("");
    const [districtName, setDistrictName] = useState("District");

    const [landUseName, setLandUseName] = useState("Land Use");
    const [landUseId, setLandUseId] = useState("");

    const [businessPlanName, setBusinessPlanName] = useState("Business Plan");
    const [businessPlanId, setBusinessPlanId] = useState("");

    const [ownerName, setOwnerName] = useState("Owner");
    const [ownerId, setOwnerId] = useState('');

    const [wltStatusId, setWltStatusId] = useState('');
    const [wltStatusName, setWltStatusName] = useState("Wlt Status");

    const [landStage, setLandStage] = useState("");



    const [pageNumber, setPageNumber] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [isloading, setisloading] = useState(true);

    const token = localStorage.getItem("Token");

    const [cards, setCards] = useState([]);



    const [visibleInput, setVisibleInput] = useState(null);

    const [error, setError] = useState("");

    const [filters, setFilters] = useState([]);

    const [totalRequestCount, setTotalRequestCount] = useState(0);
    const [approvedCount, setApprovedCount] = useState(0);
    const [waitingForApprovalCount, setWaitingFprApprovalCount] = useState(0);
    const [pendingCount, setPendingCount] = useState(0);
    const [sendBackCount, setSendBackCount] = useState(0);






    const navigate = useNavigate();

    const [Url] = useState(new URL(`${roleName === "Editor" || roleName === "Approver" ?
        `${baseurl}/Land/GetLandsByAssetId?&PageNo=${pageNumber}&PageSizee=12` :
        `${baseurl}/Land/GetLandsByAssetIdForViewer?&PageNo=${pageNumber}&PageSize=12`}`));

    // console.log(Url.searchParams.toString());
    // const params=new URLSearchParams([["assetId",assetId]]);
    // console.log(params.toString());



    const setParams = () => {
        Url.searchParams.set("assetId", assetId);

        Url.searchParams.set("cityId", cityId);


    }

    useEffect(() => {

        setParams();


    }, [])

    const getLands = async () => {
        setisloading(true)
        try {
            const response = await axios.get(Url.href,
                {
                    headers: {
                        Authorization: `Bearer ${token}  `
                    }
                });

            setCards(response?.data?.data);

            setTotalRequestCount(response?.data.totalRequestCount);
            setApprovedCount(response?.data.approvedCount);
            setWaitingFprApprovalCount(response?.data.waitingForApprovalCount);
            setPendingCount(response?.data.pendingCount);
            setSendBackCount(response?.data.rejectedCount);
            setisloading(false);
            setTotalPages(Math.ceil(response?.data.totalCount / 12));

        } catch (err) {
            setisloading(false);
            // setError(err.response.data.responseException.exceptionMessage.Message);
            console.log(err);
            console.log("Error");
        }
    }


    function handleFilters() {
        setFilters([
            {

                "Asset": assetId === "" ? null : assetName
            },
            {

                "City": cityId === "" ? null : cityName
            },
            {
                "District": districtId === "" ? null : districtName
            },
            {
                "Owner": ownerId === "" ? null : ownerName
            },
            {
                "Wlt Status": wltStatusId === "" ? null : wltStatusName
            },
            {
                "Business Plan": businessPlanId === "" ? null : businessPlanName
            },
            {
                "Land Use": landUseId === "" ? null : landUseName
            }]);



    }



    useEffect(() => {
        getLands();
        handleFilters();


    }, [assetId, cityId, districtId, ownerId, wltStatusId, landUseId, searchText, businessPlanId, pageNumber, landStage])






    function handleSearchText(text) {

        setSearchText(text)
        Url.searchParams.set("searchText", text);

    }


    const handleAsset = (id, assetname) => {
        setAssetId(id);
        setAssetName(assetname);
        Url.searchParams.set("assetId", id);

        setCityId("");
        setCityName("City");
        Url.searchParams.delete("cityId");



    }



    const handleCity = (id, cityName) => {
        setCityId(id);
        setCityName(cityName);

        Url.searchParams.set("cityId", id);



    }

    const handleDistrict = (id, districtName) => {
        setDistrictId(id);
        setDistrictName(districtName);

        Url.searchParams.set("districtId", id);



    }


    const handleLandUse = (id, landUseName) => {
        setLandUseId(id);
        setLandUseName(landUseName);

        Url.searchParams.set("landUseId", id);


    }


    const handleBusinessPlan = (id, businessPlanName) => {
        setBusinessPlanName(businessPlanName);
        setBusinessPlanId(id);

        Url.searchParams.set("businessPlanId", id);




    }



    const handleOwner = (id, ownerName) => {
        setOwnerName(ownerName);
        setOwnerId(id);


        Url.searchParams.set("userId", id);
       
    }

    const handleWltStatus = (id, wltStatusName) => {
        setWltStatusName(wltStatusName);
        setWltStatusId(id);
        Url.searchParams.set("IsWlt", id);



    }
    const handleLandStage = (num) => {
        setLandStage(num);

        Url.searchParams.set("landStage", num);

    }

    function truncate(str, maxlength) {
        return (str.length > maxlength) ?
            str.slice(0, maxlength - 1) + '…' : str;
    }

    function truncatePages(arr, maxlength, pNo) {
        return (arr.length > maxlength) ? arr.slice(pNo - 1, maxlength + pNo) : arr;
    }

    function updateFilters(ele) {
        // console.log(ele,"ele...");
        // console.log(Object.keys(ele)[0],"ele...");

        {



            setFilters(filters.map(filter =>
                Object.keys(filter).includes(Object.keys(ele)[0]) ? { [Object.keys(ele)[0]]: null } : filter
            ));

            switch (Object.keys(ele)[0]) {
                case "Asset": setAssetId(""), setAssetName("Asset"), Url.searchParams.delete("assetId");
                    ;

                    break;
                case "City": setCityId("");
                    setCityName("City");
                    Url.searchParams.delete("cityId");
                    setDistrictId("");
                    setDistrictName("District");
                    Url.searchParams.delete("districtId");

                    break;
                case "District": setDistrictId(""), setDistrictName("District"), Url.searchParams.delete("districtId");
                    break;
                case "Owner": setOwnerId(""), setOwnerName("Owner"), Url.searchParams.delete("userId");
                    break;
                case "Wlt Status": setWltStatusId(""), setWltStatusName("Wlt Status"), Url.searchParams.delete("IsWlt");
                    break;
                case "Business Plan": setBusinessPlanId(""), setBusinessPlanName("Business Plan"), Url.searchParams.delete("businessPlanId");
                    break;
                case "Land Use": setLandUseId(""), setLandUseName("Land Use"), Url.searchParams.delete("landUseId");
                    break;

            }



        }
    }

    const clearFilters = () => {
        setAssetId(""); setAssetName("Asset"); Url.searchParams.delete("assetId");

        setCityId(""); setCityName("City"); Url.searchParams.delete("cityId");

        setDistrictId(""); setDistrictName("District"); Url.searchParams.delete("districtId");

        setOwnerId(""); setOwnerName("Owner");

        setWltStatusId(""); setWltStatusName("Wlt Status"); Url.searchParams.delete("IsWlt");

        setBusinessPlanId(""); setBusinessPlanName("Business Plan"); Url.searchParams.delete("businessPlanId");
        setLandUseId(""); setLandUseName("Land Use"); Url.searchParams.delete("landUseId");
        Url.searchParams.delete("searchText");

    }
    const dispatch=useDispatch()
    const handleNavigation = (card) => {
        if(roleName==="Editor"){
            dispatch(addLandId(card.landId))
        }
        navigate('/land-overview', {
            state: {
              card
            }
        })


    }


    return (
        <>

            <div className="bg-white   py-7 rounded-md">

                <div className={`grid grid-rows-1 ${roleName === "Viewer" ? "grid-cols-[0.5fr_0.4fr_auto_auto_auto_auto_auto_auto] " : "grid-cols-[1fr_0.6fr_0.3fr_0.3fr_0.3fr_0.3fr] "} gap-3 pb-5 px-4 `}>
                    <div className="flex-1">
                        <SearchInput handleSearchText={handleSearchText} Url={Url} />
                    </div>
                    <AssetssInput handleAsset={handleAsset} assetName={truncate(assetName, 14)} visibleInput={visibleInput} setVisibleInput={setVisibleInput} />
                    <Cityinput handleCity={handleCity} cityName={cityName} visibleInput={visibleInput} setVisibleInput={setVisibleInput} assetId={assetId} />
                    <DistricInput handleDistrict={handleDistrict} districtName={districtName} cityId={cityId} assetId={assetId} visibleInput={visibleInput} setVisibleInput={setVisibleInput} />
                    <OwnerInput handleOwner={handleOwner} ownerName={ownerName} visibleInput={visibleInput} setVisibleInput={setVisibleInput} assetId={assetId} cityId={cityId} />
                    <WltStatusInput handleWltStatus={handleWltStatus} wltStatusName={wltStatusName} visibleInput={visibleInput} setVisibleInput={setVisibleInput} />
                    {roleName === "Viewer" && <>
                        <LandUseInput handleLandUse={handleLandUse} landUseName={landUseName} visibleInput={visibleInput} setVisibleInput={setVisibleInput} />
                        <BusinessPlanInput handleBusinessPlan={handleBusinessPlan} businessPlanName={businessPlanName} visibleInput={visibleInput} setVisibleInput={setVisibleInput} />
                    </>}
                </div>
                <hr />

                <div className="flex gap-3 px-4 py-4">
                    {filters.map((ele, index) => {
                        return (
                            ele[Object.keys(ele)] !== null ?
                                <div key={index} className="flex gap-3 ">
                                    <div className="bg-primary-100 py-1 px-3 rounded-lg flex justify-center items-center gap-2">
                                        <div>

                                            <p className="text-primary font-outfit font-normal text-xs leading-6">{Object.keys(ele)}</p>
                                            <p className="text-primary font-outfit font-semibold text-sm leading-6">{Object.values(ele)}</p>
                                        </div>
                                        <button className="h-5 w-5 rounded-[50%] border-2 border-primary flex justify-center items-center " onClick={() => updateFilters(ele)}>
                                            <X className="text-primary h-3 w-3" />
                                        </button>




                                    </div>


                                </div> : null

                        )
                    })}
                    {(assetId !== "" || cityId !== "" || districtId !== "" || ownerId !== "" || wltStatusId !== "" || landUseId !== "" || businessPlanId !== "") ? <button className="text-center font-bold  text-base font-outfit bg-primary text-white py-3 px-6 rounded-lg" onClick={clearFilters}>Clear All</button> : null}
                </div>



            </div >

            {(roleName === "Editor" || roleName === "Approver") && <div className="grid grid-rows-1 grid-cols-5 gap-5">
                <div className="cursor-pointer bg-white mt-6 pt-2 pb-5 ps-6 pe-4 rounded-3xl " onClick={() => handleLandStage(0)}>

                    <div className="flex flex-col ">
                        <div className="flex justify-between">
                            <span className="font-semibold text-[32px] font-outfit text-[#525252]">{totalRequestCount}</span>
                            <img src="src/assets/totalRequests.svg" alt="Requests Icon" />
                        </div>
                        <span className="text-[#858585] font-medium text-base font-outfit">Total Requests </span>
                    </div>



                </div>
                <div className="cursor-pointer bg-white mt-6 pt-2 pb-5 ps-6 pe-4 rounded-3xl" onClick={() => handleLandStage(1)}>
                    <div className="flex flex-col ">
                        <div className="flex justify-between">
                            <span className="font-semibold text-[32px] font-outfit text-[#525252]">{approvedCount}</span>
                            <img src="src/assets/ApprovedIcon.svg" alt="Approved Icon" />
                        </div>

                        <span className="text-[#858585] font-medium text-base font-outfit">Approved</span>
                    </div>
                </div>
                <div className="cursor-pointer" onClick={() => handleLandStage(4)}>
                    <div className="flex flex-col bg-white mt-6 pt-2 pb-5 ps-6 pe-4 rounded-3xl">
                        <div className="flex justify-between">
                            <span className="font-semibold text-[32px] font-outfit text-[#525252]">{waitingForApprovalCount}</span>
                            <img src="src/assets/ApprovedIcon.svg" alt="waiting For Approval Icon" />
                        </div>
                        <span className="text-[#858585] font-medium text-base font-outfit">Waiting for approval</span>
                    </div>
                </div>
                <div className="cursor-pointer" onClick={() => handleLandStage(2)}>
                    <div className="flex flex-col bg-white mt-6 pt-2 pb-5 ps-6 pe-4 rounded-3xl">
                        <div className="flex justify-between">
                            <span className="font-semibold text-[32px] font-outfit text-[#525252]">{pendingCount}</span>
                            <img src="src/assets/PendingIcon.svg" alt="Pending Icon" />
                        </div>
                        <span className="text-[#858585] font-medium text-base font-outfit">Pending</span>
                    </div>
                </div>
                <div className="cursor-pointer" onClick={() => handleLandStage(3)}>
                    <div className="flex flex-col bg-white mt-6 pt-2 pb-5 ps-6 pe-4 rounded-3xl">
                        <div className="flex justify-between">
                            <span className="font-semibold text-[32px] font-outfit text-[#525252]" > {sendBackCount}</span>
                            <img src="src/assets/PendingIcon.svg" alt="sendBack Icon" />
                        </div>
                        <span className="text-[#858585] font-medium text-base font-outfit">Rejected / Revert back</span>
                    </div>
                </div>
            </div>}

            {isloading ? <Loader /> :
                <div> {cards?.length > 0 ?
                    roleName === "Approver" ? <Approver cards={cards} /> : <div className="cursor-pointer grid grid-cols-3 gap-[13px] my-6">
                        {cards?.map((card, index) => {
                            return (
                                <div key={index} className=" border rounded-2xl py-8 bg-white" onClick={() => handleNavigation(card)}>
                                    {roleName === "Editor" && <div className={`mx-6 mb-4 py-2 text-center font-outfit font-bold border rounded ${card.status === "Waiting for Approval" ? "bg-secondary-600" : (card.status === "Approved" ? "bg-sucess-700" : "bg-warning-600")}  ${card.status === "Waiting for Approval" ? "border-secondary-600" : (card.status === "Approved" ? "border-sucess-700" : "border-warning-700")}  ${card.status === "Waiting for Approval" ? "text-secondary-400" : (card.status === "Approved" ? "text-sucess" : "text-warning-800")}`}>{card.status}</div>}
                                    <div className="flex justify-between px-6">

                                        <div className="flex flex-col row-span-2">
                                            <p className="font-outfit font-bold text-primary text-base leading-6">{card.referenceNumber}</p>
                                            <p className="font-outfit font-medium text-base leading-[19.2px] text-primary-600">Asset:{card.assetName}</p>
                                            <p className="font-outfit font-medium text-sm leading-[16.8px] text-neutral-700">Sub Asset:{card.subAssetName}</p>
                                        </div>

                                        <div className="flex flex-col">
                                            <div className={`px-4 ${card.landType === "Transactable" ? "bg-secondary-500" : "bg-warning-500"} rounded-lg py-[6px]   flex items-center gap-3 justify-center`}>
                                                <p className={`${card.landType === "Transactable" ? "text-secondary" : "text-warning"} font-outfit font-medium text-base leading-6`} >{card.businessPlan}</p>

                                                {card.landType === "Transactable" && <img src="src/assets/Transactable.svg" alt="" />}
                                                {card.landType === "Non-Transactable" && <img src="src/assets/Non transactible.svg" alt="" />}
                                            </div>
                                            <div className="flex justify-end items-center gap-2">
                                                {(card.landStatus === "Developed") && <Circle className="h-3 w-3 text-sucess bg-sucess rounded-[50%]" />}
                                                {(card.landStatus === "RAW") && <Circle className="h-3 w-3 text-warning bg-warning rounded-[50%]" />}
                                                <p className={`${(card.landStatus) === "Developed" ? "text-sucess" : "text-warning"} font-outfit font-medium text-base leading-6`}>{card.landStatus}</p>

                                            </div>
                                        </div>
                                    </div>

                                    <div className=" bg-primary_yellow-200 px-8 py-4 mt-6">
                                        <div className="flex gap-3">
                                            <div> <img src="src/assets/TDinActive.svg" alt="TD In Active" /></div>
                                            <div className="flex flex-col gap-y-3">
                                                <div className="flex gap-3">
                                                    <img src="src/assets/analy1.svg" alt="" />
                                                    <p className="text-neutral-700 font-outfit font-semibold text-lg leading-[21.6px]">{card.deedOwner}</p>
                                                </div>
                                                <div className="flex gap-3">
                                                    <img src="src/assets/analy2.svg" alt="" />
                                                    <p className="text-neutral-700 font-outfit font-medium text-lg leading-[21.6px]">{card.deedType}</p>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="grid grid-cols-2 grid-rows-2 px-6 pt-4 gap-2  ">
                                        <div className=" min-h[48px ]  bg-primary-100 rounded-[47px] flex items-center gap-2 ">

                                            <div className="bg-primary-200 h-[40px] w-[40px] flex items-center justify-center rounded-[47px] m-1  ">
                                                {
                                                    (
                                                        () => {
                                                            switch (card.landUse) {
                                                                case "Residential":
                                                                    return <img src="src/assets/residential.svg" alt="" />;

                                                                case "Commercial":
                                                                case "Retail Spaces":
                                                                case "Shopping centers":
                                                                case "Malls":
                                                                case "Restaurant":
                                                                case "Hotels and motels":
                                                                case "Office buildings":
                                                                    return <img src="src/assets/Commercial.svg" alt="" />;

                                                                case "Public & Institutional":
                                                                case "Educational":
                                                                case "Schools":
                                                                case "Universities":
                                                                case "Training centers":
                                                                case "Healthcare":
                                                                case "Hospitals":
                                                                case "Hospital":
                                                                case "Clinic":
                                                                case "Health centers":
                                                                case "Mosque":
                                                                case "Government":
                                                                case "Government Offices":
                                                                    return <img src="src/assets/Public & Institutional.svg" alt="" />;
                                                                case "Agricultural":
                                                                case "Farms":

                                                                    return <img src="src/assets/Agricultural.svg" alt="" />;

                                                                case "Industrial":
                                                                case "Manufacturing plants":
                                                                case "Distribution centers":
                                                                case "Research and development facilities":
                                                                case "Warehouses":
                                                                    return <img src="src/assets/industrial.svg" alt="" />;
                                                                case "Mixed-Use":
                                                                    return <img src="src/assets/Mixed Use.svg" alt="" />





                                                                default:
                                                                    break;
                                                            }
                                                        })()
                                                }
                                            </div>

                                            <p className=" text-primaryfont-outfit font-semibold text-sm leading-[16.8px] text-primary ">{card.landUse}</p>
                                        </div>
                                        <div className={`min-h[48px ] ${card.wltStatus === "Yes" ? "bg-sucess-500" : "bg-warning-500"}  rounded-[47px] flex items-center gap-3`}>
                                            <div className={`${card.wltStatus === "Yes" ? "bg-sucess-600" : "bg-warning-600"} h-[40px] w-[40px] flex items-center justify-center rounded-[47px] m-1`}>
                                                <div className={`rounded-[50%] w-5 h-5  border-[1.5px] flex justify-center items-center  ${card.wltStatus === "Yes" ? "border-sucess" : "border-warning"}`}>
                                                    {card.wltStatus === "Yes" && <Check className="text-sucess" />}
                                                    {card.wltStatus === "No" && <Check className="text-warning" />}

                                                </div>
                                            </div>
                                            <p className={`${card.wltStatus === "Yes" ? "text-sucess" : "text-warning"} font-outfit font-semibold text-sm leading-[16.8px] `}>WLT {card.wltStatus}</p>
                                        </div>
                                        <div className="min-h[48px ] bg-primary-100 rounded-[47px] flex items-center gap-3">
                                            <div className="bg-primary-200 h-[40px] w-[40px] flex items-center justify-center rounded-[47px] m-1">
                                                <img src="src/assets/Group 6.svg" alt="" />
                                            </div>
                                            <p className=" text-primary font-outfit font-semibold text-sm leading-[16.8px]  ">{card.cityName}</p>
                                        </div>
                                        <div className="min-h[48px ] flex items-center gap-3  bg-primary-100 rounded-[47px]">
                                            <div className="bg-primary-200 h-[40px] w-[40px] flex items-center justify-center rounded-[47px] m-1 ">
                                                <img src="src/assets/Group 18.svg" alt="" />
                                            </div>
                                            <p className=" text-primary font-outfit font-semibold text-sm leading-[16.8px]  ">{(card.landArea).toLocaleString('en-IN')} m2</p>
                                        </div>


                                    </div>

                                </div>
                            )
                        })}
                    </div>
                    :
                    <div className="h-52 flex justify-center items-center font-outfit text-3xl text-neutral-500">
                        No data Found
                    </div>}

                    {cards && <div className="flex font-outfit gap-2 justify-end mb-4 items-center">
                        <button disabled={pageNumber === 1} className={`${pageNumber === 1 ? `text-neutral-500` : `text-black`} flex justify-between border border-primary-input rounded-[10px] py-3 px-4`} onClick={() => {
                            setPageNumber(Math.max(pageNumber - 1, 1)), Url.searchParams.set("PageNo", Math.max(pageNumber - 1, 1));
                        }}><ChevronLeft className="mr-2" /> Previous</button>

                        {truncatePages(
                            Array.from({ length: totalPages }, (_, index) => {
                                return (
                                    <button key={index} className={`${(pageNumber === index + 1) ? `bg-white text-black border border-primary-input` : `text-neutral-400`} h-12 w-12 rounded-lg  `} onClick={() => { setPageNumber(index + 1), Url.searchParams.set("PageNo", index + 1) }}>{index + 1}</button>
                                )
                            }), 4, pageNumber
                        )}
                        {` ... ${totalPages}`}
                        <button disabled={pageNumber === totalPages} className={`${pageNumber === totalPages ? `text-neutral-500` : `text-black`} flex justify-between border border-primary-input rounded-[10px] py-3 px-4`} onClick={() => { setPageNumber(Math.min(pageNumber + 1, totalPages)), Url.searchParams.set("PageNo", Math.min(pageNumber + 1, totalPages)) }}>Next <ChevronRight className="ml-2" /></button>

                    </div>}

                </div>
            }



        </>
    )
}