generateQRCode = (id, text) ->
  new QRCode(id, text)

$ ->
  url = $("#url").val()
  generateQRCode("qrcode", url) if url

window.generateQRCode = generateQRCode
