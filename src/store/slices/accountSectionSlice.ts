import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AccountSectionState {
  accountSection: string | null;
}

const initialState: AccountSectionState = {
  accountSection: null,
}

export const accountSectionSlice = createSlice({
  name: "accountSection",
  initialState,
  reducers: {
    setAccountSection: (state, action: PayloadAction<string | null>) => {
      state.accountSection = action.payload;
    }
  }
})

export const { setAccountSection } = accountSectionSlice.actions;

export default accountSectionSlice.reducer;