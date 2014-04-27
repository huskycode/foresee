package main

import (
  "net/http"
  "log"
  "fmt"
  "./src/backend"
)

func main() {
  port := 3000
  log.Printf("Listening at port [%d] ...\n", port)

  r := foresee_backend.Route{}
  serveMux := r.ManageRoute()

  http.ListenAndServe(getPortString(port), serveMux)
}

func getPortString(port int) string {
  return fmt.Sprintf(":%d", port)
}
