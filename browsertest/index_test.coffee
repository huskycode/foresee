expect = chai.expect
assert = chai.assert

describe "index", ->
  describe "room name", ->
    it "should denied blank", ->
      result = validateRoomName("")
      assert.isFalse(result)

    it "should not allow sharp in roomname", ->
      result = validateRoomName("#")
      assert.isFalse(result)
