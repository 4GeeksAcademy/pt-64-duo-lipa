import React from 'react';
import '../../styles/loginModal.css';
import { useState } from 'react';
import { useContext } from 'react';
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom';

export function LoginModal({ closeModal }) {
  const { store, actions } = useContext(Context);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()
  async function handleLogin() {
    await actions.handleLogin(login, password);
    closeModal(false)
    navigate("/profilepage")
  }

  return (
    <div className="modal login-modal">
      <div className="modal-content" style={{ background: "#9FA6B2" }} >
        <div>
            <span className="close" onClick={() => closeModal(false)} style={{"marginTop": "-10px"}}>&times;</span>
            <h2>Login</h2>
        </div>
        <form >
          <label htmlFor="username">Username or Email:</label>
          <input type="text" className="form-control border border-0" style={{ background: "#54B4D3" }} placeholder="Username or Email" aria-label="Username" aria-describedby="basic-addon1"
            onChange={(e) => setLogin(e.target.value)} value={login} />
          <label htmlFor="password">Password:</label>
          <input type="password" className="form-control border border-0" style={{ background: "#54B4D3" }} placeholder="Password" aria-label="Password" aria-describedby="basic-addon1"
            onChange={(e) => setPassword(e.target.value)} value={password} />
          <button className="btnModal text-light" onClick={() => handleLogin(login, password)} type="button" style={{ background: "#54B4D3" }}>Log In</button>
        </form>
      </div>
    </div>
  );
}