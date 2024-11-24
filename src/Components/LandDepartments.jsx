import { useState, useEffect } from "react";
import LandUseInput from "./ui/LandUseInput";
import { useDispatch, useSelector } from "react-redux";
import {
  addBlockNumber,
  addLandInformation,
  addMasterPlanNumber,
} from "./ui/Slice";
import axios from "axios";
import { baseurl } from "./globals/constants";
import OwnerInput from "./ui/OwnerInput";
import StatusInput from "./ui/StatusInput";

export default function LandDepartments({
  setDepartment,
  landDetails,
  department,
  edit,
  handleLandUse,
  landUseName,
  visibleInput,
  setVisibleInput,
  plotNumber,
  setPlotNumber,
  ownerName,
  handleOwner,
  TDTName,
  handleTDT,
  TDNumber,
  handleTDNumber


}) {
  const token = localStorage.getItem("Token");

  const [editOwnerShipDetails, setEditOwnerShipDetails] = useState(null);
  const [updateButton, setUpdateButton] = useState(null);





  const dispatch = useDispatch();
  const handlelandInformation = (e) => {
    dispatch(addLandInformation(e.target.value));
  };
  const handleMasterPlanNumberChange = (e) => {
    dispatch(addMasterPlanNumber(e.target.value));
  };
  const handleBlockNumberChange = (e) => {
    dispatch(addBlockNumber(e.target.value));
  };
  const selector = useSelector((store) => store.LandOverView.details);
  console.log("selector", selector);
  const updateLandDetails = async () => {
    try {
      const response = await axios.post(
        `${baseurl}/Land/UpdateLandOverview`,
        { ...selector },
        {
          headers: {
            Authorization: `Bearer ${token}  `,
          },
        }
      );
      console.log("response", response);
      setDepartment("ownership");
    } catch (err) {
      console.log("err", err);
    }
  };
  return (
    <>
      <div className="px-8">
        <div className="flex gap-2 font-outfit font-bold text-base text-[#706444] mt-16">
          <button
            onClick={() => setDepartment("landoverview")}
            className={`outline-none py-2 px-3 ${department === "landoverview" ? "bg-[#CEC6AF]" : "bg-[#EFECE4]"
              }  rounded-t-lg`}
          >
            Land Overview
          </button>
          <button
            onClick={() => setDepartment("ownership")}
            className={`outline-none py-2 px-3 ${department === "ownership" ? "bg-[#CEC6AF]" : "bg-[#EFECE4]"
              } rounded-t-lg`}
          >
            Ownership

          </button>
          <button
            onClick={() => setDepartment("sales")}
            className={`outline-none py-2 px-3 ${department === "sales" ? "bg-[#CEC6AF]" : "bg-[#EFECE4]"
              } rounded-t-lg`}
          >
            Sales
          </button>
          <button
            onClick={() => setDepartment("documents")}
            className={`outline-none py-2 px-3 ${department === "documents" ? "bg-[#CEC6AF]" : "bg-[#EFECE4]"
              } rounded-t-lg`}
          >
            Documents
          </button>
          <button
            onClick={() => setDepartment("development")}
            className={`outline-none py-2 px-3 ${department === "development" ? "bg-[#CEC6AF]" : "bg-[#EFECE4]"
              } rounded-t-lg`}
          >
            Development
          </button>
          <button
            onClick={() => setDepartment("leased")}
            className={`outline-none py-2 px-3 ${department === "leased" ? "bg-[#CEC6AF]" : "bg-[#EFECE4]"
              } rounded-t-lg`}
          >
            Leased
          </button>
        </div>
      </div>
      <hr className="text-primary" />

      {(() => {
        switch (department) {
          //  LANDOVERVIEW TAB START ..............
          case "landoverview":
            return (
              <div className="p-8 font-outfit box-border ">
                <h1 className=" font-semibold text-[32px] leading-6 text-[#7A7474] mb-6">
                  Landoverview
                </h1>
                {edit ? (
                  <textarea
                    className="border border-primary-200  w-full rounded-xl outline-none p-4  "
                    onChange={(e) => handlelandInformation(e)}
                    placeholder="Enter Land Description"
                  />
                ) : (
                  <h2 className="font-normal text-[#7A7474] text-base mb-3">
                    Land Description
                  </h2>
                )}
                <p className="text-[#A5A1A1] font-normal text-base mb-3">
                  {landDetails?.landInformation}
                </p>
                <div className="flex flex-col gap-3">
                  <div className="grid grid-cols-[70%_30%] grid-rows-1 gap-3">
                    {/* MasterPlan & Infra Details Start  */}
                    <div className="bg-primary-100 rounded-2xl p-8">
                      <h2 className="text-primary font-semibold text-[20px] leading-6">
                        MasterPlan & Infra Details
                      </h2>
                      <div className="grid grid-rows-2 grid-cols-3">
                        <div className="mb-2">
                          <h3 className="font-normal text-base text-[#7A7474] mb-1">
                            MasterPlan No
                          </h3>
                          {edit ? (
                            <input
                              type="text"
                              className="border border-primary-200 p-3 rounded-md outline-none "
                              placeholder="Enter Masterplan No"
                              onChange={(e) => handleMasterPlanNumberChange(e)}
                            />
                          ) : (
                            <p className="font-semibold text-[#655F5F]">
                              {landDetails?.masterPlanNo
                                ? landDetails?.masterPlanNo
                                : "NA"}
                            </p>
                          )}
                        </div>
                        <div className="mb-2">
                          <h3 className="font-normal text-base text-[#7A7474] mb-1">
                            Plot No
                          </h3>
                          {edit ? (
                            <input
                              type="text"
                              value={plotNumber}
                              onChange={(e) => handlePlotNumber(e)}
                              className="border border-primary-200 p-3 rounded-md outline-none "
                            />
                          ) : (
                            <p className="font-semibold text-[#655F5F]">
                              {landDetails?.plotNumber}
                            </p>
                          )}
                        </div>
                        <div className="mb-2">
                          <h3 className="font-normal text-base text-[#7A7474] mb-1">
                            Block No
                          </h3>
                          {edit ? (
                            <input
                              type="text"
                              className="border border-primary-200 p-3 rounded-md outline-none "
                              placeholder="Enter Block No"
                              onChange={(e) => handleBlockNumberChange(e)}
                            />
                          ) : (
                            <p className="font-semibold text-[#655F5F]">
                              {landDetails?.blockNo
                                ? landDetails?.blockNo
                                : "NA"}
                            </p>
                          )}
                        </div>
                        <div className="mb-2">
                          <h3 className="font-normal text-base text-[#7A7474] mb-1">
                            MasterPlan Status
                          </h3>
                          <p className="font-semibold text-[#655F5F]">
                            {landDetails?.masterplan}
                          </p>
                        </div>
                        <div className="mb-2">
                          <h3 className="font-normal text-base text-[#7A7474] mb-1">
                            Infra Approval Status
                          </h3>
                          <p className="font-semibold text-[#655F5F]">
                            {landDetails?.infraApproval}
                          </p>
                        </div>
                        <div className="mb-2">
                          <h3 className="font-normal text-base text-[#7A7474] mb-1">
                            Infra Contraction Status
                          </h3>
                          <p className="font-semibold text-[#655F5F]">
                            {landDetails?.infraContraction}
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* MasterPlan & Infra Details End  */}

                    {/* Investment Scope Deails Start */}
                    <div className="bg-primary-100 rounded-2xl p-8">
                      <h2 className="text-primary font-semibold text-[20px] leading-6 mb-2">
                        Investment Scope Details
                      </h2>
                      <div>
                        <h3 className="font-normal text-base text-[#7A7474] mb-2 ">
                          Investment Scope
                        </h3>
                        <p className="font-semibold text-[#655F5F]">
                          {landDetails?.investmentScope}
                        </p>
                      </div>
                    </div>
                    {/* Investment Scope Deails End*/}
                  </div>
                  <div className="grid grid-rows-[1fr_0.5fr] grid-cols-2 gap-3 ">
                    {/* Map start */}
                    <div className="row-span-2  h-full w-full bg-primary-50 rounded-2xl"></div>
                    {/* Map End */}

                    {/* landUse & BusinessPlan Start */}
                    <div className="bg-primary-100 rounded-2xl p-8">
                      <h2 className="text-primary font-semibold text-[20px] leading-6">
                        Land Use & Business Plan
                      </h2>
                      <div className="grid grid-cols-3 grid-rows-1">
                        <div>
                          <h3 className="font-normal text-base text-[#7A7474] mb-1">
                            Land Type
                          </h3>
                          <p className="font-semibold text-[#655F5F]">
                            {landDetails?.landType}
                          </p>
                        </div>
                        {landDetails?.landType === "Non-Transactable" && (
                          <div>
                            <h3 className="font-normal text-base text-[#7A7474] mb-1">
                              Non-Transactable Type
                            </h3>
                            <p className="font-semibold text-[#655F5F]">
                              {landDetails?.subLandType}
                            </p>
                          </div>
                        )}
                        <div>
                          <h3 className="font-normal text-base text-[#7A7474] mb-1">
                            Land Status
                          </h3>
                          <p className="font-semibold text-[#655F5F]">
                            {landDetails?.landStatus}
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 grid-rows-1">
                        <div>
                          <h3 className="font-normal text-base text-[#7A7474] mb-1">
                            land Use
                          </h3>
                          {edit ? (
                            <LandUseInput
                              handleLandUse={handleLandUse}
                              landUseName={landUseName}
                              visibleInput={visibleInput}
                              setVisibleInput={setVisibleInput}
                            />
                          ) : (
                            <p className="font-semibold text-[#655F5F]">
                              {landDetails?.landUse}
                            </p>
                          )}
                        </div>
                        <div>
                          <h3 className="font-normal text-base text-[#7A7474] mb-1">
                            Sub Land Use
                          </h3>
                          <p className="font-semibold text-[#655F5F]">
                            {landDetails?.subLandUse}
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-rows-1 grid-cols-3">
                        <div>
                          <h3 className="font-normal text-base text-[#7A7474] mb-1">
                            Business Plan
                          </h3>
                          <p className="font-semibold text-[#655F5F]">
                            {landDetails?.businessPlan}
                          </p>
                        </div>
                        <div>
                          <h3 className="font-normal text-base text-[#7A7474] mb-1">
                            Business Plan Detail
                          </h3>
                          <p className="font-semibold text-[#655F5F]">
                            {landDetails?.businessPlanDetail
                              ? landDetails?.businessPlanDetail
                              : "NA"}
                          </p>
                        </div>
                        <div>
                          <h3 className="font-normal text-base text-[#7A7474] mb-1">
                            Business Plan Status
                          </h3>
                          <p className="font-semibold text-[#655F5F]">
                            {landDetails?.businessPlanStatus}
                          </p>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-normal text-base text-[#7A7474] mb-1">
                          Comments (Optional)
                        </h3>
                        <p className="font-semibold text-[#655F5F]">
                          {landDetails?.ntComment
                            ? landDetails?.ntComment
                            : "No Comments"}
                        </p>
                      </div>
                    </div>
                    {/* landUse & BusinessPlan End */}

                    {/* Land Area Start */}
                    <div className="bg-primary-100 rounded-2xl p-8">
                      <h2 className="text-primary font-semibold text-[20px] leading-6">
                        Land Areas
                      </h2>
                      <div className="grid grid-cols-3 grid-rows-1">
                        <div>
                          <h3 className="font-normal text-base text-[#7A7474] mb-1">
                            TD
                          </h3>
                          <p className="font-semibold text-[#655F5F]">
                            {landDetails?.area} sqft
                          </p>
                        </div>
                        <div>
                          <h3 className="font-normal text-base text-[#7A7474] mb-1">
                            Survey
                          </h3>
                          <p className="font-semibold text-[#655F5F]">NA</p>
                        </div>
                        <div>
                          <h3 className="font-normal text-base text-[#7A7474] mb-1">
                            Kuruki
                          </h3>
                          <p className="font-semibold text-[#655F5F]">NA</p>
                        </div>
                      </div>
                    </div>
                    {/* Land Area End */}
                  </div>
                </div>
              </div>
            );
          // LANDOVERVIEW TAB END ................

          //  OWNER TAB START .................
          case "ownership":
            return (
              <div className="font-outfit p-8 box-border">
                <h1 className=" font-semibold text-[32px] leading-6 text-[#7A7474] mb-6">
                  {" "}
                  Ownership Details
                </h1>
                {/* {console.log(landDetails?.ownerShipDetails)} */}
                <table className="bg-[#DFD9CA]/25 rounded-lg p-6 border-separate w-full text-base border-spacing-x-0 border-spacing-y-[10px] font-outfit ">
                  <thead className="pb-3">
                    <tr className="text-left">
                      <td className="table-cell border-primary-500 border-b py-3">
                        <div className="border-primary-500 font-bold whitespace-nowrap  px-2 font text-primary ">
                          #
                        </div>
                      </td>
                      <td className=" border-primary-500 border-b py-3">
                        {" "}
                        <div className="border-primary-500 font-bold whitespace-nowrap border-r px-2 font text-primary">
                          TD Number
                        </div>
                      </td>
                      <td className=" border-primary-500 border-b py-3">
                        {" "}
                        <div className="border-primary-500 font-bold whitespace-nowrap border-r px-2 font text-primary">
                          TD Owner
                        </div>
                      </td>
                      <td className=" border-primary-500 border-b py-3">
                        {" "}
                        <div className="border-primary-500 font-bold whitespace-nowrap border-r px-2 font text-primary">
                          TD Type
                        </div>
                      </td>
                      <td className=" border-primary-500 border-b py-3">
                        {" "}
                        <div className="border-primary-500 font-bold whitespace-nowrap border-r px-2 font text-primary">
                          TD Date
                        </div>
                      </td>
                      <td className=" border-primary-500 border-b py-3">
                        {" "}
                        <div className="border-primary-500 font-bold whitespace-nowrap border-r px-2 font text-primary">
                          Updated By
                        </div>
                      </td>
                      <td className=" border-primary-500 border-b py-3">
                        {" "}
                        <div
                          className={`border-primary-500 font-bold whitespace-nowrap ${edit && "border-r"
                            } px-2 font text-primary`}
                        >
                          TD File
                        </div>
                      </td>
                      {edit && (
                        <td className=" border-primary-500 border-b py-3">
                          {" "}
                          <div className="border-primary-500 font-bold whitespace-nowrap  px-2 font text-primary">
                            Update
                          </div>
                        </td>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {landDetails?.ownerShipDetails?.map(
                      (ownerShipDetail, index) => {
                        return (
                          <tr
                            key={index}
                            className="cursor-pointer bg-[#EFECE4] "
                          >
                            <td className="py-3 rounded-l-lg px-2 border-primary-300 ">
                              <div className="py-[6px] text-neutral-600  border-r">
                                0{index + 1}
                              </div>
                            </td>
                            <td className="py-3  px-2 border-primary-300  ">
                              {(edit && editOwnerShipDetails === index) ? (
                                <div className="py-[6px] border-primary-300 border-r text-neutral-600">
                                <input className="p-2 border  border-primary rounded outline-none" value={TDNumber[index]} onChange={(e) => {handleTDNumber(e.target.value,index) }} />
                                </div>) : (
                                <div className="py-[6px] border-primary-300 border-r text-neutral-600">
                                  {ownerShipDetail.deedNumber}
                                </div>
                              )}
                            </td>

                            <td className="py-3  px-2 border-primary-300  ">



                              {(edit && editOwnerShipDetails === index) ? (
                                
                                <div className="py-[6px] border-primary-300 border-r text-neutral-600 pr-2">

                                <StatusInput
                                  statusType={"owner"}
                                  visibleInput={visibleInput}
                                  setVisibleInput={setVisibleInput}
                                  handleOwner={handleOwner}
                                  ownerName={(ownerName[index]) ? ownerName[index] : ["select"]}
                                  handleTDT={handleTDT}
                                  TDTName={(TDTName[index]) ? TDTName[index] : ["Select"]}
                                  index={index}

                                />
                                </div>


                              ) : (
                                <div className="py-[6px] border-primary-300 border-r text-neutral-600">
                                  {ownerShipDetail.owner
                                    ? ownerShipDetail.owner
                                    : "NA"}
                                </div>
                              )}
                            </td>
                            <td className="py-3  px-2 border-primary-300  ">

                              {(edit && editOwnerShipDetails === index) ? (
                                
                                <div className="py-[6px] border-primary-300 border-r text-neutral-600 pr-2">
                                <StatusInput
                                  statusType={"TDT"}
                                  visibleInput={visibleInput}
                                  setVisibleInput={setVisibleInput}
                                  handleOwner={handleOwner}
                                  ownerName={(ownerName[index]) ? ownerName[index] : ["select"]}
                                  handleTDT={handleTDT}
                                  TDTName={(TDTName[index]) ? TDTName[index] : ["Select"]}
                                  index={index}
                                />
                                </div>

                              ) : (
                                <div className="py-[6px] border-primary-300 border-r text-neutral-600">
                                  {ownerShipDetail.deedType
                                    ? ownerShipDetail.deedType
                                    : "NA"}
                                </div>
                              )}
                            </td>
                            <td className="py-3  px-2 border-primary-300  ">
                              <div className="py-[6px] border-primary-300 border-r text-neutral-600">
                                {ownerShipDetail.deedDate
                                  ? ownerShipDetail.deedDate
                                  : "NA"}
                              </div>
                            </td>
                            <td className="py-3  px-2 border-primary-300  ">
                              <div className="py-[6px] border-primary-300 border-r text-neutral-600">
                                {ownerShipDetail.updatedBy
                                  ? ownerShipDetail.updatedBy
                                  : "NA"}
                              </div>
                            </td>
                            <td className="py-3 rounded-r-lg px-2 border-primary-300 overflow-hidden ">
                              <div
                                className={`py-[6px] border-primary-300 ${edit && " border-r"
                                  } text-neutral-600`}
                              >
                                {"NA"}
                              </div>
                            </td>
                            {(edit && updateButton !== index) && (
                              <td className="py-3 rounded-r-lg px-2 border-primary-300 overflow-hidden ">
                                <div className="py-[6px] border-primary-300  text-neutral-600 ">
                                  <button
                                    className="bg-primary-200 text-neutral-600 px-6 border rounded-md text-lg"
                                    onClick={() => {
                                      setEditOwnerShipDetails(index),
                                        setUpdateButton(index);
                                      console.log(editOwnerShipDetails);
                                    }}
                                  >
                                    Edit
                                  </button>
                                </div>
                              </td>
                            )}
                            {(edit && updateButton === index) && (
                              <td className="py-3 rounded-r-lg px-2 border-primary-300 overflow-hidden ">
                                <div className="py-[6px] border-primary-300  text-neutral-600 ">
                                  <button
                                    className="bg-primary-200 text-neutral-600 px-6 border rounded-md text-lg"
                                    onClick={() => {
                                      console.log("updated");


                                    }}
                                  >
                                    Update
                                  </button>
                                </div>
                              </td>
                            )}
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>
              </div>
            );

          // OWNER TAB END ...............

          // SALES TABS START
          case "sales":
            return (
              <div className="m-8">
                <h2 className="text-2xl font-semibold  text-primary">
                  Rett Information
                </h2>
                <div className="flex justify-between gap-2 flex-wrap rounded-lg bg-[#DFD9CA]/25 px-8 py-6 font-outfit">
                  <div className="flex justify-between gap-8 ">
                    <div className="flex flex-col gap-2">
                      <h3 className="font-normal text-base text-neutral-400">
                        RETT Number
                      </h3>
                      <p className="font-semibold text-lg text-primary-600">
                        {landDetails.saleDetails.reetNumber}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3 className="font-normal text-base text-neutral-400">
                        RETT Amount
                      </h3>
                      <p className="font-semibold text-lg text-primary-600">
                        {landDetails.saleDetails.reetAmount}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3 className="font-normal text-base text-neutral-400">
                        RETT Status
                      </h3>
                      <p className="font-semibold text-lg text-primary-600">
                        {landDetails.saleDetails.reetStatus}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3 className="font-normal text-base text-neutral-400">
                        RETT Date
                      </h3>
                      <p className="font-semibold text-lg text-primary-600">
                        {landDetails.saleDetails.reetDate}
                      </p>
                    </div>
                  </div>
                  <div></div>
                </div>
              </div>
            );

          // SALES TAB END

          default:
            break;
        }
      })()}
      {edit && (
        <div className="flex justify-end">
          <button
            onClick={updateLandDetails}
            className="py-3 px-8 mx-8 font-outfit bg-primary text-white text-bold text-lg rounded-lg"
          >
            Save and Next
          </button>
        </div>
      )}
    </>
  );
}
