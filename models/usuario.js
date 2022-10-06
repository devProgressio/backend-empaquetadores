const { Schema, model } = require('mongoose');
const { ROLES } = require('../emun/roles');

const UsuarioSchema = Schema({

    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: false
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        required: true,
        default: ROLES.USUARIO
    
        // ROLES DE USUARIOS:

        // ADMINISTRADOR: Tiene acceso a todas las opciones del menu
        // USUARIO: Tiene accesos a solo ver sus datos, turnos tomados, faltas asignadas.
        // FALTA: Tiene acceso a datos, ver sus turnos, puede asignar falta a un usuario, mantenedor de faltas.
        // TURNO: Puede crear planillas, creacion de turnos,


    },
    google: {
        type: Boolean,
        default: false
    },
    estado: {
        type: String,
        required: true,
        default: 'HABILITADO'

        //  ELIMINADO: Usuario eliminado.
        //  HABILITADO: Usuario hablitado para trabajar puede tomar turnos.
        //  INHABILITADO: Usuario no se permite que tome turnos para trabajar.
    },
    cambiaPassword: {
        type: Boolean,
        default: false
    },
}, { collection: 'usuarios' });

UsuarioSchema.method('toJSON', function() {
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
})

module.exports = model('Usuario', UsuarioSchema);