import React, {useEffect} from "react"
import {useSelector} from "react-redux"
import {addUser, fetchUsers} from "../store"
import Skeleton from "./Skeleton"
import Button from "./Button"
import useThunk from "../hooks/useThunk"
import UsersListItem from "./UsersListItem"

function UsersList() {
  const [doFetchUsers, isFetchUsersLoading, fetchUsersError] = useThunk(fetchUsers)
  const [doCreateUser, isCreateUserLoading, createUserError] = useThunk(addUser)

  const {data} = useSelector((state) => state.users)

  useEffect(() => {
    doFetchUsers()
  }, [doFetchUsers])

  let content
  if (isFetchUsersLoading) {
    content = <Skeleton times={6} className="h-10 w-full"/>
  } else if (fetchUsersError) {
    content = <div>{fetchUsersError.message}</div>
  } else {
    content = data.map((user) => <UsersListItem key={user.id} user={user}/>)
  }


  return (
    <div>
      <div className="flex flex-row justify-between items-center m-3">
        <h1 className="m-2 text-3xl font-bold ">Users</h1>
        {createUserError && <span>Error creating user...</span>}
        <Button
          loading={isCreateUserLoading}
          onClick={() => doCreateUser()}
          primary
          className=" mr-3 border-2 border-gray-500 rounded"
        >
          <span>+ Add User</span>
        </Button>
      </div>
      <div>{content}</div>
    </div>
  )
}

export default UsersList