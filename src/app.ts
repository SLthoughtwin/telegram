import express from 'express'
import {port} from './config/'
import dotenv from 'dotenv';
dotenv.config();
import {Request ,Response} from 'express'
import {errorHandler} from './config/errorHandler'
import Route from './routes'
import db from './db/models'
const app = express()
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use('/v1/user',Route.userRouter)
app.use('/v1/request',Route.requestRouter)
app.use('/v1/message',Route.messageRouter)
app.use('*',(_:Request,res:Response)=>{
    return res.status(404).json({
        error:{
            statusCode:404,
            message: "route not found"
        }
    });
})
app.use(errorHandler)
 db.sequelize.authenticate({logging:false}).then((d:any)=>{
     console.log("db connect successfully")
 }).catch((error:any)=>{
    console.log("db not connect",error)
 })
app.listen(port, () => {
    console.log(`listening on port ${port}!`);
})