export default function Approver({ cards }) {
    console.log(cards);

    return (
        <>
            <div className="bg-white my-8 p-6 rounded-2xl">
                <table className="border-separate w-full text-base border-spacing-x-0 border-spacing-y-[10px] font-outfit ">
                    <thead className="pb-3">
                        <tr className="text-left">
                            <td className="table-cell border-primary-500 border-b py-3"><div className="border-primary-500 whitespace-nowrap border-r px-2 font text-primary ">#</div></td>
                            <td className=" border-primary-500 border-b py-3"> <div className="border-primary-500 whitespace-nowrap border-r px-2 font text-primary">Ref ID</div></td>
                            <td className=" border-primary-500 border-b py-3"> <div className="border-primary-500 whitespace-nowrap border-r px-2 font text-primary">Asset Name</div></td>
                            <td className=" border-primary-500 border-b py-3"> <div className="border-primary-500 whitespace-nowrap border-r px-2 font text-primary">TD Number</div></td>
                            <td className=" border-primary-500 border-b py-3"> <div className="border-primary-500 whitespace-nowrap border-r px-2 font text-primary">Owner Name</div></td>
                            <td className=" border-primary-500 border-b py-3"> <div className="border-primary-500 whitespace-nowrap border-r px-2 font text-primary">Created Date</div></td>
                            <td className=" border-primary-500 border-b py-3"> <div className=" whitespace-nowrap  px-2 font text-primary">status</div></td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cards?.map((card, index) => {
                                return (
                                    <tr key={index} className="bg-[#EFECE480] ">
                                        <td className="py-3 rounded-l-lg px-2 border-primary-300 "><div className="py-[6px] text-neutral-600">{card.landId}</div></td>
                                        <td className="py-3  px-2 border-primary-300  "><div className="py-[6px] border-primary-300 border-r text-neutral-600">{card.referenceNumber}</div></td>
                                        <td className="py-3  px-2 border-primary-300  "><div className="py-[6px] border-primary-300 border-r text-neutral-600">{card.assetName}</div></td>
                                        <td className="py-3  px-2 border-primary-300  "><div className="py-[6px] border-primary-300 border-r text-neutral-600">{card.tdNo}</div></td>
                                        <td className="py-3  px-2 border-primary-300  "><div className="py-[6px] border-primary-300 border-r text-neutral-600">{card.deedOwner}</div></td>
                                        <td className="py-3  px-2 border-primary-300  "><div className="py-[6px] border-primary-300 border-r text-neutral-600">{card.tdDate}</div></td>
                                        <td className="py-3 rounded-r-lg px-2 border-primary-300 "><div
                                            className={`py-[6px] 
                                    ${card.status === "Data Not Submitted" && "text-[#F79708]"} 
                                    ${card.status === "Waiting for Approval" && "text-[#487ADA]"}
                                    ${card.status === "Approved" && "text-sucess"}
                                     ${card.status === "Rejected" && "text-[#F2440D]"}
                                      ${card.status === "Pending" && "text-[#F79708]"}
                                     text-neutral-600`}>
                                            <span
                                                className={`w-3 h-3 mx-2 inline-block rounded-full
                                             ${card.status === "Waiting for Approval" && "bg-[#487ADA]"} 
                                             ${card.status === "Data Not Submitted" && "bg-[#F79708]"}
                                              ${card.status === "Approved" && "bg-sucess"}
                                               ${card.status === "Rejected" && "bg-[#F2440D]"}
                                                 ${card.status === "Pending" && "bg-[ #F79708]"}

                                             `}>
                                            </span>{card.status}</div></td>
                                         
                                            
                                    </tr>
                                )
                            }

                            )
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}