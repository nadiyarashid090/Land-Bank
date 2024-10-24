import { useState,useEffect } from "react";
import axios from "axios";
const useGetAllAssets=()=>{
    const [landCards,setLandCards]=useState([]);
    async function getLandAssets() {
        try {
            const response = await axios.get("http://68.178.165.107:5001/api/Asset/GetAllAssets");
           setLandCards(response.data.data);
           console.log(landCards);
           return landCards;
           
        }
        catch (err) {
            console.log(err)
        }
    }
    useEffect(()=>{
        getLandAssets();
    },[])
}
export default useGetAllAssets;