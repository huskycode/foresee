// Generated by CoffeeScript 1.4.0
var Controller, core, datastore, datastoreModule, retainTime, hostStateModule, hoststate;

datastoreModule = require('./datastore');
hostStateModule = require("../src/hoststate");

hoststate = hostStateModule.hoststate;

datastore = datastoreModule.datastore;

retainTime = 3600000;

Controller = function(dataStore) {
  return {
    addStory: function(room, story) {
      var data, stories;
      data = dataStore.get(room);
      stories = this.listStories(room);
      stories[story] = null;

      //TODO: Watch out!
      //Although browsers mostly retain object in order of insertion
      //The order of object members are not guaranteed (Think: HashMap)
      //PS. Cannot write test to proof this because of the above quirks
      data['stories'] = stories;
      return dataStore.put(room, data, retainTime);
    },
    listStories: function(room) {
      var data, stories;
      data = dataStore.get(room);
      stories = data['stories'];
      if (stories == null) {
        stories = {};
      }
      return stories;
    },
    addParticipant: function(room, participant) {
      var data, participants, _ref;
      data = dataStore.get(room);
      participants = (_ref = data.participants) != null ? _ref : {};
      participants[participant] = null;
      data['participants'] = participants;
      return dataStore.put(room, data, retainTime);
    },
    listParticipants: function(room) {
      var data, _ref;
      data = dataStore.get(room);
      return (_ref = data.participants) != null ? _ref : {};
    },
    removeParticipant: function(room, participant) {
      var data;
      data = dataStore.get(room);
      delete data["participants"][participant];
      return dataStore.put(room, data, retainTime);
    },
    vote: function(room, participant, vote) {
      var data;
      data = dataStore.get(room);
      data.participants[participant] = vote;
      return dataStore.put(room, data, retainTime);
    },
    startRoom: function( room ) {
      var data;
      data = dataStore.get(room);
      data.state = hoststate.STARTED;
      console.log( JSON.stringify(data));
      return dataStore.put(room, data, retainTime);
    },
    getRoom: function( room ) {
      var data;
      data = dataStore.get(room);
      return data;
    }

  };
};

core = Controller(datastore);

exports.core = core;

exports.datastore = datastore;
