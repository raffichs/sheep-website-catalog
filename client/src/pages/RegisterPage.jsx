import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  async function registerUser(ev) {
    ev.preventDefault();
    try {
      await axios.post("/register", {
        name,
        username,
        password,
      });
    } catch (error) {
      alert("username is used");
    }
  }

  return (
    <div className="p-20">
      <h1>Register</h1>
      <form action="" onSubmit={registerUser}>
        <input
          type="text"
          placeholder="John Doe"
          value={name}
          onChange={(ev) => setName(ev.target.value)}
        />
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
        <button type="submit" className="hover:text-xs">
          Register
        </button>{" "}
        <br />
        <Link to={"/login"} className="underline">
          Login here
        </Link>
      </form>
    </div>
  );
}
