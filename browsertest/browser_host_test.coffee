expect = chai.expect;


describe("Host Page", ->
  it("genrate QR Code with text", ->
    # setup
    realObject = window.QRCode
    called = false
    callWithArgs = {}
    mockObject = (id, text) ->
      called = true
      callWithArgs = {id, text}
      return text
    window.QRCode = mockObject

    # stimulus
    generateQRCode('id', 'text')

    # assertion
    expect(called).to.equal(true)
    expect(callWithArgs).to.eql({'id', 'text'})

    #tear down
    window.QRCode = realObject
  )
)

    # var expect = chai.expect;
#
    # expect(foo).to.be.a('string');
    # expect(foo).to.equal('bar');
    # expect(foo).to.have.length(3);
    # expect(tea).to.have.property('flavors')
      # .with.length(3);

  #testText = qrcode.generateQRCode();
#)
###
describe("xxx", ->
 it('add participant should set value in data.', ->
    cache.clear()
    core.addParticipant('roomName', 'myName')
    result = cache.get('roomName')
    should.exist(result)
    (result.myName == null).should.be.true
  )
) ###