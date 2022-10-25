const { Schema, model } = require('mongoose');

const TomaTurnoSchema = Schema({
    estado: {
        type: Boolean,
        required: true,
        default: true
    },
    planilla: {
        type: Schema.Types.ObjectId,
        ref: 'Planilla',
        required: true
    },
    usuarioInicio: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    usuarioTermino: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: false
    },
    fechaHoraInicio: {
        type: Date,
        required: true,
        default: Date.now
    },
    fechaHoraTermino: {
        type: Date,
        required: false
    }
}, { collection: 'toma-turno' });

TomaTurnoSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model('TomaTurno', TomaTurnoSchema);


// estado : activado: true, desactivado: false
// planillaId: planilla activa.
// usuario que activo la toma de turno.
// fecha hora de inicio.
// fecha hora termino.