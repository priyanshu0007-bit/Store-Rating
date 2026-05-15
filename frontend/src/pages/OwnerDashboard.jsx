import { useEffect, useState } from "react"
import axios from "axios"

import Navbar from "../components/Navbar"

function OwnerDashboard() {

  const [stores, setStores] = useState([])

  const fetchOwnerDashboard = async () => {

    try {

      const token = localStorage.getItem("token")

      const response = await axios.get(
        "https://store-rating-h4lp.onrender.com/api/stores/owner-dashboard",
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

    fetchOwnerDashboard()

  }, [])

  return (

    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="p-6">

        <h1 className="text-3xl font-bold mb-6">
          Owner Dashboard
        </h1>

        {stores.map((store, index) => (

          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg p-6 mb-6"
          >

            <h2 className="text-2xl font-bold mb-3">
              {store.storeName}
            </h2>

            <h3 className="text-lg font-semibold mb-4">
              Average Rating:
              {" "}
              {store.averageRating}
            </h3>

            <h3 className="text-xl font-semibold mb-4">
              Users Who Rated
            </h3>

            {store.usersWhoRated.map((user, i) => (

              <div
                key={i}
                className="border-t pt-4 mt-4"
              >

                <p>
                  <span className="font-semibold">
                    Name:
                  </span>
                  {" "}
                  {user.userName}
                </p>

                <p>
                  <span className="font-semibold">
                    Email:
                  </span>
                  {" "}
                  {user.email}
                </p>

                <p>
                  <span className="font-semibold">
                    Rating:
                  </span>
                  {" "}
                  {user.rating}
                </p>

              </div>

            ))}

          </div>

        ))}

      </div>

    </div>

  )

}

export default OwnerDashboard