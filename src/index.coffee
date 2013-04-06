express = require 'express'
assets = require 'connect-assets'

app = express()
ECT = require('ect')
ectRenderer = ECT({ cache: false, watch: false, root: __dirname + '/../views'  })

server = require('http').createServer(app)
io = require('socket.io').listen(server)
io.set('log level', 1)

server.port = process.env.PORT or process.env.VMC_APP_PORT or 3000

app.use assets()
app.use express.static(process.cwd() + '/public')

app.engine('.ect', ectRenderer.render)

#modules
core = require("./core").core
route = require("./route").route

#Socket.io
clientSockets = []
sendRefreshMessage = (socket, room) -> socket.emit('voteRefresh', {room: room, votes: core.listParticipants(room) })

io.sockets.on 'connection', (socket) ->
  clientSockets.push(socket)

  socket.on 'removeParticipant', (data) ->
    core.removeParticipant(data.room, data.name)
    clientSockets.forEach (item, i) ->
      sendRefreshMessage(item, data.room)

  socket.on 'ask', (data) ->
    sendRefreshMessage(socket, data.room)

  socket.on 'vote', (data) ->
    core.vote(data.room, data.name, data.vote)
    clientSockets.forEach (item, i) ->
      sendRefreshMessage(item, data.room)

  socket.on 'my other event', (data) ->
    console.log(data)

  socket.on 'disconnect', () ->
    indexToRemove = null
    clientSockets.forEach (item, i) ->
      if(item == socket)
        indexToRemove = i

    if(indexToRemove != null)
      clientSockets.splice(indexToRemove,1)

#App

#TODO: This function is duplicate with a code in route.coffee
getSocketUrl = (req) -> "http://" + req.headers.host

app.get('/host/:id', (req, res) -> res.render('host.ect', {
title:"Host - " + req.params.id
, url: "http://" + req.headers.host + "/join/" + req.params.id
, socketUrl: getSocketUrl(req)
, roomId: req.params.id
}))



app.get('/story/add/room/:room/story/:story', route.addStory)
app.get('/join/:id', route.join)
app.get('/', route.index)

app.get('/join/room/:room/name/:name', (req, res) ->
  core.addParticipant(req.params.room, req.params.name)
  clientSockets.forEach (item, i) ->
    sendRefreshMessage(item, req.params.room)

  res.json({ room: req.params.room, name: req.params.name  })
)



#export app
module.exports = server
module.exports.route = route