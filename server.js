const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const logger = require('morgan')
const cors = require('cors')
const passport = require('passport')
const multer = require('multer')

/**
 * IMPORTAR RUTAS
 */

const usersRoutes = require('./routes/userRoutes')

const port = process.env.PORT || 3333

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.use(cors())
app.use(passport.initialize())
app.use(passport.session())

require('./config/passport')(passport)

app.disable('x-powered-by')

app.set('port', port);

const upload = multer({
    storage: multer.memoryStorage()
})

/**
 * LLAMAR A RUTAS
 */

usersRoutes(app, upload)

//Sustituit Ip por la ip del ordenador
const host =  'PONER IP' || '127.0.0.1';

server.listen(3333, host, function() {
    console.log('Aplicacion de NodeJs, puerto ' + port + ' process ' + process.pid + ' IP: ' + host +  ' Iniciada...')
});

//Iniciar el servidor node: node server.js

app.get('/', (req, res) => {
    res.send('ruta raiz del backend')
})

app.get('/test', (req, res) => {
    res.send('Este es una ruta TEST')
})

//ERROR HANDLER

app.use((err, req, res, next) => {
    console.log(err)
    res.status(err.status || 500).send(err.stack)
})
