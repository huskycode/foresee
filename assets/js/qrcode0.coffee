generateQRCode0 = (id, text) ->
  new QRCode(id, text)

$ ->
  url = $("#url").val()
  generateQRCode0("qrcode", url) if url

window.generateQRCode0 = generateQRCode0
