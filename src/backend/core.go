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
