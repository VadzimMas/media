import {useAddPhotoMutation, useFetchPhotosQuery} from "../store"
import Button from "./Button"
import PhotosListItem from "./PhotosListItem"
import Skeleton from "./Skeleton"

function PhotosList({album}) {

  const {data, isFetching, error} = useFetchPhotosQuery(album)
  const [addPhoto] = useAddPhotoMutation()


  let content
  if (isFetching) {
    content = <Skeleton className="w-8 h-8" times={4}/>
  } else if (error) {
    content = "Error fetching photos..."
  } else {
    content = data.map((photo) => {
      return <PhotosListItem key={photo.id} photo={photo}/>
    })
  }

  return (
    <div>
      <div className="flex flex-row justify-between items-center">
        <h3>Photos in Album : {album.title}</h3>
        <Button
          className="border-2 border-gray-500 rounded"
          primary
          onClick={() => addPhoto(album)}
        >
          Add Photo
        </Button>
      </div>
      <div className="flex mx-8 flex-row flex-wrap justify-center">
        {content}
      </div>
    </div>
  )
}

export default PhotosList