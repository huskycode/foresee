#The wrapper for QRGenerator
QRCodeJSCodeGen = (id, text) ->
  new QRCode(id,text) #call the real one

#The controller
QRCtrl = (jq, qrCodeGen) -> {
  generateQRCode: () -> 
    url = jq("#url").val()
    qrCodeGen("qrcode", url)
}

window.QRCtrl = QRCtrl
window.QRCodeJSCodeGen = QRCodeJSCodeGen
