import axios from "axios";
import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { baseurl } from "../globals/constants";
import { Search } from "lucide-react";
export default function StatusInput({
    statusType,
    visibleInput,
    setVisibleInput,
    handleOwner,
    ownerName,
    handleTDT,
    TDTName,
    index



}) {
    const [ownerStatus, setOwnerStatus] = useState([]);
    const token = localStorage.getItem("Token");




    const getOwner = async () => {
        try {

            const response = await axios(`${baseurl}/Asset/GetStatus?&statusType=${statusType}`, {
                headers: {
                    Authorization: `Bearer ${token}  `,
                },
            });

            setOwnerStatus(response?.data.data);
            //   console.log("owner.......",response?.data.data);


        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        getOwner();
    }, []);
    const handleClick = (status) => {
        if (statusType === "owner") {
            handleOwner(status,index);
        }
        if (statusType === "TDT") {
           
            
            handleTDT(status,index);
        }

    }


    return (


        <div
            className=" border border-primary-input py-3 px-2 rounded-[10px] relative text-left bg-white"
            onClick={() => {
                setVisibleInput(visibleInput === statusType ? null : statusType);
            }}
        >
            <button className="text-left text-primary font-outfit  w-full  h-full flex justify-between">
                
                {statusType === "owner" ?ownerName:TDTName}
                

                {visibleInput === statusType ? <ChevronUp /> : <ChevronDown />}
            </button>
            {visibleInput === statusType &&
                (ownerStatus.length === 0 ? (
                    <ul className="bg-white w-max outline-none rounded-[10px] border border-primary-input text-base text-primary font-outfit  overflow-y-auto absolute top-20 left-0">
                        <li className="p-2">No Data found</li>
                    </ul>
                ) : (
                    <div
                        className="w-max outline-none border border-primary-input text-base text-primary font-outfit h-52 overflow-y-auto  overflow-x-hidden absolute top-20 left-0  bg-white"

                    >

                        <ul name="" id="">
                            {ownerStatus?.map((owner, index) => {
                                return (
                                    <li
                                        value={owner.id}
                                        key={index}
                                        className="p-2 cursor-pointer hover:bg-slate-50"
                                        onClick={() => {

                                            handleClick(owner.status);

                                        }}
                                    >
                                        {owner.status}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                ))}
        </div>
    );
}
