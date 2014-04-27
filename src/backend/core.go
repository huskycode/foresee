package foresee_backend

type Core interface {
  AddParticipant(room string, participant string)
  RemoveParticipant(room string, participant string)
  GetVotes(room string) map[string]int
  Vote(room string, participant string, vote int)
}

type CoreImpl struct {
  dataStore DataStore
}

func CreateCoreImpl(ds DataStore) *CoreImpl {
  coreImpl := new(CoreImpl)
  coreImpl.dataStore = ds

  return coreImpl
}

func (ci *CoreImpl) AddParticipant(room string, participant string) {
  ci.dataStore.Get(room).AddParticipant(participant)
}

func (ci *CoreImpl) RemoveParticipant(room string, participant string) {
  ci.dataStore.Get(room).RemoveParticipant(participant)
}

func (ci *CoreImpl) GetVotes(room string) map[string]int {
  return ci.dataStore.Get(room).GetVotes()
}

func (ci *CoreImpl) Vote(room string, participant string, vote int) {
  ci.dataStore.Get(room).Vote(participant, vote)
}
