import { configureStore } from "@reduxjs/toolkit";
import  UpdatedLandOverViewSlice from "../ui/Slice"
const store=configureStore({
    reducer:{
        LandOverView:UpdatedLandOverViewSlice,
    }
});
export default store;