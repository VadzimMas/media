import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import {faker} from "@faker-js/faker"

const photosApi = createApi({
  reducerPath: "photos",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001"
  }),
  endpoints(build) {
    return {

      fetchPhotos: build.query({
        // sets up tags for tracking data for re-fetching cashed data
        providesTags: (result, error, album) => {
          const tags = result.map((photo) => {
            return {type: "Photo", id: photo.id}
          })
          tags.push({type: "Album", id: album.id})
          return tags
        },
        query(album) {
          return {
            url: "/photos",
            params: {
              albumId: album.id
            },
            method: "GET"
          }
        }
      }),

      addPhoto: build.mutation({
        // tells that object hanged and need to re-fetch data
        invalidatesTags: (result, error, album) => [{type: "Album", id: album.id}],
        query(album) {
          return {
            url: "/photos",
            method: "POST",
            body: {
              albumId: album.id,
              url: faker.image.abstract(100, 100, true)
            }
          }
        }
      }),

      deletePhoto: build.mutation({
        // tells that object hanged and need to re-fetch data
        invalidatesTags: (result, error, photo) => [{type: "Photo", id: photo.id}],
        query(photo) {
          return {
            url: `/photos/${photo.id}`,
            method: "DELETE"
          }
        }
      })
    }
  }
})


export const {
  useFetchPhotosQuery,
  useAddPhotoMutation,
  useDeletePhotoMutation
} = photosApi

export {photosApi}