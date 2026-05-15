import { useNavigate } from "react-router-dom"

function Navbar() {

  const navigate = useNavigate()

  const handleLogout = () => {

    localStorage.removeItem("token")

    navigate("/")

  }

  return (

    <div className="flex justify-between items-center bg-black text-white px-6 py-4 shadow-lg">

      <h1 className="text-2xl font-bold">
        Store Rating App
      </h1>

      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
      >
        Logout
      </button>

    </div>

  )

}

export default Navbar