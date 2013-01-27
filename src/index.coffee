express = require 'express'
assets = require 'connect-assets'
cache = require('memory-cache')

app = express()
ECT = require('ect');
ectRenderer = ECT({ cache: false, watch: false, root: __dirname + '/../views'  });

server = require('http').createServer(app)
io = require('socket.io').listen(server)

server.port = process.env.PORT or process.env.VMC_APP_PORT or 3000

app.use assets()
app.use express.static(process.cwd() + '/public')

app.engine('.ect', ectRenderer.render);

#const



#Func
random = (n) -> require('crypto').randomBytes(n).toString('hex')

#core
retainTime = 3600000

core = {
  addParticipant: (room, participant) ->
    data = if(cache.get(room) == null) then cache.put(room, {})
    data[participant] = null
    cache.put(room, data, retainTime)

  removeParticipant: (room, participant) ->
    data = if(cache.get(room) == null) then cache.put(room, {})
    delete data[participant]
    cache.put(room, data, retainTime)

  getData: (room) -> if(cache.get(room) == null) then cache.put(room, {})

  vote: (room, participant, vote) ->
    data = if(cache.get(room) == null) then cache.put(room, {})
    data[participant] = vote
    cache.put(room, data, retainTime)
}

#Socket.io
clientSockets = []
sendRefreshMessage = (socket, room) -> socket.emit('voteRefresh', {room: room, votes: core.getData()})

io.sockets.on 'connection', (socket) ->
  clientSockets.push(socket)
  console.log("Sockets:" + clientSockets.length)

  socket.on 'newParticipant', (data) ->
    console.log("newParticipant" + data)
    core.addParticipant(data.room, data.name)

  socket.on 'ask', (data) ->
    console.log("ask: " + data)

  socket.on 'my other event', (data) ->
    console.log(data)

  socket.on 'disconnect', () ->
    console.log("Disconnect socket")

    console.log("Before sockets:" + clientSockets.length)
    indexToRemove = null
    clientSockets.forEach (item, i) ->
      if(item == socket)
        indexToRemove = i

    if(indexToRemove != null)
      clientSockets.splice(indexToRemove,1)
    console.log("After sockets:" + clientSockets.length)

#App
getSocketUrl = (req) -> "http://" + req.headers.host

app.get('/host/:id', (req, res) -> res.render('host.ect', {
title:"Host"
, url: "http://" + req.headers.host + "/join/" + req.params.id
, socketUrl: getSocketUrl(req)
, roomId: req.params.id
}))
app.get('/join/:id', (req, res) -> res.render('join.ect', {id:req.params.id, socketUrl:getSocketUrl(req)}))
app.get('/', (req, res) -> res.render('index.ect', {title:"Foresee", randomRoomNumber:random(5)}))

app.get('/join/room/:room/name/:name', (req, res) ->
  res.json({ room: req.params.room, name: req.params.name  })
  clientSockets.forEach (item, i) ->
    sendRefreshMessage(item, req.params.room)
)



#export app
module.exports = server