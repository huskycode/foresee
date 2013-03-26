express = require("express")
index = require("../src/index")
should = require("should")
sinon = require("sinon")

coreModule = require("../src/core")
core = coreModule.core
cache = coreModule.cache

route = index.route