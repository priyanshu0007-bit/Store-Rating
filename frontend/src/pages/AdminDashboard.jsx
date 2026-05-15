import { toast } from "react-toastify"
import { useEffect, useState } from "react"
import axios from "axios"

import Navbar from "../components/Navbar"

function AdminDashboard() {

  const [users, setUsers] = useState([])
  const [stores, setStores] = useState([])

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")
  const [ownerId, setOwnerId] = useState("")

  const fetchUsers = async () => {

    try {

      const token = localStorage.getItem("token")

      const response = await axios.get(
        "http://localhost:5000/api/admin/users",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      setUsers(response.data)

    } catch (error) {

      console.log(error)

    }

  }

  const fetchStores = async () => {

    try {

      const token = localStorage.getItem("token")

      const response = await axios.get(
        "http://localhost:5000/api/stores/all",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      setStores(response.data)

    } catch (error) {

      console.log(error)

    }

  }

  useEffect(() => {

    fetchUsers()
    fetchStores()

  }, [])

  const createStore = async (e) => {

    e.preventDefault()

    try {

      const token = localStorage.getItem("token")

      await axios.post(
        "http://localhost:5000/api/stores/add",
        {
          name,
          email,
          address,
          ownerId: Number(ownerId)
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      toast.success("Store Added")

      setName("")
      setEmail("")
      setAddress("")
      setOwnerId("")

      fetchStores()

    } catch (error) {

      console.log(error)

      toast.error("Failed to add store")

    }

  }

  const deleteStore = async (id) => {

    try {

      const token = localStorage.getItem("token")

      await axios.delete(
        `http://localhost:5000/api/stores/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      toast.success("Store Deleted")

      fetchStores()

    } catch (error) {

      console.log(error)

      toast.error("Failed to delete store")

    }

  }

  return (

    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="p-6">

        <h1 className="text-3xl font-bold mb-6">
          Admin Dashboard
        </h1>

        <form
          onSubmit={createStore}
          className="bg-white p-6 rounded-2xl shadow-lg flex flex-col gap-4 w-full max-w-md mb-10"
        >

          <h2 className="text-2xl font-semibold">
            Add Store
          </h2>

          <input
            type="text"
            placeholder="Store Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-3 rounded-lg"
          />

          <input
            type="email"
            placeholder="Store Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="border p-3 rounded-lg"
          />

          <input
            type="number"
            placeholder="Owner ID"
            value={ownerId}
            onChange={(e) => setOwnerId(e.target.value)}
            className="border p-3 rounded-lg"
          />

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg"
          >
            Add Store
          </button>

        </form>

        <h2 className="text-2xl font-bold mb-4">
          All Stores
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">

          {stores.map((store) => (

            <div
              key={store.id}
              className="bg-white rounded-2xl shadow-lg p-5"
            >

              <h3 className="text-2xl font-bold mb-2">
                {store.name}
              </h3>

              <p className="mb-2">
                {store.address}
              </p>

              <p className="mb-2">
                Owner:
                {" "}
                {store.owner}
              </p>

              <p className="mb-4">
                Average Rating:
                {" "}
                {store.averageRating}
              </p>

              <button
                onClick={() => deleteStore(store.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Delete Store
              </button>

            </div>

          ))}

        </div>

        <h2 className="text-2xl font-bold mb-4">
          All Users
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {users.map((user) => (

            <div
              key={user.id}
              className="bg-white rounded-2xl shadow-lg p-5"
            >

              <h3 className="text-2xl font-bold mb-2">
                {user.name}
              </h3>

              <p className="mb-2">
                Email:
                {" "}
                {user.email}
              </p>

              <p className="mb-2">
                Address:
                {" "}
                {user.address}
              </p>

              <p className="mb-2">
                Role:
                {" "}
                {user.role}
              </p>

              <p>
                ID:
                {" "}
                {user.id}
              </p>

            </div>

          ))}

        </div>

      </div>

    </div>

  )

}

export default AdminDashboard