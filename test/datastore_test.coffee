should = require("should")

dataStoreModule = require("../src/datastore")
datastore = dataStoreModule.datastore
cache = dataStoreModule.cache

describe("datastore", () ->
	beforeEach ->
		cache.clear
	
  it('get return blank data if not exist.', () ->
    result = datastore.get('roomName')
    result.should.eql({})
  )
	
  it('put data into memory.', () ->
		anyData = {'anyData'}
    datastore.put('roomName', anyData)
		result = cache.get('roomName')
		result.should.eql(anyData)
  )
	
  it('get return data from memory', () ->
		anyData = {'anyData'}
    cache.put('roomName', anyData)
		result = datastore.get('roomName')
		result.should.eql(anyData)
  )
	
)