import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,
    expiresAt: localStorage.getItem("expiresAt") || null
  },
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user
      state.token = action.payload.token
      state.expiresAt = action.payload.expiresAt

      localStorage.setItem("user", JSON.stringify(action.payload.user))
      localStorage.setItem("token", action.payload.token)
      localStorage.setItem("expiresAt", action.payload.expiresAt)
    },

    logout: (state) => {
      state.user = null
      state.token = null
      state.expiresAt = null

      localStorage.removeItem("user")
      localStorage.removeItem("token")
      localStorage.removeItem("expiresAt")
    }
  },
})

export const { setCredentials, logout } = authSlice.actions
export default authSlice.reducer
