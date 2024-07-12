import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

  async function LoginHandle(ev) {
    ev.preventDefault();
    try {
      await axios.post("/login", { username, password });
      alert("Login succesful");
      navigate("/admin");
    } catch (error) {
      alert("Login failed");
    }
  }

  // if (redirect) {
  //   return <Navigate to={"/admin"} />;
  // }

  return (
    <div>
      <header>
        <nav className="flex justify-center items-center gap-2 p-2 bg-dark-green">
          <img src={"/images/appbar-logo.svg"} className="h-11" alt="logo" />
          <span className="md:text-2xl">PETERNAK NING SALATIGA</span>
        </nav>
      </header>

      <div className="md:w-[30rem] md:mx-auto px-14 py-5 my-20 mx-10 shadow-md bg-[#f5f5f5]">
        <h1 className="text-lg">Login Admin</h1>
        <form action="" className="mt-4 " onSubmit={LoginHandle}>
          <label className="label-login" htmlFor="username">
            Username
          </label>
          <input
            required
            type="text"
            value={username}
            onChange={(ev) => setUsername(ev.target.value)}
          />
          <label className="label-login" htmlFor="username">
            Password
          </label>
          <input
            required
            type="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button className="mt-2 bg-gradient button-login w-full p-2 rounded-md">
            LOGIN
          </button>
          <br />
          <div className="flex flex-col w-full mt-2 gap-1 text-center">
            <Link
              to={"/register"}
              className="underline text-blue-600 w-full label-login"
            >
              Register here
            </Link>
            <Link
              to={"/"}
              className="underline text-blue-600 w-full label-login"
            >
              Back to home
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
