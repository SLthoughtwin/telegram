import express from 'express'
import { sendMessage ,showMessage,deleteMessage} from '../controller/'
import {accessTokenVerify,checkId} from '../middleware'
const router = express.Router()
router.route('/:id')
.post(accessTokenVerify,checkId,sendMessage)
.get(accessTokenVerify,checkId,showMessage)
.delete(accessTokenVerify,checkId,deleteMessage)
export = router