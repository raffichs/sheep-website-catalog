import axios from "axios";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  async function LoginHandle(ev) {
    ev.preventDefault();
    try {
      await axios.post("/login", { username, password });
      alert("Login succesful");
      setRedirect(true);
    } catch (error) {
      alert("Login failed");
    }
  }

  if (redirect) {
    return <Navigate to={"/admin"} />;
  }

  return (
    <div className="p-20">
      <h1>Login as Admin</h1>
      <form action="" onSubmit={LoginHandle}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(ev) => setUsername(ev.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button>Login as Admin</button>
        <br />
        <Link to={"/register"} className="underline">
          Register here
        </Link>
      </form>
    </div>
  );
}
