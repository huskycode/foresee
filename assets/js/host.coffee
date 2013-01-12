root = exports ? this

root.initPage = (socketUrl) ->
  socket = io.connect(socketUrl)

  socket.on('news', (data) ->
    console.log(data)
  )

  $("#btn").click -> socket.emit('my other event', { my: 'data' })

