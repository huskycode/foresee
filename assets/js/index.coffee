validateRoomName = (roomName) ->
  if (roomName == "")
    return false
  else
    return (roomName.replace(/[a-z0-9A-Z]/g, "") == "")

window.validateRoomName = validateRoomName

$ ->
  $("#createRoom").click( () ->
    roomname = $("#id").val()
    if (validateRoomName(roomname))
      document.location = "host/" + roomname
    else
      alert "room name must contain only character or number."
    return false
  )
