const express = require("express")

const router = express.Router()

const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

const authMiddleware = require("../middleware/authMiddleware")

const roleMiddleware = require("../middleware/roleMiddleware")

router.get(
  "/users",
  authMiddleware,
  roleMiddleware("ADMIN"),
  async (req, res) => {

    try {

      const users = await prisma.user.findMany()

      res.json(users)

    } catch (error) {

      console.log(error)

      res.status(500).json({
        message: "Server Error"
      })

    }

  }
)

module.exports = router