cache = require('memory-cache')

DataStore = (storage) -> {
  get : (roomName) ->
    if not storage.get(roomName)? then storage.put(roomName, {"stories":{}, "participants":{} })
    return storage.get(roomName)
  
  put : (roomName, data) ->
    storage.put(roomName, data)
}

datastore = DataStore(cache)

exports.datastore = datastore 
exports.cache = cache
