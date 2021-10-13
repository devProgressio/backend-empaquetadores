const { Schema, model } = require('mongoose');

const FaltaSchema = Schema({

    // falta asignada al usuario.
    falta: {
        type: Schema.Types.ObjectId,
        ref: 'Falta',
        required: true
    },
    // quien recibe la falta.
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    // quien asigna la falta.
    supervisor: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    // en que turno ocurrió la falta.
    turno: {
        type: Schema.Types.ObjectId,
        ref: 'Turno',
        required: true
    },
    // fecha que asigna la falta
    fecha: {
        type: String,
        required: true,
        default: Date.now
    }
}, { collection: 'falta' });

FaltaSchema.method('toJSON', function() {
    const { __v, _id, password, ...object } = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model('Falta', FaltaSchema);