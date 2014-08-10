package foresee_backend

import (
  l4g "code.google.com/p/log4go"
  "encoding/json"
  "github.com/googollee/go-socket.io"
)

type WebSocket struct {
  core Core
  sio  *socketio.Server
}

func CreateWebSocket(core Core) *WebSocket {
  webSocket := new(WebSocket)
  webSocket.core = core
  return webSocket
}

func (ws WebSocket) CreateSocketIO() *socketio.Server {
  //sock_config := &socketio.Config{}
  //sock_config.HeartbeatTimeout = 2
  //sock_config.ClosingTimeout = 4

  sio, err := socketio.NewServer(nil)
  if err != nil {
    l4g.Error(err)
  }

  ws.sio = sio

  sio.On("connection", func(so socketio.Socket) {
      l4g.Debug("connected")
      sio.On("ping", func(so socketio.Socket) {
          l4g.Debug("ping rcvd")
      })
      sio.On("ask", ws.ask)
      sio.On("vote", ws.vote)
      sio.On("join", ws.join)
      sio.On("removeParticipant", ws.removeParticipant)
      so.On("disconnection", func() {
          l4g.Debug("disconnected")
      })
  })
  sio.On("error", func(so socketio.Socket, err error) {
        l4g.Debug("error:", err)
    })

  return sio
}

func (ws *WebSocket) ask(so socketio.Socket, data string) {
  l4g.Debug("on ask: %s", data)

  askRequest := AskRequest{}
  json.Unmarshal([]byte(data), &askRequest)

  ws.sendVoteRefresh(so, askRequest.Room)
}

func (ws *WebSocket) vote(so socketio.Socket, data string) {
  l4g.Debug("on vote: %s", data)

  voteRequest := VoteRequest{}
  json.Unmarshal([]byte(data), &voteRequest)

  ws.core.Vote(voteRequest.Room, voteRequest.Name, voteRequest.Vote)

  ws.sendVoteRefresh(so, voteRequest.Room)
}

func (ws *WebSocket) join(so socketio.Socket, data string) {
  l4g.Debug("on join: %s", data)

  joinRequest := JoinRequest{}
  json.Unmarshal([]byte(data), &joinRequest)

  ws.core.AddParticipant(joinRequest.Room, joinRequest.Name)

  //so.Join(joinRequest.Room)

  ws.sendVoteRefresh(so, joinRequest.Room)
}

func (ws *WebSocket) removeParticipant(so socketio.Socket, data string) {
  l4g.Debug("on removeParticipant: %s", data)

  req := RemoveParticipantRequest{}
  json.Unmarshal([]byte(data), &req)

  ws.core.RemoveParticipant(req.Room, req.Name)

  ws.sendVoteRefresh(so, req.Room)
}

func (ws *WebSocket) sendVoteRefresh(so socketio.Socket, room string) {
  votes := ws.core.GetVotes(room)
  res, _ := json.Marshal(VoteRefreshResponse{room, votes})
  resString := string(res[:])

  //so.BroadcastTo(room, "voteRefresh", resString)
  so.Emit("voteRefresh", resString)
  l4g.Debug("emit voteRefresh: %s", resString)
}

type JoinRequest struct {
  Room string `json:"room"`
  Name string `json:"name"`
}

type RemoveParticipantRequest struct {
  Room string `json:"room"`
  Name string `json:"name"`
}

type VoteRequest struct {
  Room string `json:"room"`
  Name string `json:"name"`
  Vote int    `json:"vote"`
}

type AskRequest struct {
  Room string `json:"room"`
}

type VoteRefreshResponse struct {
  Room  string         `json:"room"`
  Votes map[string]int `json:"votes"`
}
