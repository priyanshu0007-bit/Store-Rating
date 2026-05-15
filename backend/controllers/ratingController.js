const prisma = require("../prisma/prismaClient")

const submitRating = async (req, res) => {

  try {

    const { storeId, rating } = req.body

    const userId = req.user.id

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        message: "Rating must be between 1 and 5"
      })
    }

    const existingRating = await prisma.rating.findFirst({
      where: {
        userId,
        storeId
      }
    })

    // UPDATE EXISTING RATING
    if (existingRating) {

      const updatedRating = await prisma.rating.update({
        where: {
          id: existingRating.id
        },
        data: {
          rating
        }
      })

      return res.status(200).json({
        message: "Rating updated successfully",
        updatedRating
      })

    }

    // CREATE NEW RATING
    const newRating = await prisma.rating.create({
      data: {
        rating,
        userId,
        storeId
      }
    })

    res.status(201).json({
      message: "Rating submitted successfully",
      newRating
    })

  } catch (error) {

    console.log(error)

    res.status(500).json({
      message: "Server Error"
    })

  }

}

module.exports = {
  submitRating
}