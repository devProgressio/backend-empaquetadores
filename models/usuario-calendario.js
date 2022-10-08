const { Schema, model } = require('mongoose');

const UsuarioCalendarioSchema = Schema({

    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    calendario: {
        type: Schema.Types.ObjectId,
        ref: 'Calendario',
        required: true
    },
    estado: {
        type: Boolean,
        required: true
    }
}, { collection: 'usuario-calendario' });

UsuarioCalendarioSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model('UsuarioCalendario', UsuarioCalendarioSchema);