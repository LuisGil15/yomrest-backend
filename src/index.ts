import express from 'express'
import cors from 'cors'

const app = express()

// Config
app.set("port", process.env.PORT || 3001)
require("./database")

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: true, credentials: true }));

// Routes
app.use('/api/login', require('./controllers/login'))
app.use('/api/local', require('./controllers/local'))

// Server
app.listen(app.get("port"), () => {
    console.log(`Server listening on port ${app.get("port")}`);
})
