$(function() {
  var i, roomId, socket, socketUrl, url;
  url = $("#url").val();
  socketUrl = $("#socketUrl").val();
  roomId = $("#roomId").val();

  i = 0;
  $("#link").click(function() {
    var left, top;
    top = 0 + (550 * (i % 2));
    left = 25 + (330 * Math.floor(i / 2));
    window.open(url, "Join" + (i++), "width=320,height=480,top=" + top + ",left=" + left + ",toolbar=0,resizable=0,menubar=0", false);
    return false;
  });

  $("#startNow").click(function(){
        var startText = "STARTED";

        $("#startNow").val(startText);
        $("#startNow").prop('disabled', true);
        socket.emit("start", { room: roomId });
  });
});
