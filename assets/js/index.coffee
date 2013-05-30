validateRoomName = (roomName) ->
  if (roomName == "")
    return false
  else
    if (roomName.indexOf('#') < 0)
      return true
    else
      return false

window.validateRoomName = validateRoomName

$ ->
  $("#createRoom").click( () ->
    roomname = $("#id").val()
    if (validateRoomName(roomname))
      document.location = "host/" + roomname
    else
      $("#mod_message").html("room name must not be blank.")
    return false
  )
