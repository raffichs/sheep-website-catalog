import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import PlainHeader from "../../components/PlainHeader";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  async function registerUser(ev) {
    ev.preventDefault();
    try {
      await axios.post("/register", {
        name,
        username,
        password,
      });
      setVisible(true);
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div>
      <PlainHeader />

      <div className="md:w-[30rem] md:mx-auto px-14 py-5 my-20 mx-10 shadow-md bg-[#f5f5f5]">
        <h1 className="text-lg">Register</h1>
        <form action="" className="mt-4" onSubmit={registerUser}>
          <label htmlFor="" className="label-login">
            Name
          </label>
          <input
            required
            type="text"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
          <label htmlFor="" className="label-login">
            Username
          </label>
          <input
            required
            type="text"
            value={username}
            onChange={(ev) => setUsername(ev.target.value)}
          />
          <label htmlFor="" className="label-login">
            Password
          </label>
          <input
            required
            type="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button className="mt-2 bg-gradient button-login w-full p-2 rounded-md">
            REGISTER
          </button>
          <br />
          <div className="mt-2 text-center">
            <div className={`label-login ${visible ? "" : "hidden"}`}>
              Register succesful, please log in
            </div>
            <Link
              to={"/login"}
              className="underline text-blue-600 w-full label-login"
            >
              Login here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
