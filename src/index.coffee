express = require 'express'
assets = require 'connect-assets'

app = express()


server = require('http').createServer(app)
io = require('socket.io').listen(server)

app.use assets()
app.use express.static(process.cwd() + '/public')

app.set('view engine', 'ejs')

#App
app.get('/', (req, res) -> res.sendfile(__dirname + '/index.html'))
app.get('/view', (req, res) -> res.render('index', {"title":"The index page"}))

#Socket.io
io.sockets.on 'connection', (socket) ->
  socket.emit('news', { hello: 'world' })
  socket.on 'my other event', (data) ->
    console.log(data)


server.port = process.env.PORT or process.env.VMC_APP_PORT or 3000

#export app
module.exports = server