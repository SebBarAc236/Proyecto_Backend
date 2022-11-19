const { Sequelize, DataTypes } = require("sequelize");

const CADENA_CONEXION = 
    "postgresql://sebastianb:sebastianb@localhost:4321/proyectopw"

const sequelize = new Sequelize(CADENA_CONEXION)

const Confederacion = sequelize.define("conf", {
    id : {
        primaryKey : true,
        type : DataTypes.UUID,
        defaultValue : Sequelize.UUIDV4
    },
    nombre : {
        type : DataTypes.STRING(150),
        allowNull : true
    } 
}, {
    timestamps : false,
    freezeTableName : true
})

const Equipo = sequelize.define("equipos", {
    id : {
        primaryKey : true,
        type : DataTypes.UUID,
        defaultValue : Sequelize.UUIDV4
    },
    nombre : {
        type : DataTypes.STRING(150),
        allowNull : true
    },
    grupo_id : {
        type : DataTypes.UUID,
        allowNull : false
    },
    confederacion_id : {
        type : DataTypes.UUID,
        allowNull : false
    }
}, {
    timestamps : false,
    freezeTableName : true
})

const Grupo = sequelize.define("grupo", {
    id : {
        primaryKey : true,
        type : DataTypes.UUID,
        defaultValue : Sequelize.UUIDV4
    },
    nombre : {
        type : DataTypes.STRING(150),
        allowNull : true
    }
}, {
    timestamps : false,
    freezeTableName : true
})

const Orden = sequelize.define("orden",{
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
        type : DataTypes.INTEGER,
        allowNull : true
    }
}, {
    timestamps : false,
    freezeTableName : true
})


Equipo.belongsTo(Grupo, {
    foreignKey : "grupo_id"
})
Grupo.hasMany(Equipo, {
    foreignKey : "id"
})

Equipo.belongsTo(Confederacion, {
    foreignKey : "confederacion_id"
})
Confederacion.hasMany(Equipo, {
    foreignKey : "id"
})



module.exports = {
    Confederacion, Grupo, Equipo
}