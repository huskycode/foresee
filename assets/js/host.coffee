getParticipantsLis = (participantNames) ->
  lis = []
  for item,index in participantNames
    lis.push("<li>"+item+" [<a href='#' class='removeParticipant' participant_name='"+item+"'>x</a>]</li>" )
  return lis.join("\n")



$ ->
  url = $("#url").val()
  socketUrl = $("#socketUrl").val()
  roomId = $("#roomId").val()

  votes = {}

  socket = io.connect(socketUrl)

  socket.emit("ask", {room: roomId})

  socket.on('voteRefresh', (data) ->
    if(data.room == roomId)
      #only if meesage is for this room.
      #TODO: Partition message by room

      votes = data.votes

      console.log ("vote refreshed: ")
      console.log (data.votes)

      # Update participants list
      participantNames = Object.keys(data.votes)
      $("#participantsCount").html(participantNames.length)
      $("#participants").html( getParticipantsLis(participantNames) )

  )

  $(document).on("click", "a.removeParticipant", (evt) ->
    participantName = $(evt.srcElement).attr("participant_name")
    console.log("Removing participant with name : " + participantName)
    socket.emit("removeParticipant", {room: roomId, name:participantName})
  )

  $("#link").click ->
    window.open(url, "Join", "width=320,height=480,top=50,left=25,toolbar=0,resizable=0,menubar=0")
    false

  $("#btn").click -> socket.emit('my other event', { my: 'data' })



