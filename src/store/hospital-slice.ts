import { Hospital } from '@/types/hospital';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FilesState {
  hospital: Hospital | null;
  filename: string | null;
}

const initialState: FilesState = {
  hospital: null,
  filename: null,
};

const hospitalSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {
    addHospital: (state, action: PayloadAction<Hospital>) => {
      state.hospital = action.payload;
    },

    addFilename: (state, action: PayloadAction<string>) => {
      state.filename = action.payload;
    },

    removeHospital: (state, action: PayloadAction<Hospital>) => {
      state.hospital = null;
    },

    removePresignedUrl: (state, action: PayloadAction<string>) => {
      state.filename = null;
    },

    clearData: (state) => {
      state.hospital = null;
      state.filename = null;
    },
  }
});

export const { 
  addHospital,
  addFilename,
  removeHospital,
  removePresignedUrl,
  clearData,
} = hospitalSlice.actions;

export default hospitalSlice.reducer;
