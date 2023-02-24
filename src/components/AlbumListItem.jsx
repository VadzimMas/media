import Button from "./Button"
import {useDeleteAlbumMutation} from "../store"
import {GoTrashcan} from "react-icons/go"
import ExpandablePanel from "./ExpandablePanel"
import PhotosList from "./PhotosList"

function AlbumListItem({album}) {

  const [deleteAlbum, results] = useDeleteAlbumMutation()

  const header = (
    <>
      <Button
        loading={results.isLoading}
        onClick={() => deleteAlbum(album)}
        danger
        className=" mr-3 border-2 border-gray-500 rounded"
      >
        <GoTrashcan/>
      </Button>
      {album.title}
    </>
  )

  return (
    <div>
      <ExpandablePanel
        header={header}
      >
        <PhotosList album={album}/>
      </ExpandablePanel>
    </div>
  )
}

export default AlbumListItem