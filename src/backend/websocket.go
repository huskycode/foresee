package foresee_backend

import (
  l4g "code.google.com/p/log4go"
  "encoding/json"
  "github.com/googollee/go-socket.io"
)

type WebSocket struct {
  core Core
}

func CreateWebSocket(core Core) *WebSocket {
  webSocket := new(WebSocket)
  webSocket.core = core
  return webSocket
}

func (ws WebSocket) createSocketIO() *socketio.SocketIOServer {
  sock_config := &socketio.Config{}
  sock_config.HeartbeatTimeout = 2
  sock_config.ClosingTimeout = 4

  sio := socketio.NewSocketIOServer(sock_config)

  sio.On("connect", onConnect)
  sio.On("ask", ws.ask)
  sio.On("ping", func(ns *socketio.NameSpace, data string) {
    sio.Broadcast("pong", data)
  })

  return sio
}

type AskRequest struct {
  Room string `json:"room"`
}

type VoteRefreshResponse struct {
  Room  string         `json:"room"`
  Votes map[string]int `json:"votes"`
}

func (ws *WebSocket) ask(ns *socketio.NameSpace, data string) {
  askRequest := AskRequest{}
  json.Unmarshal([]byte(data), &askRequest)

  votes := make(map[string]int)
  votes["A"] = 1

  res, _ := json.Marshal(VoteRefreshResponse{askRequest.Room, votes})
  ns.Emit("voteRefresh", string(res[:]))
}

func onConnect(ns *socketio.NameSpace) {
  l4g.Debug("connected:%s, in channel %s", ns.Id(), ns.Endpoint())
}
