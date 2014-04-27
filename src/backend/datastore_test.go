package foresee_backend

import (
  . "github.com/onsi/ginkgo"
  . "github.com/onsi/gomega"
)

var _ = Describe("InMemoryDataStore", func() {
  var mds InMemoryDataStore

  BeforeEach(func() {
    mds = CreateInMemoryDataStore()
  })

  Describe("Get", func() {
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
