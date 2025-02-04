require('dotenv/config')
require('express-async-errors')

const cors = require('cors')

const AppError = require('./utils/AppError')

const express  = require('express')

const routes = require('./routes')

const app = express()
app.use(express.json())
app.use(cors({
    origin: process.env.CORS_ORIGINS,
    credentials: true,
}))

app.use(routes)

app.use((error, req, res, next) => {
    if(error instanceof AppError){
        return res.status(error.statusCode).json({
            status: "error",
            message: error.message
        })
    }

    console.error(error)

    return res.status(500).json({
        status: "error",
        message: "Internal Server Error"
    })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`))