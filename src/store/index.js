import {configureStore} from "@reduxjs/toolkit"
import {usersReducer} from "./slices/userSlice"
import {setupListeners} from "@reduxjs/toolkit/query"
import {albumsApi} from "./apis/albumsApi"

const store = configureStore({
  reducer: {
    users: usersReducer,
    [albumsApi.reducerPath]: albumsApi.reducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(albumsApi.middleware)
  }
})


setupListeners(store.dispatch)

export default store
export * from "./thunks/fetchUsers"
export * from "./thunks/addUser"
export * from "./thunks/deleteUser"
export {
  useFetchAlbumsQuery,
  useAddAlbumMutation
} from "./apis/albumsApi"