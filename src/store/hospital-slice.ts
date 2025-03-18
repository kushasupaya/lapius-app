import { Hospital } from '@/types/hospital';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FilesState {
  hospital: Hospital | null;
  presignedUrl: string | null;
}

const initialState: FilesState = {
  hospital: null,
  presignedUrl: null,
};

const hospitalSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {
    addHospital: (state, action: PayloadAction<Hospital>) => {
      state.hospital = action.payload;
    },

    addPresignedUrl: (state, action: PayloadAction<string>) => {
      state.presignedUrl = action.payload;
    },

    removeHospital: (state, action: PayloadAction<Hospital>) => {
      state.hospital = null;
    },

    removePresignedUrl: (state, action: PayloadAction<string>) => {
      state.presignedUrl = null;
    },

    clearData: (state) => {
      state.hospital = null;
      state.presignedUrl = null;
    },
  }
});

export const { 
  addHospital,
  addPresignedUrl,
  removeHospital,
  removePresignedUrl,
  clearData,
} = hospitalSlice.actions;

export default hospitalSlice.reducer;
