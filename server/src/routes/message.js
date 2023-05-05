import express from 'express'

const router = express.Router()

// router.post('/', async (req, res) => {
//   try {
//   } catch (error) {
//     console.log(error)
//     res.status(500).send()
//   }
// })

router.get('/:id', async (req, res) => {
  try {
  } catch (error) {
    console.log(error)
    res.status(500).send()
  }
})

export default router
