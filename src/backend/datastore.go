package foresee_backend

type Data struct {
  votes map[string]int
}

func CreateData() Data {
  return Data{make(map[string]int)}
}

type DataStore interface {
  Get(room string) Data
  Put(room string, data Data)
}

func CreateInMemoryDataStore() InMemoryDataStore {
  mds := InMemoryDataStore{}
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
