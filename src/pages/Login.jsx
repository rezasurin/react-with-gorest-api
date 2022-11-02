import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { fakeLogin } from "../services/authSlice";
import loginStyles from "./styles/Login.module.css";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    if (document.cookie) {
      navigate("/list-customer");
    }
  }, [document.cookie]);

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const resp = await dispatch(fakeLogin(formData));

    if (resp.payload.success) {
      let now = new Date();
      let expireTime = new Date(now.getTime() + 0.4 * 60 * 1000);
      sessionStorage.setItem(
        "user",
        JSON.stringify({ expiresAt: expireTime, user: resp.payload.user })
      );
      document.cookie = `user=${
        resp.payload.user
      };expires=${expireTime.toUTCString()};path=/`;
      alert(resp.payload.message + expireTime);
      navigate("/list-customer");
    } else {
      alert(resp.payload.message);
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div className={loginStyles.loginContainer}>
      <h5>LOGIN PAGE</h5>

      <div className={loginStyles.cardLogin}>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
          }}
          onSubmit={handleSubmitForm}
        >
          <label
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              gap: "0.5rem",
            }}
          >
            Username
            <input
              type="text"
              value={formData.username}
              name="username"
              onChange={onChange}
              style={{
                padding: "0.5rem 0.55rem",
              }}
            />
          </label>

          <label
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              gap: "0.5rem",
            }}
          >
            Password
            <input
              style={{
                padding: "0.5rem 0.55rem",
              }}
              type="password"
              value={formData.password}
              name="password"
              onChange={onChange}
            />
          </label>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
