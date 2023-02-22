import React from "react"
import Button from "./Button"
import useThunk from "../hooks/useThunk"
import {deleteUser} from "../store"
import {GoTrashcan} from "react-icons/go"
import ExpandablePanel from "./ExpandablePanel"
import AlbumsList from "./AlbumsList"

function UsersListItem({user}) {
  const [doDeleteUser, isDeleteUserLoading, deleteUserError] = useThunk(deleteUser)

  const header = (
    <>
      <Button
        loading={isDeleteUserLoading}
        onClick={() => doDeleteUser(user)}
      >
        <GoTrashcan/>
      </Button>
      <div className="flex p-2 justify-between items-center cursor-pointer">
        {deleteUserError && <div>Error deleting user...</div>}
        {user.name}
      </div>
    </>
  )

  return (
    <ExpandablePanel header={header}>
      <AlbumsList user={user}/>
    </ExpandablePanel>
  )
}

export default UsersListItem