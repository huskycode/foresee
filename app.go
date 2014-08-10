package main

import (
  "fmt"
  "foresee/src/backend"
  "log"
  "net/http"
)

func main() {
  port := 3000
  log.Printf("Listening at port [%d] ...\n", port)

  ws := foresee_backend.CreateWebSocket(foresee_backend.CreateCoreImpl(foresee_backend.CreateInMemoryDataStore()))
  sio := ws.CreateSocketIO()

  http.HandleFunc("/url", handleUrl)
  http.Handle("/", http.FileServer(http.Dir("./src/frontend")))
  http.Handle("/socket.io/", sio)


  http.ListenAndServe(getPortString(port), nil)
}

func handleUrl(w http.ResponseWriter, r *http.Request) {
  fmt.Fprintf(w, "{\"url\":\"http://%s\", \"socketUrl\":\"http://%s\"}", r.Host, r.Host)
}

func getPortString(port int) string {
  return fmt.Sprintf(":%d", port)
}
