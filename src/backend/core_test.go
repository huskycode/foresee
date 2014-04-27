package foresee_backend

import (
  . "github.com/onsi/ginkgo"
  . "github.com/onsi/gomega"
)

type MockDataStore struct {
  DataToReturn Data
  LastRoomGet  string
}

func (d *MockDataStore) Get(room string) Data {
  d.LastRoomGet = room
  return d.DataToReturn
}
func (d *MockDataStore) Put(room string, data Data) {
}

var _ = Describe("CoreImpl", func() {
  var mockDS *MockDataStore

  BeforeEach(func() {
    mockDS = new(MockDataStore)
  })

  Describe("Create", func() {
    It("should create with assigned datastore", func() {
      core := CreateCoreImpl(mockDS)

      Expect(core).ToNot(BeNil())
      Expect(core.dataStore).To(Equal(mockDS))
    })
  })

  Describe("AddParticipant", func() {
    It("should call addParticipant in the data of the room", func() {
      core := CreateCoreImpl(mockDS)
      data := CreateData()
      mockDS.DataToReturn = data

      core.AddParticipant("roomA", "p1")

      Expect(mockDS.LastRoomGet).To(Equal("roomA"))
      Expect(data.GetVotes()).To(HaveLen(1))
      Expect(data.GetVotes()["p1"]).To(Equal(0))
    })
  })
  Describe("RemoveParticipant()", func() {
    It("should call deleteParticipant in the data of the room", func() {
      core := CreateCoreImpl(mockDS)
      data := CreateData()
      data.Vote("p1", 1)
      mockDS.DataToReturn = data

      core.RemoveParticipant("roomA", "p1")

      Expect(mockDS.LastRoomGet).To(Equal("roomA"))
      Expect(data.GetVotes()).To(HaveLen(0))
    })
  })
  Describe("GetVotes()", func() {
    It("should get votes of a room", func() {
      core := CreateCoreImpl(mockDS)
      data := CreateData()
      data.Vote("p1", 2)
      mockDS.DataToReturn = data

      votes := core.GetVotes("roomA")

      Expect(votes).To(HaveLen(1))
      Expect(votes["p1"]).To(Equal(2))
    })
  })
})
