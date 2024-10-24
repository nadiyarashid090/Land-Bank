import { Search } from "lucide-react";
export default function SearchInput({handleSearchText,Url}) {
    const handleSearchInput=(val)=>{
        handleSearchText(val);
     
        
        if(val===""){
            Url.searchParams.delete("searchText");

        }
    }
    
    
    return (
        <div>
            <div className="flex  justify-between border border-muted py-4 px-6 rounded-[10px]">
           
                <input type="text"  onChange={(e) => handleSearchInput(e.target.value) } placeholder="Search by keyword"  className="outline-none placeholder:text-primary placeholder:text-base placeholder:font-normal placeholder:font-outfit w-full" /><Search size="1.2rem" className="text-primary " /></div>
        </div>
    )
}