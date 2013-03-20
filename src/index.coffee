express = require 'express'
assets = require 'connect-assets'
cache = require('memory-cache')

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

#const



#Func
random = (n) -> require('crypto').randomBytes(n).toString('hex')

#core
retainTime = 3600000

Controller = (dataStore) -> {
addStory: (room, story) ->
  data = @getData(room)
  stories = @listStories(room)
  
  stories[story] = null
  data['stories'] = stories
  dataStore.put(room, data, retainTime)

listStories: (room) ->
  data = @getData(room)
  stories = data['stories']
  stories ?= {}
  return stories

getStoryFromRoom: (room) -> 
  data = dataStore.get(room)
  stories = data['stories']
  stories ?= {}
  return stories

ensureRoomExist: (room) ->
  if not dataStore.get(room)? then dataStore.put(room, {})
  
addParticipant: (room, participant) ->
  data = @getData(room)
  participants = data.participants ? {}

  participants[participant] = null
  data['participants'] = participants
  dataStore.put(room, data, retainTime)

listParticipants: (room) ->
  data = @getData(room)
  console.log(data)
  data.participants ? {}

removeParticipant: (room, participant) ->
  data = @getData(room)
  delete data[participant]
  dataStore.put(room, data, retainTime)

getData: (room) ->
  @ensureRoomExist(room)
  return dataStore.get(room)

vote: (room, participant, vote) ->
  if(dataStore.get(room) == null || dataStore.get(room) == undefined) then dataStore.put(room, {})

  data = dataStore.get(room)
  data[participant] = vote
  dataStore.put(room, data, retainTime)
}
core = Controller(cache)

#Socket.io
clientSockets = []
sendRefreshMessage = (socket, room) -> socket.emit('voteRefresh', {room: room, votes: core.listParticipants(room) })

io.sockets.on 'connection', (socket) ->
  clientSockets.push(socket)
  console.log("Sockets:" + clientSockets.length)

  socket.on 'removeParticipant', (data) ->
    console.log("removeParticipant" + data)
    core.removeParticipant(data.room, data.name)
    clientSockets.forEach (item, i) ->
      sendRefreshMessage(item, data.room)

  socket.on 'ask', (data) ->
    console.log("ask: " + data)
    sendRefreshMessage(socket, data.room)

  socket.on 'vote', (data) ->
    console.log("vote: " + data)
    core.vote(data.room, data.name, data.vote)
    clientSockets.forEach (item, i) ->
      sendRefreshMessage(item, data.room)

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
title:"Host - " + req.params.id
, url: "http://" + req.headers.host + "/join/" + req.params.id
, socketUrl: getSocketUrl(req)
, roomId: req.params.id
}))

route = {
  index: (req, res) -> res.render('index.ect', {title:"Foresee"})
  host: (req, res) -> res.render('join.ect', {id:req.params.id, socketUrl:getSocketUrl(req)})
  addStory: (req, res) ->
    core.addStory(req.params.room, req.params.story)
    res.send(
      core.listStories(req.params.room)
    )
}

app.get('/story/add/room/:room/story/:story', route.addStory)
app.get('/join/:id', route.host)
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
module.exports.core = core
module.exports.cache = cache
