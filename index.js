const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const { Orden, Orden_producto, PC_Armado, PC_Armado_Prod,
    Producto, Reporte, Resena, Usuario } = require("./dao")
const PUERTO = 4444
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended : true
}))
app.use(cors())
app.use(express.static("assets"))

app.get("/Orden", async (req, resp) => {
    const orden = req.query.Usuario_ID
    if(orden === undefined || orden === null){
        const listaOrden = await Orden.findAll()
        resp.send(listaOrden)
    }else{
        const listaOrden = await Orden.findAll({
            where : {
                orden : Usuario_ID
            }
        })
        resp.send(listaOrden)
    }
})
app.get("/Orden_producto", async (req, resp) => {
    const listaOrdenProd = await Orden_producto.findAll()
    resp.send(listaOrdenProd)
})
app.get("/PC_Armado", async (req, resp) => {
    const listaPCArmado = await PC_Armado.findAll()
    resp.send(listaPCArmado)
})
app.get("/PC_Armado_Prod", async (req, resp) => {
    const listaPCArmadoProd = await PC_Armado_Prod.findAll()
    resp.send(listaPCArmadoProd)
})
app.get("/Producto", async (req, resp) => {
    const tipo = req.query.Categoria
    if(tipo == undefined){
        const listaProducto = await Producto.findAll()
        resp.send(listaProducto)
    }else{
        const listaProducto = await Producto.findAll({
            where : {
                Categoria : tipo
            }
        })
    resp.send(listaProducto)
    }
})
app.get("/Reporte", async (req, resp) => {
    const listaReporte = await Reporte.findAll()
    resp.send(listaReporte)
})
app.get("/Resena", async (req, resp) => {
    const listaResena = await Resena.findAll()
    resp.send(listaResena)
})
app.get("/Usuario", async (req, resp) => {
    const usuario = req.query.Correo
    if(usuario == undefined){
        const listaUsuarios = await Usuario.findAll()
        resp.send(listaUsuarios)
    }else{
        const listaUsuarios = await Usuario.findAll({
            where : {
                Correo : usuario
            }
        })
    resp.send(listaUsuarios)
    }
})


app.listen(PUERTO, () => {
    console.log(`Servidor web iniciado en el puero ${PUERTO}`)
})