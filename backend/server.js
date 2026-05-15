const express = require("express")
const cors = require("cors")
require("dotenv").config()

const adminRoutes = require("./routes/adminRoutes")
const authRoutes = require("./routes/authRoutes")
const userRoutes = require("./routes/userRoutes")
const storeRoutes = require("./routes/storeRoutes")
const ratingRoutes = require("./routes/ratingRoutes")

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/admin", adminRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)
app.use("/api/stores", storeRoutes)
app.use("/api/ratings", ratingRoutes)
app.use("/api/admin", adminRoutes)

app.get("/", (req, res) => {
  res.send("Backend Running")
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
