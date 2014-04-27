package foresee_backend

import (
  "github.com/googollee/go-socket.io"
  "fmt"
  "encoding/json"
)

type WebSocket struct {

}

func (ws WebSocket) createSocketIO() *socketio.SocketIOServer {
  sock_config := &socketio.Config{}
  sock_config.HeartbeatTimeout = 2
  sock_config.ClosingTimeout = 4

  sio := socketio.NewSocketIOServer(sock_config)

  sio.On("connect", onConnect)
  sio.On("ask", ask)
  sio.On("ping", func(ns *socketio.NameSpace, data string) {
    fmt.Println(data)
    sio.Broadcast("pong", data)
  })

  return sio
}

type AskRequest struct {
  Room string `json:"room"`
}

type VoteRefreshResponse struct {
  Room string `json:"room"`
  Votes map[string]int `json:"votes"`
}
func ask(ns *socketio.NameSpace, data string) {
  askRequest := AskRequest{}
  json.Unmarshal([]byte(data), &askRequest)

  votes := make(map[string]int)
  votes["A"] = 1

  res, _ := json.Marshal(VoteRefreshResponse{askRequest.Room, votes})
  ns.Emit("voteRefresh", string(res[:]))
}

func onConnect(ns *socketio.NameSpace) {
  fmt.Println("connected:", ns.Id(), " in channel ", ns.Endpoint())
}
