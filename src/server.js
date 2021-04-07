import express from 'express'
import http from 'http'
import compression from 'compression'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import bodyParser from 'body-parser'
import cors from 'cors'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import memoryStore from 'session-memory-store'
import path from 'path'

// Initialzing packages
const app = express()
const server = http.createServer(app)
const store = memoryStore(session)
const corsOptions = {
    origin: '*'
}
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 1000,
    message: "DDOS detected"
})

require('dotenv').config()

// Middlewares
app.use(session({
    name: 'JSESSION',
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    store: new store({
        expires: 60 * 60 * 12
    })
}))

app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store')
    next()
})

// Settings
app.set('port', process.env.PORT || 3000)
app.use(helmet())
app.use(compression())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser('secret'))
app.use(cors(corsOptions))
app.use(limiter)
app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine','ejs')
app.set('views','src/views')

//Routes
app.use(require('./routers/common'))
app.use(require('./routers/collector'))
app.use(require('./routers/manager'))
app.use(require('./routers/accountant'))
app.use(require('./routers/director'))

// Start the server
server.listen(app.get('port'), '0.0.0.0', () => {
    console.log('Server on port', app.get('port'))
})

export default server