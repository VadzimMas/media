import {useAddAlbumMutation, useFetchAlbumsQuery} from "../store"
import Skeleton from "./Skeleton"
import ExpandablePanel from "./ExpandablePanel"
import Button from "./Button"

function AlbumsList({user}) {

  const {data, isLoading, error} = useFetchAlbumsQuery(user)
  const [addAlbum, results] = useAddAlbumMutation()

  let content
  if (isLoading) {
    content = <Skeleton className="h-10 w-full" times={3}/>
  } else if (error) {
    content = <div>Error fetching albums!!!</div>
  } else {
    content = data.map((album) => {
      const header = <div>{album.title}</div>
      return (
        <ExpandablePanel key={album.id} header={header}>
          List of photos in the album.
        </ExpandablePanel>
      )
    })
  }

  return (
    <div>
      <div className="m-2 flex flex-rpw justify-between items-center ">
        <h3 className="text-lg font-bold">Album for {user.name}</h3>
        <Button
          onClick={() => addAlbum(user)}
          loading={results.isLoading}
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