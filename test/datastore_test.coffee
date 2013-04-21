should = require("should")

dataStoreModule = require("../src/datastore")
datastore = dataStoreModule.datastore
cache = dataStoreModule.cache

hostStateModule = require("../src/hoststate")
hoststate = hostStateModule.hoststate

describe "datastore", () ->
  beforeEach ->
    cache.clear()
	
  it 'get return data stucture with blank value if not exist.', () ->
    result = datastore.get('roomName')
    result.should.eql({ "stories":{}, "participants":{} , state: hoststate.INITIAL}) 
	
  it 'put data into memory.', () ->
    anyData = {'anyData'}
    datastore.put('roomName', anyData)
    result = cache.get('roomName')
    result.should.eql(anyData)

  it 'get return data from memory', () ->
    anyData = {'anyData'}
    cache.put('roomName', anyData)
    result = datastore.get('roomName')
    result.should.eql(anyData)

  it 'can clear data', () ->
    datastore.put('abc', 'testData')
    datastore.clear()
    datastore.get('abc').should.eql({ "stories":{}, "participants":{}, state: hoststate.INITIAL})