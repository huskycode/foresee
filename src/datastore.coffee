cache = require('memory-cache')
hostStateModule = require("../src/hoststate")
hoststate = hostStateModule.hoststate

DataStore = (storage) -> {
  get : (roomName) ->
    if not storage.get(roomName)? then storage.put(roomName, {stories:{}, participants:{}, state: hoststate.INITIAL})
    return storage.get(roomName)
  
  put : (roomName, data) ->
    storage.put(roomName, data)

  clear: () ->
    storage.clear()
}

datastore = DataStore(cache)

exports.datastore = datastore 
exports.cache = cache
