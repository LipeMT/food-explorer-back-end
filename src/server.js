require('dotenv/config')
require('express-async-errors')
require('events').EventEmitter.defaultMaxListeners = 20;

const uploadConfig = require('./configs/upload')

const cors = require('cors')

const AppError = require('./utils/AppError')

const express = require('express')

const routes = require('./routes')

const app = express()

app.removeAllListeners();

app.use(express.json())

app.use('/files', express.static(uploadConfig.UPLOADS_FOLDER))

app.use(cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true
}));

app.use(routes)

app.use((error, req, res, next) => {
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            status: "error",
            message: error.message
        })
    }
    return res.status(500).json({
        status: "error",
        message: "Internal Server Error"
    })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`))