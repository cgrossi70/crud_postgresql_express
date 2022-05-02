import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import bodyParser from  'body-parser'
import userRoutes from './routes/users.routes'

dotenv.config()
const port = process.env.PORT || 3000
const app = express()

// Middlewares
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// Routes
app.use('/users',userRoutes)

// Initialize
app.listen(port)
console.log('Server is listening on port ',port)