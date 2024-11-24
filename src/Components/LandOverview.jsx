import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { baseurl } from "./globals/constants";
import LandInfo from "./ui/LandInfo";
import TitleDeed from "./ui/TitleDeed";
import Loader from "./Loader";
import LandDepartments from "./LandDepartments";

import { useDispatch } from "react-redux";
import { addDistrict, addLandUseId, addPlotnumber } from "./ui/Slice";
export default function LandOverview() {
  const location = useLocation();
  // console.log("location",location);
  const [edit, setEdit] = useState(false);
  const landId = location.state.card.landId;
  const token = localStorage.getItem("Token");
  const [landDetails, setLandDetails] = useState({});
  const [department, setDepartment] = useState("landoverview");
  const [cityId, setCityId] = useState("");
  const [assetId, setAssetId] = useState("");
  const [cityName, setCityName] = useState("City")
  const [districtId, setDistrictId] = useState("");
  const [districtName, setDistrictName] = useState("District");
  const [area, setArea] = useState("");
  const [landUseName, setLandUseName] = useState("Land Use");
  const [landUseId, setLandUseId] = useState("");
  const [plotNumber, setPlotNumber] = useState("");



  const [ownerName, setOwnerName] = useState([]);
  const [TDTName, setTDTname] = useState([]);
  const [TDNumber, setTDNumber] = useState([]);




  const [visibleInput, setVisibleInput] = useState(null);


  const dispatch = useDispatch();




  const getData = async () => {
    try {
      const response = await axios.get(
        token === "Viewer"
          ? `${baseurl}/Land/GetLandDetailsForViewer?&landId=${landId}&deptt=${department}`
          : `${baseurl}/Land/GetLandDetails?&landId=${landId}&deptt=${department}`,

        {
          headers: {
            Authorization: `Bearer ${token}  `,
          },
        }
      );
      setLandDetails(response?.data.data);
      setAssetId(response?.data.data.assetId);
      setCityId(response?.data.data.cityId)
      setCityName(response?.data.data.city);
      setDistrictName(response?.data.data.district);
      setArea(response?.data.data.area);
      setLandUseId(response?.data.data.landUseId);
      setLandUseName(response?.data.data.landUse);
      setPlotNumber(response?.data.data.plotNumber);

      if (department === "ownership") {

        let tempTDTname = [];
        let tempOwnerName = [];
        let TempDeedNumber = [];

        response?.data.data.ownerShipDetails.forEach((detail) => {
          tempTDTname.push(detail.deedType);
          TempDeedNumber.push(detail.deedNumber);

          if (detail.owner) {
            tempOwnerName.push(detail.owner)

          }
        })
        setTDTname([...tempTDTname]);
        setOwnerName([...tempOwnerName]);
        setTDNumber([...TempDeedNumber]);
        console.log("TDTName........", TDTName);
        console.log("ownerName.....", ownerName);
        console.log("....TD Number",TDNumber);
      }




    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getData();


  }, [department]);

  const handleCity = (id, cityName) => {
    setDistrictId("");
    setDistrictName("District");
    dispatch(addDistrict(null));
    setCityId(id);
    setCityName(cityName);
  }

  const handleDistrict = (id, districtName) => {
    setDistrictId(id);
    dispatch(addDistrict(id))

    setDistrictName(districtName);
  }

  const handleLandUse = (id, landUseName) => {
    setLandUseId(id);
    setLandUseName(landUseName);
    dispatch(addLandUseId(id));
  }


  const handlePlotNumber = (e) => {
    setPlotNumber(e.target.value);
    dispatch(addPlotnumber(e.target.value));

  };


  const handleOwner = (Ownerstatus, index) => {
    let tempownername = [...ownerName];
    tempownername[index] = Ownerstatus;
    setOwnerName([...tempownername]);
  };

  const handleTDT = (TDTstatus, index) => {
    let temptdtname = [...TDTName];
    temptdtname[index] = TDTstatus;
    setTDTname([...temptdtname]);
  };
  const handleTDNumber=(num,index)=>{
    let tempTDNumber=[...TDNumber];
    tempTDNumber[index]=num;
    setTDNumber([...tempTDNumber]);

  }





  return (
    <>
      {!landDetails ? (
        <Loader />
      ) : (
        <div className="relative pb-8 bg-white rounded-2xl">
          <LandInfo
            landDetails={landDetails}
            status={location.state.card.status}
            landType={location.state.card.landType}
            edit={edit}
            setEdit={setEdit}
            handleCity={handleCity}
            cityId={cityId}
            cityName={cityName}
            visibleInput={visibleInput}
            setVisibleInput={setVisibleInput}
            assetId={assetId}
            handleDistrict={handleDistrict}
            districtName={districtName}
            area={area}
            setArea={setArea}
            department={department}
          />
          <div className="absolute top-0 right-8">
            <TitleDeed titleDeed={landDetails.titleDeed} edit={edit} />
          </div>
          <LandDepartments
            setDepartment={setDepartment}
            landDetails={landDetails}
            department={department}
            edit={edit}
            handleLandUse={handleLandUse}
            landUseName={landUseName}
            visibleInput={visibleInput}
            setVisibleInput={setVisibleInput}
            plotNumber={plotNumber}
            setPlotNumber={setPlotNumber}
            handlePlotNumber={handlePlotNumber}
            ownerName={ownerName}
            handleOwner={handleOwner}
            TDTName={TDTName}
            handleTDT={handleTDT}
            TDNumber={TDNumber}
            handleTDNumber={handleTDNumber}

          />
        </div>
      )}
    </>
  );
}
