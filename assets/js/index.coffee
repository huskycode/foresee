$ ->
  $("#createRoom").click( () ->
     roomname = $("#id").val()
     document.location = "host/" + roomname
     return false
  )
