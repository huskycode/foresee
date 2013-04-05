datastoreModule = require('./datastore')
datastore = datastoreModule.datastore

#core
retainTime = 3600000

Controller = (dataStore) -> {
  addStory: (room, story) ->
    data = dataStore.get(room)
    stories = @listStories(room)

    stories[story] = null

    #TODO: Watch out!
    #Although browsers mostly retain object in order of insertion
    #The order of object members are not guaranteed (Think: HashMap)
    #PS. Cannot write test to proof this because of the above quirks
    data['stories'] = stories
    dataStore.put(room, data, retainTime)

  listStories: (room) ->
    data = dataStore.get(room)
    stories = data['stories']
    stories ?= {}
    return stories

  addParticipant: (room, participant) ->
    data = dataStore.get(room)
    participants = data.participants ? {}

    participants[participant] = null
    data['participants'] = participants
    dataStore.put(room, data, retainTime)

  listParticipants: (room) ->
    data = dataStore.get(room)
    data.participants ? {}

  removeParticipant: (room, participant) ->
    data = dataStore.get(room)
    delete data["participants"][participant]
    dataStore.put(room, data, retainTime)

  vote: (room, participant, vote) ->
    data = dataStore.get(room)
    data.participants[participant] = vote
    dataStore.put(room, data, retainTime)
}

core = Controller(datastore)

exports.core = core
exports.datastore = datastore