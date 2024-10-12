import { useEffect, useState } from "react";
import { CanceledError } from "./services/api-client";
import userService, { User } from "./services/user-service";



function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true);
    const { request, cancel } = userService.getAll<User>()
    request.then(res => {
      setUsers(res.data);
      setIsLoading(false);
    })
      .catch(err => {
        if (err instanceof CanceledError) {
          console.log(err);
          setIsLoading(false);
        }
      })

    return () => cancel();
  }, [])

  const deleteUser = (user: User) => {
    const originalUsers = [...users];
    setUsers(users.filter(u => u.id !== user.id))

    userService.delete(user.id).catch(err => {
      console.log(err.message);
      setUsers(originalUsers); // Set users back to original users
    })
  }

  const addUser = () => {
    const newUser = { id: 1, name: 'Doga' };
    const originalUsers = [...users];

    // setUsers([newUser, ...users])

    userService.create(newUser).then(({ data: savedUser }) => {
      setUsers([savedUser, ...users]); // Add the newly created user to the users array
    })
      .catch(err => {
        console.log(err);
        setUsers(originalUsers); // Set users back to original users
      });
  }

  const updateUser = (user: User) => {
    const originalUsers = [...users];
    const updatedUser = {
      ...user, name: user.name + '!'
    }
    setUsers(users.map(u => u.id === user.id ? updatedUser : u))

    userService.update(updatedUser).catch(err => {
      console.log(err)
      setUsers(originalUsers)
    })
  }


  return (
    <>
      {isLoading && <div className="spinner-border"></div>}
      <button className="btn btn-primary mb-3" onClick={() => addUser()}>Add User</button>
      <ul className="list-group">
        {users.map(user => (
          <li key={user.id} className="list-group-item d-flex justify-content-between">
            {user.name}
            <div>
              <button className="btn btn-outline-secondary mx-1" onClick={() => updateUser(user)}>Update</button>
              <button className="btn btn-outline-danger" onClick={() => deleteUser(user)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}

export default App