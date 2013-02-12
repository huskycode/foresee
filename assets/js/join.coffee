roomId = null
name = null
socketUrl = null

socket = null

getCardFace = (displayNumbers, val) ->
  if(val == null)
    return "-"
  else if (displayNumbers)
    return val
  else
    return "?"

countVoted = (votes) ->
  names = Object.keys(votes)
  total = 0
  for n in names
    if(votes[n] != null)
      total++

  return total

populateCards = (votes) ->
  names = Object.keys(votes)
  namesCount = names.length
  votedCount = countVoted(votes)

  displayNumbers = (namesCount == votedCount)

  blocks = ["ui-block-a", "ui-block-b", "ui-block-c"]

  result = ""
  for n, index in names
    blockClass = blocks[(index % 3)]
    result += "<div class='"+blockClass+"'><div class='card_holder'><div class='card'>"+getCardFace(displayNumbers, votes[n])+"</div>"+n+"</div></div>"

  $("#cards").html(result).trigger("create")


$('#p1').live('pagecreate', (e) ->
  roomId = $("#room").val()
  socketUrl = $("#socketUrl").val()

  socket = io.connect(socketUrl)

  socket.on("voteRefresh", (data) ->
    if(data.room == roomId)
      if(name != null && data.votes[name] == undefined)
        #The server does not recognize this name anymore
        $.mobile.changePage('#p1', { transition: "flip"})
      else
        populateCards(data.votes)
  )


  $("#add").click( (e) ->
    name = $("#name").val()

    $.mobile.showPageLoadingMsg()
    $.ajax({
      url: "/join/room/"+roomId+"/name/"+name
      success: (data, textStatus, jqXHR) ->
        $.mobile.hidePageLoadingMsg()

        $.mobile.changePage('#p2', { transition: "flip" })
      error: (jqXHR, textStatus, errorThrown) ->
        alert(errorThrown)
        $.mobile.hidePageLoadingMsg()
    })
  )
)

$('#p2').live('pagecreate', (e) ->
  $("#voteButton").click( (e) ->
    socket.emit("vote", {room: roomId, name:name, vote:$("#vote").val()})
    $.mobile.changePage('#p3', { transition: "slide" })
  )
)


