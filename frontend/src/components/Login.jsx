import { toast } from "react-toastify"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const handleLogin = async (e) => {

    e.preventDefault()

    try {

      const response = await axios.post(
        "https://store-rating-h4lp.onrender.com/api/auth/login",
        {
          email,
          password
        }
      )

      localStorage.setItem(
        "token",
        response.data.token
      )

      const role = response.data.user.role

      if (role === "ADMIN") {
        navigate("/admin")
      }

      else if (role === "OWNER") {
        navigate("/owner")
      }

      else {
        navigate("/user")
      }

      toast.success("Login Successful")

    } catch (error) {

      console.log(error)

      toast.error("Invalid Credentials")

    }

  }

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 px-4">

      <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-3xl p-10 w-full max-w-md text-white">

        <div className="text-center mb-8">

          <h1 className="text-4xl font-bold mb-2">
            Store Rating App
          </h1>

          <p className="text-gray-200 text-sm">
            Login to manage stores and ratings
          </p>

        </div>

        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-5"
        >

          <div>
            <label className="block mb-2 text-sm font-medium">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-xl bg-white/20 border border-white/30 outline-none placeholder-gray-200 focus:ring-2 focus:ring-white"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-xl bg-white/20 border border-white/30 outline-none placeholder-gray-200 focus:ring-2 focus:ring-white"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-white text-indigo-700 font-semibold py-3 rounded-xl hover:bg-gray-100 transition duration-300 shadow-lg"
          >
            Login
          </button>

        </form>

        <div className="mt-8 text-center text-sm text-gray-200">
          Developed by Priyanshu Ahir
        </div>

      </div>

    </div>

  )

}

export default Login
