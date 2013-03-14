getParticipantsLis = (participantNames) ->
  lis = []
  for item,index in participantNames
    lis.push("<li>"+item+" [<a href='#' class='removeParticipant' participant_name='"+item+"'>x</a>]</li>" )
  return lis.join("\n")

getStoriesLis = (stories) ->
  lis = []
  for item,index in stories
    lis.push("<li>"+item+"</li>" )
  return lis.join("\n")

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


  result = ""
  for n in names
    result += "<div class='card_holder'><div class='card'>" + getCardFace(displayNumbers, votes[n]) + "</div>" + n + "</div>"

  result += "<div style='clear:both'></div>"

  $("#cards").html(result)

generateQRCode = () ->
  return 'text';


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
      populateCards(data.votes)

  )

  $(document).on("click", "a.removeParticipant", (evt) ->
    participantName = $(evt.srcElement).attr("participant_name")
    console.log("Removing participant with name : " + participantName)
    socket.emit("removeParticipant", {room: roomId, name:participantName})
  )

  i = 0

  $("#link").click ->
    top = 0 + (550*(i%2))
    left = 25 + (330*Math.floor(i/2))

    window.open(url, "Join" +(i++), "width=320,height=480,top=#{top},left=#{left},toolbar=0,resizable=0,menubar=0", false)
    false

  $("#btn").click -> socket.emit('my other event', { my: 'data' })

  $("#addStory").click ->
    $.ajax
      url: "/story/add/room/#{roomId}/story/#{$("#storyDesc").val()}"
      success: (data, textStatus, jqXHR) ->
        # TODO: It's better when server send only recent added story,
        #       so we don't need to empty storyPile and readd whole stories.
        storyPile = $("#story-pile")
        storyPile.empty()
        $.each data, (item) ->
          storyPile.append "<li>#{item}</li>"
      error: (jqXHR, textStatus, errorThrown) ->
        alert(errorThrown)

exports = this
exports.generateQRCode = generateQRCode
