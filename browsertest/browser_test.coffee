expect = chai.expect
assert = chai.assert

#Helpers
mockJqueryVal = (jq, selector, retVal) -> jq.withArgs(selector).returns({val: () -> retVal})

#Tests
describe "QRCtrl", ->
  describe "generateQRCode", ->
  it "generate QR Code from Element on page", ->
    #given a page with element id
    aUrl = "anyValidUrl"

    jq = sinon.stub()
    mockJqueryVal(jq, "#url", aUrl)

    qrCodeLib = sinon.stub()

    #when generate QR code is called
    qrCtrl = QRCtrl(jq, qrCodeLib)
    qrCtrl.generateQRCode()

    #then a qr library is called with correct params
    assert.isTrue(qrCodeLib.calledWith("qrcode", aUrl), "qrcodeLib not called with correct parameters")
