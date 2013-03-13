$ ->
  $("#createRoom").click( () ->
     roomname = $("#id").val()
     if (roomname)
       document.location = "host/" + roomname
     return false
  )
