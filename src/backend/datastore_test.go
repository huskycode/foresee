package foresee_backend

import (
  . "github.com/onsi/ginkgo"
  . "github.com/onsi/gomega"
)

var _ = Describe("DataStore", func() {
  var mds *InMemoryDataStore

  BeforeEach(func() {
    mds = CreateInMemoryDataStore()
  })

  Describe("InMemoryDataStore", func() {
    Describe("Get", func() {
      It("should have vote as not nil", func() {
        result := mds.Get("aRoom")

        Expect(result).ToNot(BeNil())
        Expect(result.votes).ToNot(BeNil())
      })

      It("should have vote as empty", func() {
        result := mds.Get("aRoom")

        Expect(result).ToNot(BeNil())
        Expect(result.votes).To(BeEmpty())
      })

      It("should get data after put", func() {
        data := CreateData()
        data.votes["a"] = 2
        mds.Put("aRoom", data)

        result := mds.Get("aRoom")
        Expect(result.votes).To(HaveLen(1))
        Expect(result.votes["a"]).To(Equal(2))
      })
    })
  })

  Describe("Data", func() {
    var data Data

    BeforeEach(func() {
      data = CreateData()
    })

    Describe("AddParticipant()", func() {
      It("should put in with zero vote", func() {
        data.AddParticipant("p1")

        Expect(data.GetVotes()["p1"]).To(Equal(0))
      })
    })

    Describe("Vote()", func() {
      It("should create a vote entry if not exists", func() {
        data.Vote("p1", 2)

        Expect(data.GetVotes()["p1"]).To(Equal(2))
      })
      It("should replace a vote entry if already exists", func() {
        data.Vote("p1", 2)
        data.Vote("p1", 3)

        Expect(data.GetVotes()["p1"]).To(Equal(3))
      })
    })

    Describe("RemoveParticipant()", func() {
      It("should remove participant from map", func() {
        data.AddParticipant("toRemove")
        data.RemoveParticipant("toRemove")

        Expect(data.GetVotes()).To(HaveLen(0))
      })
    })
  })
})
