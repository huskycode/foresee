express = require 'express'
assets = require 'connect-assets'

app = express()
ECT = require('ect');
ectRenderer = ECT({ cache: false, watch: false, root: __dirname + '/../views'  });


server = require('http').createServer(app)
io = require('socket.io').listen(server)

app.use assets()
app.use express.static(process.cwd() + '/public')

app.engine('.ect', ectRenderer.render);

#Func
random = (n) -> require('crypto').randomBytes(n).toString('hex')

#App
app.get('/host/:id', (req, res) -> res.send("ok: " + req.params.id))
app.get('/', (req, res) -> res.render('index.ect', {title:"Foresee", randomRoomNumber:random(10)}))



#Socket.io
io.sockets.on 'connection', (socket) ->
  socket.emit('news', { hello: 'world' })
  socket.on 'my other event', (data) ->
    console.log(data)


server.port = process.env.PORT or process.env.VMC_APP_PORT or 3000

#export app
module.exports = server