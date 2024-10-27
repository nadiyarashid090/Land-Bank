export default function Approver({ cards }) {
   

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
                                    ${card.status === "Data Not Submitted" && "text-[hsl(36,94%,50%)]"} 
                                    ${card.status === "Waiting for Approval" && "text-[#497cda]"}
                                    ${card.status === "Approved" && "text-sucess"}
                                     ${card.status === "Rejected" && "text-[#f2440d]"}
                                      ${card.status === "Pending" && "text-[hsl(36,94%,50%)]"}
                                     text-neutral-600`}>
                                            <span
                                                className={`w-3 h-3 mx-2 inline-block rounded-full
                                             ${card.status === "Waiting for Approval" && "bg-[#497cda]"} 
                                             ${card.status === "Data Not Submitted" && "bg-[hsl(36,94%,50%)]"}
                                              ${card.status === "Approved" && "bg-sucess"}
                                               ${card.status === "Rejected" && "bg-[#f2440d]"}
                                                 ${card.status === "Pending" && "bg-[hsl(36,94%,50%)]"}

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