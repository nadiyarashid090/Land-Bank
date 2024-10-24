import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import {  ChevronLeft,ChevronRight} from "lucide-react";
import Loader from "./Loader";
import SearchInput from "./ui/SearchInput";
import AssetssInput from "./ui/AssetsInput";
import Cityinput from "./ui/CityInput";
import DistricInput from "./ui/DistrictInput";
export default function ViewAllLands() {
    const navigate=useNavigate();
    const token = localStorage.getItem("Token");

    const [landCards, setLandCards] = useState([]);
    const [error, setError] = useState("");
    const [isError, setIsError] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isloading,setisloading]=useState(true);
    const[visibleInput,setVisibleInput]=useState(null);


    const [searchText, setSearchText] = useState('');
    
    function handleSearchText(text) {
        setSearchText(text)
        console.log(searchText);


    }

    const [assetName, setAssetName] = useState("Asset");
    const [assetId, setAssetId] = useState('');

    const handleAsset = (Id, assetname) => {
        setAssetId(Id);
        setAssetName(assetname);
    }

   
    const [cityName, setCityName] = useState("City");
    const [cityId, setCityId] = useState('');
    const handleCity = (id, cityName) => {
        setCityId(id);
        console.log(cityId);
        setCityName(cityName);

    }
   

  
    const [districtId, setDistrictId] = useState('');
    const [districtName, setDistrictName] = useState("District");
    
    const handleDistrict = (id, districtName) => {
        setDistrictId(id);
        setDistrictName(districtName);
        console.log(districtId);
    }

    const getLandCardData = async () => {
        try {

            const response = await axios.get(`https://landbankbe.aiiotgeeks.com/api/Asset/GetAssets?searchText=${searchText}&Pageno=${pageNumber}&Pagesize=12&assetId=${assetId}&cityId=${cityId}&districtId=${districtId}`, {
                headers: {
                    Authorization: `Bearer ${token}  `
                }
            });
            setLandCards(response.data.data);
            setisloading(false);
            setIsError(false);
            setTotalPages(Math.ceil(response?.data.totalCount / 10));
        } catch (err) {
            console.log(err);
            setIsError(true);
            setError((err.response.data.responseException.exceptionMessage[0]?.replace("assets","data"))+"!" );


        }

    }
    useEffect(()=>{
        getLandCardData();
    },[districtId,assetId,searchText,cityId,pageNumber]);

    const handlelandCardClick=(landCard)=>{
        console.log("clicked");
        console.log(landCard);
        
        navigate("/analytics",{state:landCard});

        
        
    }
    function truncate(str, maxlength) {
        return (str.length > maxlength) ?
          str.slice(0, maxlength - 1) + '…' : str;
      }
   
   

    return (
        <>
            <div className="grid grid-cols-[1.5fr_1.5fr_1fr_1fr] gap-3 p-8 bg-white border border-primary-input rounded-2xl mt-10">
                <SearchInput handleSearchText={handleSearchText} />
                <AssetssInput handleAsset={handleAsset} assetName={truncate(assetName, 14)} visibleInput={visibleInput} setVisibleInput={setVisibleInput} />
                    <Cityinput handleCity={handleCity} cityName={cityName} visibleInput={visibleInput} setVisibleInput={setVisibleInput} />
                    <DistricInput handleDistrict={handleDistrict} districtName={districtName} cityId={cityId} visibleInput={visibleInput} setVisibleInput={setVisibleInput} />

            </div>
            { isloading? <Loader/> :  ( isError ? <div className="h-52 flex justify-center items-center font-outfit text-3xl text-neutral-500">{error}</div> :  <div  className=" grid grid-cols-4   gap-6  my-9 ">{landCards?.map((landCard, index) => 
            {
                return (
                    
                    <div onClick={()=>handlelandCardClick(landCard)}  key={index} className="cursor-pointer flex flex-col gap-[15px]  bg-white rounded-xl shadow-md py-4">
                        {/* {console.log(landCard.assetId)} */}
                        <div className="flex items-center gap-6  mx-8 ">
                            <img src="src/assets/Group 1.png" alt="" />
                            <div className="  font-outfit "><h4 className="text-primary w-max  text-base leading-6  font-semibold ">{truncate(landCard.assetName,10)}</h4><p className="text-primary-600 text-base font-medium leading-[19.2px]">Asset code: {landCard.assetCode}</p></div>
                        </div>
                        <div className="flex items-center  bg-primary-50 px-8 py-2  gap-6">
                            <div className="border pt-4 pb-5 px-2 rounded-[50%] bg-primary-100">
                                <img src="src/assets/Group.svg" alt="" />
                            </div>
                            <div className=""><p className="font-normal text-base leading-6 text-neutral-600 font-outfit ">Total Lands</p><p className="font-semibold text-[22px] font-outfit leading-[26.4px] text-neutral-700  ">{landCard.landCount}</p></div>
                        </div>
                        <div className="flex gap-3  px-8"><img src="src/assets/Group 18.svg" alt="" /><p className="text-neutral-700 text-lg leading-[21.6px] font-semibold font-outfit">{landCard.totalArea} m2</p></div>

                        <div className="flex gap-3 px-8"> <img src="src/assets/Group 6.svg" alt="" /><p className="text-neutral-700 text-lg leading-[21.6px] font-semibold font-outfit">{landCard.cityName}</p></div>


                    </div>


                )
            })}</div>
            )}
           {landCards? <div className="flex font-outfit gap-2">
                <button disabled={pageNumber === 1} className={`${pageNumber === 1 ? `text-neutral-500` : `text-black`} flex justify-between border border-primary-input rounded-[10px] py-3 px-4`} onClick={() => {
                    setPageNumber(Math.max(pageNumber - 1, 1));
                }}><ChevronLeft className="mr-2" /> Previous</button>
                
                {Array.from({ length: totalPages }, (_, index) => {
                    return (
                        <button key={index} className={`${(pageNumber === index + 1) ? `bg-white text-black border border-primary-input` : `text-neutral-400`} h-12 w-12 rounded-lg  `} onClick={() => { setPageNumber(index + 1) }}>{index + 1}</button>
                    )
                })}
                <button disabled={pageNumber === totalPages} className={`${pageNumber === totalPages ? `text-neutral-500` : `text-black`} flex justify-between border border-primary-input rounded-[10px] py-3 px-4`} onClick={() => { setPageNumber(Math.min(pageNumber + 1, totalPages)) }}>Next <ChevronRight className="ml-2" /></button>
            </div>:<div className="h-52 flex justify-center items-center font-outfit text-3xl text-neutral-500">No data Found</div>}

        </>
    )

}