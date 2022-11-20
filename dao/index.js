const { Sequelize, DataTypes } = require("sequelize");

const CADENA_CONEXION = 
    "postgresql://sebastianb:sebastianb@localhost:4321/proyectopw"

const sequelize = new Sequelize(CADENA_CONEXION)

const Orden = sequelize.define("Orden",{
    Orden_ID : {
        primaryKey : true,
        type : DataTypes.UUID,
        defaultValue : Sequelize.UUIDV4,
        allowNull : false
    },
    Usuario_ID : {
        type : DataTypes.UUID,
        allowNull : false
    },
    Monto : {
        type : DataTypes.STRING(100),
        allowNull : true
    },
    Direccion : {
        type : DataTypes.INTEGER,
        allowNull : true
    },
    Fecha : {
        type : DataTypes.DATE,
        allowNull : false
    }
}, {
    timestamps : false,
    freezeTableName : true
})

const Orden_producto = sequelize.define("Orden_producto",{
    Orden_producto_ID : {
        primaryKey : true,
        type : DataTypes.UUID,
        defaultValue : Sequelize.UUIDV4,
        allowNull : false
    },
    Orden_ID : {
        type : DataTypes.UUID,
        allowNull : false
    },
    Producto_ID : {
        type : DataTypes.UUID,
        allowNull : false
    }
},{
    timestamps : false,
    freezeTableName : true
})

const PC_Armado = sequelize.define("PC_Armado",{
    PC_Armado_ID : {
        primaryKey : true,
        type : DataTypes.UUID,
        defaultValue : Sequelize.UUIDV4,
        allowNull : false
    },
    Nombre : {
        type : DataTypes.STRING(30),
        allowNull : true
    },
    Descripcion : {
        type : DataTypes.STRING(100),
        allownull : true
    }
},{
    timestamps : false,
    freezeTableName : true
})

const PC_Armado_Prod = sequelize.define("PC_Armado_Producto",{
    PC_Armado_Producto_ID : {
        primaryKey : true,
        type : DataTypes.UUID,
        defaultValue : Sequelize.UUIDV4,
        allowNull : false
    },
    PC_Armado_ID : {
        type : DataTypes.UUID,
        allowNull : false
    },
    Producto_ID : {
        type : DataTypes.UUID,
        allowNull : false
    },
},{
    timestamps : false,
    freezeTableName : true
})

const Producto = sequelize.define("Producto",{
    Producto_ID : {
        primaryKey : true,
        type : DataTypes.UUID,
        defaultValue : Sequelize.UUIDV4,
        allowNull : false
    },
    Nombre : {
        type : DataTypes.STRING(25),
        allowNull : true
    },
    Precio : {
        type : DataTypes.INTEGER,
        allowNull : true
    },
    Descripcion : {
        type : DataTypes.STRING(150),
        allowNull : true
    },
    Categoria : {
        type : DataTypes.STRING(30),
        allowNull : true
    }
},{
    timestamps : false,
    freezeTableName : true
})

const Reporte = sequelize.define("Reporte",{
    Reporte_ID : {
        primaryKey : true,
        type : DataTypes.UUID,
        defaultValue : Sequelize.UUIDV4,
        allowNull : false
    },
    Usuario_ID : {
        type : DataTypes.UUID,
        allowNull : false
    },
    Correo : {
        type : DataTypes.STRING(50),
        allowNull : true
    },
    Nombre : {
        type : DataTypes.STRING(20),
        allowNull : true
    },
    Telefono : {
        type : DataTypes.INTEGER,
        allowNull : true
    },
    Asunto : {
        type : DataTypes.STRING(50),
        allowNull : true
    },
    Descripcion : {
        type : DataTypes.STRING(150),
        allowNull : true
    }
},{
    timestamps : false,
    freezeTableName : true
})

const Resena = sequelize.define("Resena",{
    Resena_ID : {
        primaryKey : true,
        type : DataTypes.UUID,
        defaultValue : Sequelize.UUIDV4,
        allowNull : false
    },
    Usuario_ID : {
        type : DataTypes.UUID,
        allowNull : false
    },
    Puntaje : {
        type : DataTypes.INTEGER,
        allowNull : true
    },
    Comentario : {
        type : DataTypes.STRING(100),
        allowNull : true
    },
    Video_infl : {
        type : DataTypes.STRING(100),
        allowNull : true
    },
    Link_infl : {
        type : DataTypes.STRING(100),
        allowNull : true
    },
    Tipo_resena : {
        type : DataTypes.STRING(100),
        allowNull : true
    }
},{
    timestamps : false,
    freezeTableName : true
})

const Usuario = sequelize.define("Usuario",{
    Usuario_ID : {
        primaryKey : true,
        type : DataTypes.UUID,
        defaultValue : Sequelize.UUIDV4,
        allowNull : false
    },
    Nombre : {
        type : DataTypes.STRING(20),
        allowNull : true
    },
    Apellido : {
        type : DataTypes.STRING(40),
        allowNull : true
    },
    Correo : {
        type : DataTypes.STRING(40),
        allowNull : false
    },
    Contrasena : {
        type : DataTypes.STRING(40),
        allowNull : false
    },
    Direccion : {
        type : DataTypes.STRING(60),
        allowNull : true
    },
    Departamento : {
        type : DataTypes.STRING(50),
        allowNull : true
    },
    Ciudad : {
        type : DataTypes.STRING(30),
        allowNull : true
    },
    Codigo_postal : {
        type : DataTypes.INTEGER,
        allowNull : true
    },
    Telefono : {
        type : DataTypes.INTEGER,
        allowNull : true
    }
},{
    timestamps : false,
    freezeTableName : true
})

Reporte.belongsTo(Usuario, {
    foreignKey : "Usuario_ID"
})
Usuario.hasMany(Reporte, {
    foreignKey : "Usuario_ID"
})

Resena.belongsTo(Usuario, {
    foreignKey : "Usuario_ID"
})
Usuario.hasMany(Resena, {
    foreignKey : "Usuario_ID"
})

Orden.belongsTo(Usuario, {
    foreignKey : "Usuario_ID"
})
Usuario.hasMany(Orden, {
    foreignKey : "Usuario_ID"
})

Orden_producto.belongsTo(Orden, {
    foreignKey : "Orden_ID"
})
Orden.hasMany(Orden_producto, {
    foreignKey : "Orden_ID"
})

Orden_producto.belongsTo(Producto, {
    foreignKey : "Producto_ID"
})
Producto.hasMany(Orden_producto, {
    foreignKey : "Producto_ID"
})

PC_Armado_Prod.belongsTo(Producto, {
    foreignKey : "Producto_ID"
})
Producto.hasMany(PC_Armado_Prod, {
    foreignKey : "Producto_ID"
})

PC_Armado_Prod.belongsTo(PC_Armado, {
    foreignKey : "PC_Armado_ID"
})
PC_Armado.hasMany(PC_Armado_Prod, {
    foreignKey : "PC_Armado_ID"
})



module.exports = {
    Orden, Orden_producto, PC_Armado, PC_Armado_Prod,
    Producto, Reporte, Resena, Usuario
}