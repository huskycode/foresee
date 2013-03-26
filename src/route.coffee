core = require("./core").core

getSocketUrl = (req) -> "http://" + req.headers.host

route = {
  index: (req, res) -> res.render('index.ect', {title:"Foresee"})
  join: (req, res) -> res.render('join.ect', {id:req.params.id, socketUrl:getSocketUrl(req)})
  addStory: (req, res) ->
    core.addStory(req.params.room, req.params.story)
    res.send(
      core.listStories(req.params.room)
    )
}

exports.route = route