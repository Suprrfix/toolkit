import { useState } from "react";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { isLoggedIn, login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://optimus-internal.suprrfix.com/api/v1/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber: username,
          password: password,
        }),
      });

      const user = await res.json();
      if (user && user.access_token) {
        localStorage.setItem("token", user.access_token);

        login();

        if (user.role_name === "SUPER_ADMIN") {
          localStorage.setItem("garage_id", null);
          localStorage.setItem("role", 'SUPER_ADMIN');
          navigate("/garage");
        } else {
          localStorage.setItem("garage_id", user.garage_details.garage_id);
          localStorage.setItem("role", 'OWNER');
          navigate(`/garage/${user.garage_details.garage_id}`);
        }
      } else {
        console.log("Login failed: Invalid credentials");
      }
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  return (
    <div className="login-container flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      {isLoggedIn ? (
        <h2>You are already logged in!</h2>
      ) : (
        <form onSubmit={handleLogin} className="space-y-4 md:space-y-6">
          <div className="form-wrapper">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Mobile number:
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="form-wrapper">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Password:
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            
          </div>
          <button 
            className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            type="submit">Login</button>
        </form>
      )}
    </div>
  );
}
