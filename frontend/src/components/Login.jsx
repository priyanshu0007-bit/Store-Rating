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
        "http://localhost:5000/api/auth/login",
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

    } catch (error) {

      console.log(error)

      toast.error("Invalid Credentials")

    }

  }

  return (

    <div className="flex justify-center items-center min-h-screen bg-gray-100">

      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-xl w-[350px] flex flex-col gap-4"
      >

        <h1 className="text-3xl font-bold text-center mb-4">
          Login
        </h1>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-3 rounded-lg"
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-3 rounded-lg"
        />

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg"
        >
          Login
        </button>

      </form>

    </div>

  )

}

export default Login