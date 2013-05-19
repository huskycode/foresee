expect = chai.expect
assert = chai.assert

describe "index", ->
  describe "room name", ->
    it "should accept only English letter", ->
      validRoomName = "abc"
      result = validateRoomName(validRoomName)
      assert.isTrue(result)
    it "should accept only Arabic number", ->
      validRoomName = "123"
      result = validateRoomName(validRoomName)
      assert.isTrue(result)
    it "should accept only English letter and Arabic number", ->
      validRoomName = "abc123"
      result = validateRoomName(validRoomName)
      assert.isTrue(result)
      validRoomName = "123abc"
      result = validateRoomName(validRoomName)
      assert.isTrue(result)
    it "should denied special character", ->
      invalidRoomName = "abc_123"
      result = validateRoomName(invalidRoomName)
      assert.isFalse(result)
      invalidRoomName = "123-abc"
      result = validateRoomName(invalidRoomName)
      assert.isFalse(result)
      invalidRoomName = "a b"
      result = validateRoomName(invalidRoomName)
      assert.isFalse(result)
    it "should denied blank", ->
      result = validateRoomName("")
      assert.isFalse(result)
