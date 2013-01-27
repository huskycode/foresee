roomId = null
name = null
socketUrl = null

socket = null

$('#p1').live('pagecreate', (e) ->
  roomId = $("#room").val()
  socketUrl = $("#socketUrl").val()

  socket = io.connect(socketUrl)

  socket.on("voteRefresh", (data) ->
    if(name != null && data.votes[name] == undefined)
      #The server does not recognize this name anymore
      $.mobile.changePage('#p1', { transition: "flip"})
  )

  $("#add").click( (e) ->
    name = $("#name").val()

    $.mobile.showPageLoadingMsg()
    $.ajax({
      url: "/join/room/"+roomId+"/name/"+name
      success: (data, textStatus, jqXHR) ->
        $.mobile.hidePageLoadingMsg()

        $.mobile.changePage('#p2', { transition: "flip"})
      error: (jqXHR, textStatus, errorThrown) ->
        alert(errorThrown)
        $.mobile.hidePageLoadingMsg()
    })
  )
)

$('#p2').live('pagecreate', (e) ->

)