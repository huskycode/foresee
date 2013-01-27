$ ->
  url = $("#url").val()
  socketUrl = $("#socketUrl").val()
  roomId = $("#roomId").val()

  socket = io.connect(socketUrl)

  socket.on('voteRefresh', (data) ->
    alert(data.room)
  )

  $("#link").click ->
    window.open(url, "Join", "width=320,height=480,top=50,left=25,toolbar=0,resizable=0,menubar=0")
    false

  $("#btn").click -> socket.emit('my other event', { my: 'data' })



