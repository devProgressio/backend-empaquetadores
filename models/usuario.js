const { Schema, model } = require('mongoose');

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
        required: true
    },
    img: {
        type: String
    },
    role: {
        type: String,
        required: true,
        default: 'USER_ROLE'

        // ROLES DE USUARIOS:

        // ADMIN_ROLE: Tiene acceso a todas las opciones del menu
        // USER_ROLE: Tiene accesos a solo ver sus datos, turnos tomados, faltas asignadas.
        // FALTA_ROLE: Tiene acceso a datos, ver sus turnos, puede asignar falta a un usuario, mantenedor de faltas.
        // TURNO_ROLE: Puede crear planillas, creacion de turnos,


    },
    google: {
        type: Boolean,
        default: false
    }
}, { collection: 'usuarios' });

UsuarioSchema.method('toJSON', function() {
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
})

module.exports = model('Usuario', UsuarioSchema);