import jwt from 'jsonwebtoken'
import prisma from '../lib/prisma.js'

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id: +decoded.id,
      },
      select: {
        id: true,
      },
    })
    req.user = user
    req.token = token
    next()
  } catch (e) {
    console.log(e)
    res.status(401).send({ error: e })
  }
}

export default auth