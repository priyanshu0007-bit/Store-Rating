import { toast } from "react-toastify"
import { useEffect, useState } from "react"
import axios from "axios"

import Navbar from "../components/Navbar"

function UserDashboard() {

  const [stores, setStores] = useState([])
  const [search, setSearch] = useState("")

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

    fetchStores()

  }, [])

  const filteredStores = stores.filter((store) =>

    store.name.toLowerCase().includes(search.toLowerCase()) ||

    store.address.toLowerCase().includes(search.toLowerCase())

  )

  return (

    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="p-6">

        <h1 className="text-3xl font-bold mb-4">
          User Dashboard
        </h1>

        <input
          type="text"
          placeholder="Search stores..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-3 rounded-xl w-[300px] shadow-sm"
        />

        <h2 className="text-2xl font-semibold mt-6 mb-4">
          All Stores
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">

          {filteredStores.map((store) => (

            <div
              key={store.id}
              className="bg-white rounded-2xl shadow-lg p-5 hover:scale-105 transition"
            >

              <h3 className="text-2xl font-bold mb-2">
                {store.name}
              </h3>

              <p className="text-gray-600 mb-2">
                {store.address}
              </p>

              <p className="mb-2">
                <span className="font-semibold">
                  Average Rating:
                </span>
                {" "}
                {store.averageRating}
              </p>

              <p className="mb-4">
                <span className="font-semibold">
                  Owner:
                </span>
                {" "}
                {store.owner}
              </p>

              <select
                className="border p-2 rounded-lg mt-3 w-full"
                onChange={async (e) => {

                  try {

                    const token = localStorage.getItem("token")

                    await axios.post(
                      "http://localhost:5000/api/ratings/submit",
                      {
                        storeId: store.id,
                        rating: Number(e.target.value)
                      },
                      {
                        headers: {
                          Authorization: `Bearer ${token}`
                        }
                      }
                    )

                    toast.success("Rating Submitted")

                    fetchStores()

                  } catch (error) {

                    console.log(error)

                    toast.error("Failed to submit rating")

                  }

                }}
              >

                <option value="">
                  Rate Store
                </option>

                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>

              </select>

            </div>

          ))}

        </div>

      </div>

    </div>

  )

}

export default UserDashboard