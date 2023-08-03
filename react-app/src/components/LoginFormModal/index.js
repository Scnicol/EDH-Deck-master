import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const loginUser = async (email, password) => {

    const data = await dispatch(login( email, password ))
    if (data) {
      setErrors(data);
    } else {
        closeModal()
    }
  }

  const loginDemoUser = () => {
    return loginUser('demo@aa.io', 'password');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    return loginUser(email, password);
  }

  return (
    <main className="login-form-main-container">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button className='create-update-buttons' type="submit" disabled={email.length == 0 || password.length == 0}>Log In</button>
      </form>
      <button className='create-update-buttons' onClick={loginDemoUser}>
        Login as DemoUser
      </button>
    </main>
  );
}

export default LoginFormModal;
