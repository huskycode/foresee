expect = chai.expect;


describe("Host Page", ->
  it("genrate QR Code with text", ->
    #given
    result = 'text'
    #when
    qrcode_text = generateQRCode()
    #then
    expect(qrcode_text).to.be.a('string')
    expect(qrcode_text).to.be.equal(result)
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