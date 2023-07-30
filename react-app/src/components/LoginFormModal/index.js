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

  const loginUser = (email, password) => {
    console.log(email, password, "credential and password")
    setErrors([]);
    return dispatch(login( email, password ))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        console.log(data.errors, 'Data errors')
        if (data && data.errors) setErrors([data.errors.message]);
      });
  }

  const loginDemoUser = () => {
    return loginUser('demo@aa.io', 'password');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    return loginUser(email, password);
  }

  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
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
        <button type="submit">Log In</button>
      </form>
      <button onClick={loginDemoUser}>
        Login as DemoUser
      </button>
    </>
  );
}

export default LoginFormModal;
