import express from 'express'
import { userSignupAndLogin,showUser,verifyOtp } from '../controller/'
import{userValidation,verifyOtpValidation} from '../validation'
import {accessTokenVerify} from '../middleware'
const router = express.Router()
router.post('/',userValidation,userSignupAndLogin)
router.post('/verifiedOpt',verifyOtpValidation,verifyOtp)
router.get('/',accessTokenVerify,showUser)
export = router