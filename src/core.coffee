cache = require('memory-cache')

#core
retainTime = 3600000

Controller = (dataStore) -> {
  addStory: (room, story) ->
    data = @getData(room)
    stories = @listStories(room)

    stories[story] = null

    #TODO: Watch out!
    #Although browsers mostly retain object in order of insertion
    #The order of object members are not guaranteed (Think: HashMap)
    #PS. Cannot write test to proof this because of the above quirks
    data['stories'] = stories
    dataStore.put(room, data, retainTime)

  listStories: (room) ->
    data = @getData(room)
    stories = data['stories']
    stories ?= {}
    return stories

  ensureRoomExist: (room) ->
    if not dataStore.get(room)? then dataStore.put(room, {})

  addParticipant: (room, participant) ->
    data = @getData(room)
    participants = data.participants ? {}

    participants[participant] = null
    data['participants'] = participants
    dataStore.put(room, data, retainTime)

  listParticipants: (room) ->
    data = @getData(room)
    data.participants ? {}

  removeParticipant: (room, participant) ->
    data = @getData(room)
    delete data["participants"][participant]
    dataStore.put(room, data, retainTime)

  getData: (room) ->
    @ensureRoomExist(room)
    return dataStore.get(room)

  vote: (room, participant, vote) ->
    data = @getData(room)
    data.participants[participant] = vote
    dataStore.put(room, data, retainTime)
}

core = Controller(cache)

exports.core = core
exports.cache = cache