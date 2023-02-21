import { useEffect, useRef, useState } from 'react'
import api from '../../api'

import './styles.css';

function Main() {
  const [userList, setUserList] = useState([])
  const nameInputRef = useRef(null)
  const emailInputRef = useRef(null)

  const getUsers = async () => {
    const users = await api.get('/users')
    setUserList(users.data)
  }

  const handleSetNewUser = async (event) => {
    event.preventDefault()
    const { value: name } = nameInputRef.current
    const { value: email } = emailInputRef.current

    await api.post('/users', {
      name,
      email,
      password: '1234'
    })

    getUsers()
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div className="wrapper">
      <form>
        <input
          ref={nameInputRef}
          type="text"
          placeholder="Name"
        />
        <input
          ref={emailInputRef}
          type="email"
          placeholder="E-mail"
        />
        <button
          type="submit"
          onClick={handleSetNewUser}
        >Cadastrar</button>
      </form>
      <ul className="user-container">
        <h2>Users</h2>
        {
          userList.map(user => <li key={user.id}>{user.name}</li>)
        }
      </ul>
    </div>
  );
}

export default Main;
