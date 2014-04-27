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
  sio.On("vote", ws.vote)
  sio.On("join", ws.join)
  sio.On("removeParticipant", ws.removeParticipant)

  return sio
}

func (ws *WebSocket) ask(ns *socketio.NameSpace, data string) {
  l4g.Debug("on ask: %s", data)

  askRequest := AskRequest{}
  json.Unmarshal([]byte(data), &askRequest)

  ws.sendVoteRefresh(ns, askRequest.Room)
}

func (ws *WebSocket) vote(ns *socketio.NameSpace, data string) {
  l4g.Debug("on vote: %s", data)

  voteRequest := VoteRequest{}
  json.Unmarshal([]byte(data), &voteRequest)

  ws.core.Vote(voteRequest.Room, voteRequest.Name, voteRequest.Vote)

  ws.sendVoteRefresh(ns, voteRequest.Room)
}

func (ws *WebSocket) join(ns *socketio.NameSpace, data string) {
  l4g.Debug("on join: %s", data)

  joinRequest := JoinRequest{}
  json.Unmarshal([]byte(data), &joinRequest)

  ws.core.AddParticipant(joinRequest.Room, joinRequest.Name)

  ws.sendVoteRefresh(ns, joinRequest.Room)
}

func (ws *WebSocket) removeParticipant(ns *socketio.NameSpace, data string) {
  l4g.Debug("on removeParticipant: %s", data)

  req := RemoveParticipantRequest{}
  json.Unmarshal([]byte(data), &req)

  ws.core.RemoveParticipant(req.Room, req.Name)

  ws.sendVoteRefresh(ns, req.Room)
}

func (ws *WebSocket) sendVoteRefresh(ns *socketio.NameSpace, room string) {
  votes := ws.core.GetVotes(room)
  res, _ := json.Marshal(VoteRefreshResponse{room, votes})
  resString := string(res[:])

  ns.Emit("voteRefresh", resString)
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

func onConnect(ns *socketio.NameSpace) {
  l4g.Debug("connected:%s, in channel %s", ns.Id(), ns.Endpoint())
}
