package foresee_backend

type Data struct {
  votes map[string]int
}

func CreateData() Data {
  return Data{make(map[string]int)}
}

func (d Data) AddParticipant(name string) {
  d.votes[name] = 0
}

func (d Data) RemoveParticipant(name string) {
  delete(d.votes, name)
}
func (d Data) Vote(name string, score int) {
  d.votes[name] = score
}

func (d Data) GetVotes() map[string]int {
  return d.votes
}

type DataStore interface {
  Get(room string) Data
  Put(room string, data Data)
}

func CreateInMemoryDataStore() *InMemoryDataStore {
  mds := new(InMemoryDataStore)
  mds.dataByRoom = make(map[string]Data)
  return mds
}

type InMemoryDataStore struct {
  dataByRoom map[string]Data
}

func (mds InMemoryDataStore) Get(room string) Data {
  return mds.dataByRoom[room]
}

func (mds InMemoryDataStore) Put(room string, data Data) {
  mds.dataByRoom[room] = data
}
