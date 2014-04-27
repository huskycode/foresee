package foresee_backend

type Core interface {
  AddParticipant(room string, participant string)
  ListParticipants(room string)
  RemoveParticipant(room string, participant string)
  Vote(room string, participant string, vote int)
}

type CoreImpl struct {
  dataStore DataStore
}

func CreateCoreImpl(ds DataStore) CoreImpl {
  return CoreImpl{ds}
}

func (ci CoreImpl) AddParticipant(room string, participant string) {
  ci.dataStore.Get(room).AddParticipant(participant)
}

func (ci CoreImpl) RemoveParticipant(room string, participant string) {
  ci.dataStore.Get(room).RemoveParticipant(participant)
}

func (ci CoreImpl) GetVotes(room string) map[string]int {
  return ci.dataStore.Get(room).GetVotes()
}
