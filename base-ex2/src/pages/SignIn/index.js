import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api'

import './styles.css';

function SignIn() {
  const navigateTo = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault();
    const user = {
      email: "daniel.lopes@cubos.academy",
      password: "abc123"
    }

    const { data } = await api.post('/login', user)
    const { token } = data

    localStorage.setItem('token', token)

    navigateTo('/main')
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder='Email'
        />
        <input
          type="password"
          placeholder="Passsword"
        />
        <button type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default SignIn;
