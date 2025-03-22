const express = require('express')

const app = express()

const dotenv = require('dotenv')

const { router } = require('./routers/routes')

app.use('/numbers',router)

dotenv.config()

app.listen(process.env.PORT, () => {
    console.log(`Port running on ${process.env.PORT}`)
})

