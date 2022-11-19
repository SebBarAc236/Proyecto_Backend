const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const { Confederacion, Grupo, Equipo } = require("./dao")
const PUERTO = 4444
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended : true
}))
app.use(cors())
app.use(express.static("assets"))
