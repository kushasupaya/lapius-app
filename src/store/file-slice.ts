import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type FileData = File | Blob | string;

export interface FilesState {
  files: Array<FileData>;
  currentFile: FileData | null;
}

const initialState: FilesState = {
  files: [],
  currentFile: null,
};

const fileSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {
    addFile: (state, action: PayloadAction<FileData>) => {
      state.files.push(action.payload);
    },

    addFiles: (state, action: PayloadAction<FileData[]>) => {
      state.files = [...state.files, ...action.payload];
    },

    clearFiles: (state) => {
      state.files = [];
      state.currentFile = null;
    },

    setCurrentFile: (state, action: PayloadAction<FileData | null>) => {
      state.currentFile = action.payload;
    },
  }
});

export const { 
  addFile, 
  addFiles,
  clearFiles, 
  setCurrentFile,
} = fileSlice.actions;

export default fileSlice.reducer;
