package foresee_backend

import (
  "github.com/googollee/go-socket.io"
  "net/http"
  "fmt"
)

type Route struct {
}

func (r Route) ManageRoute() *socketio.SocketIOServer {
  ws := WebSocket{}

  sio := ws.createSocketIO()

  sio.HandleFunc("/url", handleUrl)
  sio.Handle("/", http.FileServer(http.Dir("./src/frontend")))

  return sio
}

func handleUrl(w http.ResponseWriter, r *http.Request) {
  fmt.Fprintf(w, "{\"url\":\"http://%s\", \"socketUrl\":\"http://%s\"}", r.Host, r.Host)
}
