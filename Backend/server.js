const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./config/mongodb')
const connectCloudinary = require('./config/cloudinary')
const adminRoute = require('./routes/adminRoute')
const doctorRoute = require('./routes/doctorRoute')
const userRoute = require('./routes/userRoute')

dotenv.config()

//app config
const app = express()
const port = process.env.PORT || 4000

//middlewares
app.use(express.json())
app.use(cors())
connectDB()
connectCloudinary()

//api endpoints
app.use('/api/admin', adminRoute) //localhost:4000/api/admin/add-doctor
app.use('/api/doctor', doctorRoute)
app.use('/api/user', userRoute)

app.get('/',(req, res)=>{
    res.send('API WORKING')
})

app.listen(port,() => console.log('Server Started on port:', port))
