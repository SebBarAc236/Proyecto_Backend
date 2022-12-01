const crypto = require("crypto")
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const { Orden, Orden_producto, PC_Armado, PC_Armado_Prod,
    Producto, Reporte, Resena, Usuario, PC_Avanzada } = require("./dao")
const PUERTO = process.env.PORT || 4444
const app = express()
const TOKEN = "HSDFOSHFHSDFSDHFJSHK"
const usuarioID = ""
const ERRORLOGIN = "Datos incorrectos"

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended : true
}))
app.use(cors())
app.use(express.static("assets/imagenes"))

app.get("/Orden", async (req, resp) => {
    const orden = req.query.Usuario_ID
    if(orden === undefined){
        const listaOrden = await Orden.findAll()
        resp.send(listaOrden)
    }else{
        const listaOrden = await Orden.findAll({
            where : {
                Usuario_ID : orden
            }
        })
        resp.send(listaOrden)
    }
})
app.get("/Orden_producto", async (req, resp) => {
    const orden = req.query.Orden_ID
    if(orden === undefined){
        const listadoOrdenProd = await Orden_producto.findAll()
        resp.send(listadoOrdenProd)
    }else{
        
        const listadoOrdenProd = await Orden_producto.findAll({
            include: Producto, 
            where : {Orden_ID : orden}})
        resp.send(listadoOrdenProd)
    }})
app.get("/Productoid", async (req, resp) => {
        const producto = req.query.Producto_ID
        if(producto === undefined){
            const listadoProd = await Producto.findAll()
            resp.send(listadoProd)
        }else{
            const listadoProd = await Producto.findAll({where : {Producto_ID : producto}})
            resp.send(listadoProd)
        }
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
    resp.end();
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

app.get("/Avanzada", async (req,resp) => {
    const usuario_id = req.query.Usuario_ID
    if(usuario_id == undefined){
        const listadoAvanzado = await PC_Avanzada.findAll()
        resp.send(listadoAvanzado)
    }else{
        const listadoAvanzado = await PC_Avanzada.findAll({
            where : {
                Usuario_ID : usuario_id
            }
        })
        resp.send(listadoAvanzado)
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

app.put("/Usuario", async (req, resp) => {
    const body = req.body;
    const userId = body.Usuario_ID
    delete body['Usuario_ID']
    const updatedRows = await Usuario.update(body, { where: { Usuario_ID: userId } })
    console.log(updatedRows);
    resp.send({
        error: ''
    })
})

app.post("/login", async (req,resp) => {
    const correo = req.body.Correo
    const contrasena = req.body.Contrasena
    const Usuario_ID = req.body.Usuario_ID
    const usuario = await Usuario.findOne({
        where : {
            Correo : correo,
            Contrasena : contrasena,
            Usuario_ID : Usuario_ID
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
            token : correo,
            usuarioID : Usuario_ID
        })
    }
})
app.post("/Avanzada", async (req,resp) => {
    const avanzada_id = req.body.Avanzada_ID
    const nombre = req.body.NombreProd
    const precio = req.body.PrecioProd
    const url = req.body.URL
    const usuario_id = req.body.Usuario_ID
    const pedido = await PC_Avanzada.findAll({
        where : {
            Avanzada_ID : avanzada_id
        }
    })
    if(pedido.length > 0){
        resp.send({
            error : "ERROR. Ya se añadio ese prod."
        })
        return
    }
    await PC_Avanzada.create({
        Avanzada_ID : avanzada_id,
        NombreProd : nombre,
        PrecioProd : precio,
        URL : url,
        Usuario_ID : usuario_id
    })
    
    resp.send({
        error : ""
    })
})

app.post("/Avanzadadestroy", async (req,resp) => {
    const avanzada_id = req.body.Avanzada_ID
    await PC_Avanzada.destroy({
        Avanzada_ID : avanzada_id
    })
})

app.post("/Orden", async (req, resp) => 
{
    const dataRequest = req.body;
    const usuarioID = dataRequest.Usuario_ID;

    const owo = await Orden.findAll({
        Usuario_ID : usuarioID,
    })

    if (owo.length > 0) {
        resp.send(owo)
        return 
    }

    try {
        await Orden.create({
            Orden_ID: crypto.randomUUID(),
            Usuario_ID: usuarioID,
            Monto: 0,
            Direccion: "",
            Fecha: Date.now(),
        })
    } catch (error) {
        console.log(error);
        resp.send({
            error : `ERROR. ${error}`
        })
        return
    }
})

app.post("/Producto", async(req,resp) =>{
    const Nombre = req.body.NombreProd
    const Precio = req.body.PrecioProd
    const URL  = req.body.URL
    await Producto.create({
        Producto_ID : crypto.randomUUID(),
        Nombre : Nombre,
        Precio : Precio,
        URL : URL
    })
})

app.post("/Carrito", async (req, resp) => {
    const dataRequest = req.body
    const producto_id = dataRequest.Producto_ID
    const ordenID = dataRequest.Orden_ID
    console.log("Producto ID: ");
    console.log(producto_id);
    // Validaciones
    if (producto_id == null || producto_id == undefined) resp.send({
        error : "ERROR. Debe enviar un producto ID"
    })

    try {
        await Orden_producto.create({
            Orden_producto_ID: crypto.randomUUID(),
            Orden_ID: ordenID,
            Producto_ID : producto_id,
        })
    } catch (error) {
        console.log(error);
        resp.send({
            error : `ERROR. ${error}`
        })
        return
    }

    resp.send({
        error : ""
    })

})


app.get("/productoPCarmada", async (req,resp) => {
    const productoId = req.body.Producto_ID
    const producto = await Producto.findOne({
        where : {
            Producto_ID : productoId
        }
    })
})


app.listen(PUERTO, () => {
    console.log(`Servidor web iniciado en el puerto ${PUERTO}`)
})