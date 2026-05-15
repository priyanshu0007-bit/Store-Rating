const prisma = require("../prisma/prismaClient")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

// REGISTER
const register = async (req, res) => {
  try {
    const { name, email, password, address } = req.body

    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        address,
        role: "USER"
      }
    })

    res.status(201).json({
      message: "User registered successfully",
      user
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Server Error"
    })
  }
}

// LOGIN
const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials"
      })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials"
      })
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d"
      }
    )

    res.status(200).json({
      message: "Login successful",
      token,
      user
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Server Error"
    })
  }
}

module.exports = {
  register,
  login
}