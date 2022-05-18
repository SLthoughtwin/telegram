import express from 'express'
import {sendRequest,removeRequest,acceptRequest,blockUser ,showRequest} from '../controller/'
import{userValidation} from '../validation'
import {accessTokenVerify,checkId} from '../middleware'
const router = express.Router()
router.route('/:id')
.post(accessTokenVerify,checkId,sendRequest)
.delete(accessTokenVerify,checkId,removeRequest)
.put(accessTokenVerify,checkId,acceptRequest)
.patch(accessTokenVerify,checkId,blockUser)

router.get('/',accessTokenVerify,showRequest)
export = router