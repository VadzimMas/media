import {useAddAlbumMutation, useFetchAlbumsQuery} from "../store"
import Skeleton from "./Skeleton"
import Button from "./Button"
import AlbumListItem from "./AlbumListItem"

function AlbumsList({user}) {

  const {data, isFetching, error} = useFetchAlbumsQuery(user)
  const [addAlbum, results] = useAddAlbumMutation()

  let content
  if (isFetching) {
    content = <Skeleton className="h-10 w-full" times={3}/>
  } else if (error) {
    content = <div>Error fetching albums!!!</div>
  } else {
    content = data.map((album) => <AlbumListItem key={album.id} album={album}/>)
  }

  return (
    <div>
      <div className="m-2 flex flex-rpw justify-between items-center ">
        <h3 className="text-xl">Album for : {user.name}</h3>
        <Button
          onClick={() => addAlbum(user)}
          loading={results.isLoading}
          primary
          className=" mr-3 border-2 border-gray-500 rounded"
        >
          + Add Album
        </Button>
      </div>
      <div>
        {content}
      </div>
    </div>
  )
}

export default AlbumsList