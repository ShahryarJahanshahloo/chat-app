import userRouter from './user'
import conversationRouter from './conversation'
import messageRouter from './message'

const router = express.Router()

router.use('/user', userRouter)
router.use('/conversation', conversationRouter)
router.use('/message', messageRouter)

export default router
