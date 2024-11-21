import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    PostCreationStart: (state) => {
      state.error = null;
    },
    PostCreationSuccess: (state, action) => {
      state.currentUser = action.payload;

      state.error = null;
    },
    PostCreationFailure: (state, action) => {
      state.error = action.payload;
    },
    signUpFailure: (state, action) => {
      state.error = action.payload;
    },

    signInStart: (state) => {
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;

      state.error = null;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
    },
    updateStart: (state) => {
      state.error = null;
    },
    updateSuccess: (state, action) => {
      state.currentUser = action.payload;

      state.error = null;
    },
    updateFailure: (state, action) => {
      state.error = action.payload;
    },
    deleteUserStart: (state) => {
      state.error = null;
    },
    deleteUserSuccess: (state) => {
      state.currentUser = null;

      state.error = null;
    },
    deleteUserFailure: (state, action) => {
      state.error = action.payload;
    },
    signoutSuccess: (state) => {
      state.currentUser = null;
      state.error = null;
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signoutSuccess,
  signUpFailure,
  PostCreationStart,
  PostCreationSuccess,
  PostCreationFailure,
} = UserSlice.actions;

export default UserSlice.reducer;
