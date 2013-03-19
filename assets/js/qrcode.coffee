generateQRCode = (id, text) ->
  new QRCode(id, text)

$ ->
  url = $("#url").val()
  generateQRCode("qrcode", url)

window.generateQRCode = generateQRCode
