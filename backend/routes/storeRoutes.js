const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()
const express = require("express")

const router = express.Router()

const authMiddleware = require("../middleware/authMiddleware")
const roleMiddleware = require("../middleware/roleMiddleware")

const {
  addStore,
  getStores,
  ownerDashboard
} = require("../controllers/storeController")

// ADMIN ONLY
router.post(
  "/add",
  authMiddleware,
  roleMiddleware("ADMIN"),
  addStore
)

// ALL LOGGED IN USERS
router.get(
  "/all",
  authMiddleware,
  getStores
)
router.get(
  "/owner-dashboard",
  authMiddleware,
  roleMiddleware("OWNER"),
  ownerDashboard
)
router.delete(
  "/delete/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  async (req, res) => {

    try {

      const { id } = req.params

      await prisma.store.delete({
        where: {
          id: Number(id)
        }
      })

      res.json({
        message: "Store deleted successfully"
      })

    } catch (error) {

      console.log(error)

      res.status(500).json({
        message: "Server Error"
      })

    }

  }
)
module.exports = router