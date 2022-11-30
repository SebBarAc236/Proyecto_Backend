const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const { Orden, Orden_producto, PC_Armado, PC_Armado_Prod,
    Producto, Reporte, Resena, Usuario } = require("./dao")
const PUERTO = process.env.PORT || 4444
const app = express()
const TOKEN = "HSDFOSHFHSDFSDHFJSHK"
const ERRORLOGIN = "Datos incorrectos"

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended : true
}))
app.use(cors())
app.use(express.static("assets"))

app.get("/Orden", async (req, resp) => {
    const orden = req.query.Usuario_ID
    if(orden === undefined){
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
    const listaResena = await Resena.findAll({
        include: Usuario,
        where: {
            Tipo_resena: 'Usuario'
        }
    })
    resp.send(listaResena)
    
})
app.get("/Resena2", async (req, resp) => {
    const listaResena = await Resena.findAll({
        include: Usuario,
        where: {
            Tipo_resena: 'Influencer'
        }
    })
    resp.send(listaResena)
})
app.post("/Orden", async (req, resp) =>{
    const dataRequest = req.body
    const Direc = dataRequest.Direccion
    const Precio = dataRequest.Monto
    const OrdenID = dataRequest.Orden_ID
    const UsuarioID = dataRequest.Usuario_ID

    //Validaciones
    if(Direccion == null || Direccion == undefined) resp.send({
        error: "ERROR. Llene todos los datos"
    })
    if(UsuarioID == null || UsuarioID == undefined) resp.send({
        error: "ERROR. Debe iniciar sesion"
    })

    try{
        await Orden.create({
            Direccion: Direc,
            Monto :  Precio,
            Orden_ID : OrdenID,
            Usuario_ID: UsuarioID,
            Fecha : new Date().toJSON

        })
    } catch (error) {
        resp.send({
            error: `ERROR. ${error}`
        })
    }
    resp.send({
        error: ""
    })
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


app.post("/Usuario", async (req,resp) => {
    const dataRequest = req.body
    const Usuario_ID = dataRequest.Usuario_ID
    const Nombre = dataRequest.Nombre
    const Apellido = dataRequest.Apellido
    const Correo = dataRequest.Correo
    const Contrasena = dataRequest.Contrasena

    const usuarioRegister = await Usuario.findAll({where : {
        Correo : Correo
    }})
    if(usuarioRegister.length > 0){
        resp.send({
            error : "ERROR. Ya existe un usuario con ese correo."
        })
        return
    }
    await Usuario.create({
        Usuario_ID : Usuario_ID,
        Nombre : Nombre,
        Apellido : Apellido,
        Correo : Correo,
        Contrasena : Contrasena
    })
    
    resp.send({
        error : ""
    })
})

app.post("/login", async (req,resp) => {
    const correo = req.body.Correo
    const contrasena = req.body.Contrasena
    const usuario = await Usuario.findOne({
        where : {
            Correo : correo,
            Contrasena : contrasena
        }
    })
    if(usuario === null){
        resp.send({
            error : "Datos incorrectos",
            errortxt : ERRORLOGIN
        })
    }else{
        resp.send({
            error : "",
            token : correo
        })
    }
})



app.listen(PUERTO, () => {
    console.log(`Servidor web iniciado en el puerto ${PUERTO}`)
})