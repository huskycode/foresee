package foresee_backend

import (
  . "github.com/onsi/ginkgo"
  . "github.com/onsi/gomega"
)

type MockDataStore struct {
}

func (d MockDataStore) Get(room string) Data {
  return CreateData()
}
func (d MockDataStore) Put(room string, data Data) {
}

var _ = Describe("CoreImpl", func() {
  Describe("Create", func() {
    It("should create with assigned datastore", func() {
      mockDS := MockDataStore{}
      core := CreateCoreImpl(mockDS)

      Expect(core).ToNot(BeNil())
      Expect(core.dataStore).To(Equal(mockDS))
    })
  })
})
