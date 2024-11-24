export default function TitleDeed({titleDeed}){
    // console.log(titleDeed);
    

    return(
        <>
        <div className="bg-[#f0f5f2] font-outfit flex flex-col gap-2 border rounded-b-[24px] px-8 py-6 min-w-[250px]">
            <h1 className="font-bold text-[18px] leading-[21.6px] text-neutral-600">Title deed</h1>
            <p className="flex flex-col "> <span className="font-normal text-base text-[#7b7b7b]">Status</span><span className="flex justify-center items-center border border-[#299764] rounded-lg py-2 px-4 text-sucess font-bold text-base min-h-8">{(titleDeed?.deedStatus)?titleDeed?.deedStatus:"NA"}</span></p>
            <p className="flex flex-col"><span  className="font-normal text-base text-[#7b7b7b]">Number</span><span className="font-semibold  text-base text-neutral-700">{(titleDeed?.deedNumber)?titleDeed?.deedNumber:"NA"}</span></p>
            <p className="flex flex-col"><span className="font-normal text-base text-[#7b7b7b]">Owner</span> <span className="font-semibold  text-base text-neutral-700">{(titleDeed?.owner)?titleDeed?.owner:"NA"}</span></p>
            <p className="flex flex-col"><span className="font-normal text-base text-[#7b7b7b]">Type</span> <span className="font-semibold  text-base text-neutral-700">{(titleDeed?.deedType)?titleDeed?.deedType:"NA"}</span></p>
        </div>

        </>
    )
}