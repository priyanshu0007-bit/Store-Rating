import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom"

import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import Login from "./components/Login"
import ProtectedRoute from "./components/ProtectedRoute"

import AdminDashboard from "./pages/AdminDashboard"
import UserDashboard from "./pages/UserDashboard"
import OwnerDashboard from "./pages/OwnerDashboard"

function App() {

  const token = localStorage.getItem("token")

  return (

    <BrowserRouter>

      <Routes>

        {/* Login Route */}
        <Route
          path="/"
          element={
            token ? <Navigate to="/user" /> : <Login />
          }
        />

        {/* Admin Dashboard */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* User Dashboard */}
        <Route
          path="/user"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        {/* Owner Dashboard */}
        <Route
          path="/owner"
          element={
            <ProtectedRoute>
              <OwnerDashboard />
            </ProtectedRoute>
          }
        />

        {/* 404 Route */}
        <Route
          path="*"
          element={
            <h1 className="text-3xl font-bold text-center mt-20">
              404 Page Not Found
            </h1>
          }
        />

      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
      />

    </BrowserRouter>

  )

}

export default App