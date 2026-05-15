const prisma = require("../prisma/prismaClient")

// ADD STORE
const addStore = async (req, res) => {

  try {

    const { name, email, address, ownerId } = req.body

    const store = await prisma.store.create({
      data: {
        name,
        email,
        address,
        ownerId
      }
    })

    res.status(201).json({
      message: "Store added successfully",
      store
    })

  } catch (error) {

    console.log(error)

    res.status(500).json({
      message: "Server Error"
    })

  }

}

// GET ALL STORES
const getStores = async (req, res) => {

  try {

    const stores = await prisma.store.findMany({
      include: {
        ratings: true,
        owner: true
      }
    })

    const formattedStores = stores.map(store => {

      const totalRatings = store.ratings.length

      const avgRating =
        totalRatings > 0
          ? (
              store.ratings.reduce(
                (sum, r) => sum + r.rating,
                0
              ) / totalRatings
            ).toFixed(1)
          : 0

      return {
        id: store.id,
        name: store.name,
        email: store.email,
        address: store.address,
        owner: store.owner.name,
        averageRating: avgRating
      }

    })

    res.status(200).json(formattedStores)

  } catch (error) {

    console.log(error)

    res.status(500).json({
      message: "Server Error"
    })

  }

}

const ownerDashboard = async (req, res) => {

  try {

    const ownerId = req.user.id

    const stores = await prisma.store.findMany({
      where: {
        ownerId
      },
      include: {
        ratings: {
          include: {
            user: true
          }
        }
      }
    })

    const result = stores.map(store => {

      const totalRatings = store.ratings.length

      const avgRating =
        totalRatings > 0
          ? (
              store.ratings.reduce(
                (sum, r) => sum + r.rating,
                0
              ) / totalRatings
            ).toFixed(1)
          : 0

      return {

        storeName: store.name,

        averageRating: avgRating,

        usersWhoRated: store.ratings.map(r => ({
          userName: r.user.name,
          email: r.user.email,
          rating: r.rating
        }))

      }

    })

    res.status(200).json(result)

  } catch (error) {

    console.log(error)

    res.status(500).json({
      message: "Server Error"
    })

  }

}
module.exports = {
  addStore,
  getStores,
  ownerDashboard
}