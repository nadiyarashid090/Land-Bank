import { createSlice } from "@reduxjs/toolkit";
const UpdatedLandOverViewSlice = createSlice({
  name: "LandOverView",
  initialState: {
    details: {
      area: null,
      blockNo: null,
      businessPlanDetailedId: null,
      businessPlanId: null,
      businessPlanStatusId: null,
      comment: null,
      commentId: null,
      districtId: null,
      infraApproval: null,
      infraContraction: null,
      investmentScope: 0,
      landId: 0,
      landInformation: null,
      landStatusId: null,
      landTypeId: null,
      landUseId: null,
      location: null,
      mapUrl: null,
      masterPlan: null,
      masterPlanNo: null,
      munHandingOver: null,
      plotNumber: null,
      subAssetId: null,
      subLandTypeId: null,
      subLandUseId: null,
      wltStatus: null,
    },
  },
  reducers: {
    addLandId: (state, action) => {
      state.details.landId = action.payload;
    },
    addArea: (state, action) => {
      state.details.area = action.payload;
    },
    addDistrict: (state, action) => {
      state.details.districtId = action.payload;
    },
    addLandInformation: (state, action) => {
      state.details.landInformation = action.payload;
    },
    addPlotnumber: (state, action) => {
      state.details.plotNumber = action.payload;
    },
    addMasterPlanNumber: (state, action) => {
      state.details.masterPlanNo = action.payload;
    },
    addBlockNumber: (state, action) => {
      state.details.blockNo = action.payload;
    },
    addLandUseId: (state, action) => {
        state.details.landUseId = action.payload;
      },
  },
});
export default UpdatedLandOverViewSlice.reducer;
export const {
  addArea,
  addDistrict,
  addLandId,
  addLandInformation,
  addPlotnumber,
  addMasterPlanNumber,
  addBlockNumber,
  addLandUseId
} = UpdatedLandOverViewSlice.actions;
